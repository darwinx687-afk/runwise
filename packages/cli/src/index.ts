#!/usr/bin/env tsx
import { promises as fs, realpathSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  RUNWISE_DOCTOR_VERSION,
  buildRunwiseTraceReplaySummary,
  scanRunwiseDoctor,
  validateRunwiseTraceFile,
  validateRunwiseTracePath
} from "@runwise/core";
import {
  DEFAULT_VIEWER_PORT,
  RUNWISE_REPORT_PATH,
  isRunwiseReportMissingError,
  startRunwiseViewer
} from "@runwise/dashboard";
import { renderTraceReplayMarkdown, writeDoctorReports } from "@runwise/reporter";
import type {
  RunwiseAgentTrace,
  RunwiseDoctorReport,
  RunwiseTraceReplaySummary,
  RunwiseTraceValidationResult
} from "@runwise/schemas";

export const DEFAULT_REPORT_DIRECTORY = ".runwise";
export const DEFAULT_REPLAY_DIRECTORY = ".runwise/replays";

export interface RunwiseCliIO {
  log(message: string): void;
  error(message: string): void;
}

const HELP_TEXT = `Runwise

Usage:
  runwise doctor [--cwd .] [--output .runwise]
  runwise trace validate <path>
  runwise trace replay <trace-file> [--output .runwise/replays]
  runwise view [--port 4321]

Commands:
  doctor   Scan the current project and generate local reports
  trace    Validate local Runwise trace JSON files
  view     Open a local dashboard viewer for .runwise/runwise-report.json`;

const TRACE_HELP_TEXT = `Runwise Trace

Usage:
  runwise trace validate <path>
  runwise trace replay <trace-file> [--output .runwise/replays]

Commands:
  validate  Validate a Runwise trace JSON file or a directory of JSON traces
  replay    Build a static replay report from a valid Runwise trace file`;

export async function run(argv = process.argv.slice(2), io: RunwiseCliIO = console) {
  const [command, ...args] = argv;

  if (command === undefined || command === "--help" || command === "-h") {
    io.log(HELP_TEXT);
    return 0;
  }

  if (command === "doctor") {
    return runDoctor(args, io);
  }

  if (command === "view") {
    return runView(args, io);
  }

  if (command === "trace") {
    return runTrace(args, io);
  }

  io.error([`Unknown command: ${command}`, "", HELP_TEXT].join("\n"));
  return 1;
}

async function runDoctor(args: string[], io: RunwiseCliIO) {
  const parseResult = parseDoctorArgs(args);

  if (!parseResult.ok) {
    io.error(parseResult.message);
    return 1;
  }

  const cwd = path.resolve(parseResult.cwd);
  const outputDir = path.isAbsolute(parseResult.output)
    ? parseResult.output
    : path.join(cwd, parseResult.output);

  await fs.mkdir(outputDir, { recursive: true });

  const report = await scanRunwiseDoctor({
    cwd,
    version: RUNWISE_DOCTOR_VERSION
  });
  const writtenReports = await writeDoctorReports(report, { outputDir });

  io.log(
    formatTerminalSummary(
      report,
      cwd,
      writtenReports.jsonPath,
      writtenReports.markdownPath,
      writtenReports.htmlPath
    )
  );

  return 0;
}

async function runTrace(args: string[], io: RunwiseCliIO) {
  const [subcommand, targetPath, ...rest] = args;

  if (subcommand === "replay") {
    return runTraceReplay(targetPath, rest, io);
  }

  if (subcommand !== "validate") {
    io.error([subcommand ? `Unknown trace command: ${subcommand}` : "Missing trace command.", "", TRACE_HELP_TEXT].join("\n"));
    return 1;
  }

  if (!targetPath) {
    io.error(["Missing trace path.", "", TRACE_HELP_TEXT].join("\n"));
    return 1;
  }

  if (rest.length > 0) {
    io.error(`Unknown trace validate option: ${rest[0]}`);
    return 1;
  }

  const absolutePath = path.resolve(targetPath);
  const stat = await fs.stat(absolutePath);
  const results = await validateRunwiseTracePath(absolutePath);
  const summary = stat.isDirectory()
    ? formatTraceDirectorySummary(targetPath, results)
    : formatTraceFileSummary(targetPath, results[0]);

  io.log(summary);

  return results.some((result) => !result.valid) ? 1 : 0;
}

async function runTraceReplay(
  targetPath: string | undefined,
  args: string[],
  io: RunwiseCliIO
) {
  if (!targetPath) {
    io.error(["Missing trace file.", "", TRACE_HELP_TEXT].join("\n"));
    return 1;
  }

  const parseResult = parseReplayArgs(args);
  if (!parseResult.ok) {
    io.error(parseResult.message);
    return 1;
  }

  const absolutePath = path.resolve(targetPath);
  const stat = await fs.stat(absolutePath);
  if (stat.isDirectory()) {
    io.error("Trace replay requires a JSON trace file, not a directory.");
    return 1;
  }

  const validation = await validateRunwiseTraceFile(absolutePath);
  const errors = getTraceIssues(validation, "error");
  if (errors.length > 0) {
    io.error(formatTraceReplayInvalidSummary(errors));
    return 1;
  }

  const trace = JSON.parse(await fs.readFile(absolutePath, "utf8")) as RunwiseAgentTrace;
  const summary = buildRunwiseTraceReplaySummary(trace, targetPath);
  const outputDir = path.isAbsolute(parseResult.output)
    ? parseResult.output
    : path.join(process.cwd(), parseResult.output);
  await fs.mkdir(outputDir, { recursive: true });

  const replayPath = path.join(outputDir, `${sanitizeFileName(summary.runId)}-replay.md`);
  await fs.writeFile(replayPath, `${renderTraceReplayMarkdown(summary)}\n`, "utf8");

  io.log(formatTraceReplaySummary(targetPath, summary, replayPath));
  return 0;
}

type ParseDoctorArgsResult =
  | { ok: true; cwd: string; output: string }
  | { ok: false; message: string };

type ParseReplayArgsResult =
  | { ok: true; output: string }
  | { ok: false; message: string };

function parseDoctorArgs(args: string[]): ParseDoctorArgsResult {
  let cwd = process.cwd();
  let output = DEFAULT_REPORT_DIRECTORY;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--cwd") {
      const value = args[index + 1];
      if (!value) {
        return { ok: false, message: "Missing value for --cwd." };
      }
      cwd = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--cwd=")) {
      cwd = arg.slice("--cwd=".length);
      continue;
    }

    if (arg === "--output") {
      const value = args[index + 1];
      if (!value) {
        return { ok: false, message: "Missing value for --output." };
      }
      output = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--output=")) {
      output = arg.slice("--output=".length);
      continue;
    }

    return { ok: false, message: `Unknown doctor option: ${arg}` };
  }

  return { ok: true, cwd, output };
}

function parseReplayArgs(args: string[]): ParseReplayArgsResult {
  let output = DEFAULT_REPLAY_DIRECTORY;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--output") {
      const value = args[index + 1];
      if (!value) {
        return { ok: false, message: "Missing value for --output." };
      }
      output = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--output=")) {
      output = arg.slice("--output=".length);
      continue;
    }

    return { ok: false, message: `Unknown trace replay option: ${arg}` };
  }

  return { ok: true, output };
}

async function runView(args: string[], io: RunwiseCliIO) {
  const parseResult = parseViewArgs(args);

  if (!parseResult.ok) {
    io.error(parseResult.message);
    return 1;
  }

  try {
    const viewer = await startRunwiseViewer({
      port: parseResult.port
    });

    io.log(
      [
        "Runwise Viewer",
        "",
        "Loaded report:",
        RUNWISE_REPORT_PATH,
        "",
        "Local dashboard:",
        viewer.url
      ].join("\n")
    );

    return 0;
  } catch (error) {
    if (isRunwiseReportMissingError(error)) {
      io.error(
        [
          "Runwise Viewer",
          "",
          "No local report found.",
          "",
          "Expected report:",
          RUNWISE_REPORT_PATH,
          "",
          "Run this first:",
          "pnpm exec runwise doctor"
        ].join("\n")
      );
      return 1;
    }

    throw error;
  }
}

type ParseViewArgsResult =
  | { ok: true; port: number }
  | { ok: false; message: string };

function parseViewArgs(args: string[]): ParseViewArgsResult {
  let port = DEFAULT_VIEWER_PORT;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--port") {
      const value = args[index + 1];
      if (!value) {
        return { ok: false, message: "Missing value for --port." };
      }
      const parsed = parsePort(value);
      if (parsed === undefined) {
        return { ok: false, message: `Invalid port: ${value}` };
      }
      port = parsed;
      index += 1;
      continue;
    }

    if (arg.startsWith("--port=")) {
      const value = arg.slice("--port=".length);
      const parsed = parsePort(value);
      if (parsed === undefined) {
        return { ok: false, message: `Invalid port: ${value}` };
      }
      port = parsed;
      continue;
    }

    return { ok: false, message: `Unknown view option: ${arg}` };
  }

  return { ok: true, port };
}

function parsePort(value: string): number | undefined {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    return undefined;
  }

  return port;
}

export function formatTerminalSummary(
  report: RunwiseDoctorReport,
  cwd: string,
  jsonPath: string,
  markdownPath: string,
  htmlPath: string
) {
  return [
    "Runwise Doctor",
    "",
    `Scanned: ${report.scannedPath}`,
    `Score: ${report.summary.overallScore}/100`,
    `Rules: ${report.rules.passed} passed, ${report.rules.failed} failed, ${report.rules.notApplicable} not applicable, ${report.rules.blocking} blocking`,
    `Findings: ${report.summary.totalFindings} total, ${report.summary.critical} critical, ${report.summary.high} high, ${report.summary.medium} medium, ${report.summary.low} low, ${report.summary.info} info`,
    "",
    "Reports:",
    `- ${formatReportPath(cwd, jsonPath)}`,
    `- ${formatReportPath(cwd, markdownPath)}`,
    `- ${formatReportPath(cwd, htmlPath)}`
  ].join("\n");
}

export function formatTraceFileSummary(
  displayPath: string,
  result: RunwiseTraceValidationResult
) {
  const errors = getTraceIssues(result, "error");
  const warnings = getTraceIssues(result, "warning");
  const lines = [
    "Runwise Trace Validator",
    "",
    `Validated: ${displayPath}`,
    `Result: ${result.valid ? "valid" : "invalid"}`,
    `Issues: ${errors.length} errors, ${warnings.length} warnings`
  ];

  if (errors.length > 0) {
    lines.push("", "Errors:", ...errors.map(formatTraceIssue));
  }

  if (warnings.length > 0) {
    lines.push("", "Warnings:", ...warnings.map(formatTraceIssue));
  }

  return lines.join("\n");
}

export function formatTraceDirectorySummary(
  displayPath: string,
  results: RunwiseTraceValidationResult[]
) {
  const errors = results.flatMap((result) => getTraceIssues(result, "error"));
  const warnings = results.flatMap((result) => getTraceIssues(result, "warning"));
  const validCount = results.filter((result) => result.valid).length;
  const invalidCount = results.length - validCount;

  return [
    "Runwise Trace Validator",
    "",
    `Scanned directory: ${displayPath}`,
    `Files: ${results.length}`,
    `Valid: ${validCount}`,
    `Invalid: ${invalidCount}`,
    `Errors: ${errors.length}`,
    `Warnings: ${warnings.length}`
  ].join("\n");
}

function getTraceIssues(
  result: RunwiseTraceValidationResult,
  severity: "error" | "warning"
) {
  return result.issues.filter((issue) => issue.severity === severity);
}

function formatTraceIssue(issue: RunwiseTraceValidationResult["issues"][number]) {
  return `- ${issue.message} / ${issue.messageZh}`;
}

export function formatTraceReplaySummary(
  displayPath: string,
  summary: RunwiseTraceReplaySummary,
  replayPath: string
) {
  const lines = [
    "Runwise Trace Replay",
    "",
    `Trace: ${displayPath}`,
    `Run ID: ${summary.runId}`,
    `Status: ${summary.status}`,
    `Steps: ${summary.totalSteps}`,
    `Errors: ${summary.errors.count}`,
    `Risk: ${summary.riskSummary.critical} critical, ${summary.riskSummary.high} high, ${summary.riskSummary.medium} medium, ${summary.riskSummary.low} low`,
    `Approval: ${summary.approval.requests} request, ${summary.approval.responses} response`,
    "",
    "Timeline:",
    ...summary.steps.map((step) => `${step.index + 1}. [${step.type}] ${step.summary}`),
    "",
    "Replay report:",
    formatReportPath(process.cwd(), replayPath)
  ];

  return lines.join("\n");
}

function formatTraceReplayInvalidSummary(
  errors: RunwiseTraceValidationResult["issues"]
) {
  return [
    "Runwise Trace Replay",
    "",
    "Trace is invalid. Fix validation errors before replay.",
    "",
    "Errors:",
    ...errors.map(formatTraceIssue)
  ].join("\n");
}

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "trace";
}

function normalizePath(filePath: string) {
  try {
    return realpathSync(filePath);
  } catch {
    return path.resolve(filePath);
  }
}

function formatReportPath(cwd: string, reportPath: string) {
  const relativePath = path.relative(cwd, reportPath);
  return relativePath.startsWith("..") ? reportPath : relativePath;
}

const currentFile = normalizePath(fileURLToPath(import.meta.url));
const invokedFile = process.argv[1] ? normalizePath(process.argv[1]) : "";

if (currentFile === invokedFile) {
  run()
    .then((exitCode) => {
      process.exitCode = exitCode;
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Runwise failed: ${message}`);
      process.exitCode = 1;
    });
}
