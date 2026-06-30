#!/usr/bin/env tsx
import { promises as fs, realpathSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { RUNWISE_DOCTOR_VERSION, scanRunwiseDoctor } from "@runwise/core";
import {
  DEFAULT_VIEWER_PORT,
  RUNWISE_REPORT_PATH,
  isRunwiseReportMissingError,
  startRunwiseViewer
} from "@runwise/dashboard";
import { writeDoctorReports } from "@runwise/reporter";
import type { RunwiseDoctorReport } from "@runwise/schemas";

export const DEFAULT_REPORT_DIRECTORY = ".runwise";

export interface RunwiseCliIO {
  log(message: string): void;
  error(message: string): void;
}

const HELP_TEXT = `Runwise

Usage:
  runwise doctor [--cwd .] [--output .runwise]
  runwise view [--port 4321]

Commands:
  doctor   Scan the current project and generate local reports
  view     Open a local dashboard viewer for .runwise/runwise-report.json`;

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

type ParseDoctorArgsResult =
  | { ok: true; cwd: string; output: string }
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
