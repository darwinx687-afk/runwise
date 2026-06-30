import { promises as fs } from "node:fs";
import * as path from "node:path";
import type {
  RunwiseCategory,
  RunwiseDoctorReport,
  RunwiseFinding,
  RunwiseSeverity
} from "@runwise/schemas";

export const RUNWISE_REPORT_JSON = "runwise-report.json";
export const RUNWISE_REPORT_MARKDOWN = "runwise-report.md";

export interface WriteDoctorReportsOptions {
  outputDir: string;
}

export interface WrittenDoctorReports {
  jsonPath: string;
  markdownPath: string;
}

interface DoctorMarkdownOptions {
  cwd?: string;
  jsonPath?: string;
  markdownPath?: string;
}

const SEVERITY_ORDER: RunwiseSeverity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "info"
];

export async function writeDoctorReports(
  report: RunwiseDoctorReport,
  options: WriteDoctorReportsOptions
): Promise<WrittenDoctorReports> {
  await fs.mkdir(options.outputDir, { recursive: true });

  const jsonPath = path.join(options.outputDir, RUNWISE_REPORT_JSON);
  const markdownPath = path.join(options.outputDir, RUNWISE_REPORT_MARKDOWN);
  const cwd = path.dirname(options.outputDir);

  await fs.writeFile(jsonPath, `${formatDoctorReportJson(report)}\n`, "utf8");
  await fs.writeFile(
    markdownPath,
    `${formatDoctorReportMarkdown(report, { cwd, jsonPath, markdownPath })}\n`,
    "utf8"
  );

  return {
    jsonPath,
    markdownPath
  };
}

export function formatDoctorReportJson(report: RunwiseDoctorReport) {
  return JSON.stringify(report, null, 2);
}

export function formatDoctorReportMarkdown(
  report: RunwiseDoctorReport,
  options: DoctorMarkdownOptions = {}
) {
  const lines = [
    "# Runwise Doctor Report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    `Scanned path: ${report.scannedPath}`,
    "",
    `Overall score: ${report.summary.overallScore}/100`,
    "",
    "## Summary",
    "",
    "| Metric | Value |",
    "| --- | ---: |",
    `| Total findings | ${report.summary.totalFindings} |`,
    `| Critical | ${report.summary.critical} |`,
    `| High | ${report.summary.high} |`,
    `| Medium | ${report.summary.medium} |`,
    `| Low | ${report.summary.low} |`,
    `| Info | ${report.summary.info} |`,
    `| Blocking findings | ${report.rules.blocking} |`,
    "",
    "## Rule Execution",
    "",
    "| Rule status | Count |",
    "| --- | ---: |",
    `| Total | ${report.rules.total} |`,
    `| Passed | ${report.rules.passed} |`,
    `| Failed | ${report.rules.failed} |`,
    `| Not applicable | ${report.rules.notApplicable} |`,
    `| Blocking | ${report.rules.blocking} |`,
    "",
    "## Checks",
    "",
    "| Check | Status |",
    "| --- | --- |",
    `| Workspace detected | ${formatBoolean(report.checks.workspaceDetected)} |`,
    `| Package manager detected | ${formatBoolean(report.checks.packageManagerDetected)} |`,
    `| TypeScript detected | ${formatBoolean(report.checks.typescriptDetected)} |`,
    `| Governance files detected | ${formatBoolean(report.checks.governanceFilesDetected)} |`,
    `| AI project indicators detected | ${formatBoolean(report.checks.aiProjectIndicatorsDetected)} |`,
    `| MCP indicators detected | ${formatBoolean(report.checks.mcpIndicatorsDetected)} |`,
    `| Evals detected | ${formatBoolean(report.checks.evalsDetected)} |`,
    `| Traces detected | ${formatBoolean(report.checks.tracesDetected)} |`,
    "",
    "## Reports",
    "",
    `- JSON: \`${formatReportPath(options.cwd, options.jsonPath, ".runwise/runwise-report.json")}\``,
    `- Markdown: \`${formatReportPath(options.cwd, options.markdownPath, ".runwise/runwise-report.md")}\``,
    "",
    "## What to Fix First",
    "",
    ...formatFixFirst(report.findings),
    "",
    "## Findings"
  ];

  for (const severity of SEVERITY_ORDER) {
    const findings = report.findings.filter((finding) => finding.severity === severity);
    if (findings.length === 0) {
      continue;
    }

    lines.push("", `### ${capitalize(severity)}`);

    for (const finding of findings) {
      lines.push(...formatFinding(finding));
    }
  }

  if (report.findings.length === 0) {
    lines.push("", "No findings.");
  }

  return lines.join("\n");
}

function formatFinding(finding: RunwiseFinding) {
  const lines = [
    "",
    `#### ${escapeMarkdown(finding.title)} / ${escapeMarkdown(finding.titleZh)}`,
    "",
    `- ID: \`${finding.id}\``,
    finding.ruleId ? `- Rule ID: \`${finding.ruleId}\`` : undefined,
    `- Category: \`${formatCategory(finding.category)}\``,
    `- Severity: \`${finding.severity}\``,
    `- Blocking: ${finding.blocking === true ? "yes" : "no"}`
  ].filter((line): line is string => line !== undefined);

  if (finding.file) {
    lines.push(`- File: \`${finding.file}\``);
  }

  lines.push(
    `- Message: ${escapeMarkdown(finding.message)}`,
    `- 中文说明: ${escapeMarkdown(finding.messageZh)}`,
    `- Recommendation: ${escapeMarkdown(finding.recommendation)}`,
    `- 中文建议: ${escapeMarkdown(finding.recommendationZh)}`
  );

  return lines;
}

function formatBoolean(value: boolean) {
  return value ? "yes" : "no";
}

function formatCategory(category: RunwiseCategory) {
  return category;
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function formatFixFirst(findings: RunwiseFinding[]) {
  if (findings.length === 0) {
    return ["No findings. Keep the current readiness baseline healthy."];
  }

  const orderedFindings = [...findings].sort((a, b) => {
    if (a.blocking === true && b.blocking !== true) {
      return -1;
    }
    if (a.blocking !== true && b.blocking === true) {
      return 1;
    }

    return SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
  });

  return orderedFindings.slice(0, 5).map((finding) => {
    const prefix = finding.blocking === true ? "Blocking" : capitalize(finding.severity);
    return `- ${prefix}: ${escapeMarkdown(finding.title)} / ${escapeMarkdown(finding.titleZh)} (\`${finding.id}\`)`;
  });
}

function formatReportPath(cwd: string | undefined, reportPath: string | undefined, fallback: string) {
  if (!reportPath) {
    return fallback;
  }

  if (!cwd) {
    return reportPath;
  }

  const relativePath = path.relative(cwd, reportPath);
  return relativePath.startsWith("..") ? reportPath : relativePath;
}

function escapeMarkdown(value: string) {
  return value.replaceAll("|", "\\|");
}
