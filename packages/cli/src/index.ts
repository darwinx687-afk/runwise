#!/usr/bin/env tsx
import { promises as fs, realpathSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { RUNWISE_DOCTOR_VERSION, scanRunwiseDoctor } from "@runwise/core";
import { writeDoctorReports } from "@runwise/reporter";
import type { RunwiseDoctorReport } from "@runwise/schemas";

export const DEFAULT_REPORT_DIRECTORY = ".runwise";

export interface RunwiseCliIO {
  log(message: string): void;
  error(message: string): void;
}

const HELP_TEXT = `Runwise CLI

Usage:
  runwise doctor

Commands:
  doctor  Scan the current directory and generate Runwise readiness reports`;

export async function run(argv = process.argv.slice(2), io: RunwiseCliIO = console) {
  const [command] = argv;

  if (command === undefined || command === "--help" || command === "-h") {
    io.log(HELP_TEXT);
    return 0;
  }

  if (command === "doctor") {
    return runDoctor(io);
  }

  io.error(`Unknown command: ${command}`);
  return 1;
}

async function runDoctor(io: RunwiseCliIO) {
  const cwd = process.cwd();
  const outputDir = path.join(cwd, DEFAULT_REPORT_DIRECTORY);

  await fs.mkdir(outputDir, { recursive: true });

  const report = await scanRunwiseDoctor({
    cwd,
    version: RUNWISE_DOCTOR_VERSION
  });
  const writtenReports = await writeDoctorReports(report, { outputDir });

  io.log(formatTerminalSummary(report, cwd, writtenReports.jsonPath, writtenReports.markdownPath));

  return 0;
}

export function formatTerminalSummary(
  report: RunwiseDoctorReport,
  cwd: string,
  jsonPath: string,
  markdownPath: string
) {
  return [
    "Runwise Doctor",
    "",
    `Scanned: ${report.scannedPath}`,
    `Score: ${report.summary.overallScore}/100`,
    `Findings: ${report.summary.totalFindings} total, ${report.summary.critical} critical, ${report.summary.high} high, ${report.summary.medium} medium, ${report.summary.low} low, ${report.summary.info} info`,
    "",
    "Reports:",
    `- ${formatReportPath(cwd, jsonPath)}`,
    `- ${formatReportPath(cwd, markdownPath)}`
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
      console.error(`Runwise Doctor failed: ${message}`);
      process.exitCode = 1;
    });
}
