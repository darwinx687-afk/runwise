#!/usr/bin/env node
import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SEVERITY_ORDER = ["critical", "high", "medium", "low"];
const OUTPUT_KEYS = [
  ["score", (report) => report.summary.overallScore],
  ["total-findings", (report) => report.summary.totalFindings],
  ["critical", (report) => report.summary.critical],
  ["high", (report) => report.summary.high],
  ["medium", (report) => report.summary.medium],
  ["low", (report) => report.summary.low],
  ["info", (report) => report.summary.info],
  ["blocking", (report) => report.rules.blocking],
  ["report-json", (_report, paths) => paths.json],
  ["report-markdown", (_report, paths) => paths.markdown],
  ["report-html", (_report, paths) => paths.html]
];

const options = parseArgs(process.argv.slice(2));
const report = JSON.parse(readFileSync(options.report, "utf8"));
const reportPaths = resolveReportPaths(report);
const summary = renderSummary(report, reportPaths);
const failures = evaluateThresholds(report, options);

writeStepSummary(summary, failures);
writeOutputs(report, reportPaths);

if (failures.length > 0) {
  console.error("Runwise readiness check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Runwise readiness check passed.");
}

function parseArgs(args) {
  const result = {
    report: undefined,
    minScore: 0,
    failOnBlocking: true,
    failOnSeverity: "critical"
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--report") {
      result.report = requireValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg.startsWith("--report=")) {
      result.report = arg.slice("--report=".length);
      continue;
    }

    if (arg === "--min-score") {
      result.minScore = parseMinScore(requireValue(args, index, arg));
      index += 1;
      continue;
    }

    if (arg.startsWith("--min-score=")) {
      result.minScore = parseMinScore(arg.slice("--min-score=".length));
      continue;
    }

    if (arg === "--fail-on-blocking") {
      result.failOnBlocking = parseBoolean(requireValue(args, index, arg), arg);
      index += 1;
      continue;
    }

    if (arg.startsWith("--fail-on-blocking=")) {
      result.failOnBlocking = parseBoolean(arg.slice("--fail-on-blocking=".length), "--fail-on-blocking");
      continue;
    }

    if (arg === "--fail-on-severity") {
      result.failOnSeverity = parseSeverity(requireValue(args, index, arg));
      index += 1;
      continue;
    }

    if (arg.startsWith("--fail-on-severity=")) {
      result.failOnSeverity = parseSeverity(arg.slice("--fail-on-severity=".length));
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (!result.report) {
    throw new Error("Missing required --report path.");
  }

  return {
    ...result,
    report: resolve(result.report)
  };
}

function requireValue(args, index, option) {
  const value = args[index + 1];
  if (!value) {
    throw new Error(`Missing value for ${option}.`);
  }
  return value;
}

function parseMinScore(value) {
  const minScore = Number(value);
  if (!Number.isFinite(minScore) || minScore < 0 || minScore > 100) {
    throw new Error(`Invalid min-score: ${value}`);
  }
  return minScore;
}

function parseBoolean(value, option) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  throw new Error(`Invalid boolean for ${option}: ${value}`);
}

function parseSeverity(value) {
  if (value === "none" || SEVERITY_ORDER.includes(value)) {
    return value;
  }
  throw new Error(`Invalid fail-on-severity: ${value}`);
}

function resolveReportPaths(report) {
  return {
    json: report.reportFiles?.json ?? ".runwise/runwise-report.json",
    markdown: report.reportFiles?.markdown ?? ".runwise/runwise-report.md",
    html: report.reportFiles?.html ?? ".runwise/runwise-report.html"
  };
}

function renderSummary(report, reportPaths) {
  return [
    "# Runwise Readiness Check",
    "",
    `Score: ${report.summary.overallScore}/100`,
    `Rules: ${report.rules.passed} passed, ${report.rules.failed} failed, ${report.rules.notApplicable} not applicable, ${report.rules.blocking} blocking`,
    `Findings: ${report.summary.totalFindings} total, ${report.summary.critical} critical, ${report.summary.high} high, ${report.summary.medium} medium, ${report.summary.low} low, ${report.summary.info} info`,
    "",
    "Reports:",
    `- ${reportPaths.json}`,
    `- ${reportPaths.markdown}`,
    `- ${reportPaths.html}`,
    "",
    "本检查由 Runwise 生成，报告基于本地仓库扫描，不会上传项目数据。",
    ""
  ].join("\n");
}

function evaluateThresholds(report, options) {
  const failures = [];

  if (report.summary.overallScore < options.minScore) {
    failures.push(`score ${report.summary.overallScore} is below min-score ${options.minScore}`);
  }

  if (options.failOnBlocking && report.rules.blocking > 0) {
    failures.push(`${report.rules.blocking} blocking finding(s) detected`);
  }

  if (options.failOnSeverity !== "none") {
    const severities = SEVERITY_ORDER.slice(0, SEVERITY_ORDER.indexOf(options.failOnSeverity) + 1);
    const matches = severities.filter((severity) => report.summary[severity] > 0);

    if (matches.length > 0) {
      failures.push(`finding(s) at or above ${options.failOnSeverity}: ${matches.join(", ")}`);
    }
  }

  return failures;
}

function writeStepSummary(summary, failures) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    return;
  }

  const gateSummary = failures.length > 0
    ? ["", "Gate: failed", ...failures.map((failure) => `- ${failure}`), ""].join("\n")
    : "\nGate: passed\n";

  appendFileSync(summaryPath, `${summary}${gateSummary}`, "utf8");
}

function writeOutputs(report, reportPaths) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  for (const [name, getter] of OUTPUT_KEYS) {
    appendOutput(outputPath, name, String(getter(report, reportPaths)));
  }
}

function appendOutput(outputPath, name, value) {
  appendFileSync(outputPath, `${name}=${escapeOutputValue(value)}\n`, "utf8");
}

function escapeOutputValue(value) {
  return value
    .replaceAll("%", "%25")
    .replaceAll("\r", "%0D")
    .replaceAll("\n", "%0A");
}
