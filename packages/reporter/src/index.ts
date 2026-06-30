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
export const RUNWISE_REPORT_HTML = "runwise-report.html";

export interface WriteDoctorReportsOptions {
  outputDir: string;
}

export interface WrittenDoctorReports {
  jsonPath: string;
  markdownPath: string;
  htmlPath: string;
}

interface ReportRenderOptions {
  cwd?: string;
  jsonPath?: string;
  markdownPath?: string;
  htmlPath?: string;
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
  return writeReportFiles(report, options.outputDir);
}

export async function writeReportFiles(
  report: RunwiseDoctorReport,
  outputDir: string
): Promise<WrittenDoctorReports> {
  await fs.mkdir(outputDir, { recursive: true });

  const cwd = path.dirname(outputDir);
  const jsonPath = path.join(outputDir, RUNWISE_REPORT_JSON);
  const markdownPath = path.join(outputDir, RUNWISE_REPORT_MARKDOWN);
  const htmlPath = path.join(outputDir, RUNWISE_REPORT_HTML);
  const renderOptions = { cwd, jsonPath, markdownPath, htmlPath };
  const reportWithFiles = withReportFiles(report, renderOptions);

  await fs.writeFile(jsonPath, `${renderJsonReport(reportWithFiles)}\n`, "utf8");
  await fs.writeFile(markdownPath, `${renderMarkdownReport(reportWithFiles, renderOptions)}\n`, "utf8");
  await fs.writeFile(htmlPath, `${renderHtmlReport(reportWithFiles, renderOptions)}\n`, "utf8");

  return {
    jsonPath,
    markdownPath,
    htmlPath
  };
}

export function renderJsonReport(report: RunwiseDoctorReport): string {
  return JSON.stringify(report, null, 2);
}

export function renderMarkdownReport(
  report: RunwiseDoctorReport,
  options: ReportRenderOptions = {}
): string {
  const lines = [
    "# Runwise Doctor Report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    `Scanned path: ${report.scannedPath}`,
    "",
    `Overall score: ${report.summary.overallScore}/100`,
    "",
    "## Rule Summary",
    "",
    "| Rule status | Count |",
    "| --- | ---: |",
    `| Total | ${report.rules.total} |`,
    `| Passed | ${report.rules.passed} |`,
    `| Failed | ${report.rules.failed} |`,
    `| Not applicable | ${report.rules.notApplicable} |`,
    `| Blocking | ${report.rules.blocking} |`,
    "",
    "## Severity Summary",
    "",
    "| Severity | Count |",
    "| --- | ---: |",
    `| Critical | ${report.summary.critical} |`,
    `| High | ${report.summary.high} |`,
    `| Medium | ${report.summary.medium} |`,
    `| Low | ${report.summary.low} |`,
    `| Info | ${report.summary.info} |`,
    `| Blocking findings | ${report.rules.blocking} |`,
    "",
    "## What to Fix First",
    "",
    ...formatFixFirstMarkdown(report.findings),
    "",
    "## Findings"
  ];

  for (const severity of SEVERITY_ORDER) {
    const findings = getFindingsBySeverity(report.findings, severity);
    if (findings.length === 0) {
      continue;
    }

    lines.push("", `### ${capitalize(severity)}`);

    for (const finding of findings) {
      lines.push(...formatFindingMarkdown(finding));
    }
  }

  if (report.findings.length === 0) {
    lines.push("", "No findings. Keep the current readiness baseline healthy.");
  }

  lines.push(
    "",
    "## Report Files",
    "",
    `- JSON: \`${formatReportPath(options.cwd, options.jsonPath, report.reportFiles?.json ?? ".runwise/runwise-report.json")}\``,
    `- Markdown: \`${formatReportPath(options.cwd, options.markdownPath, report.reportFiles?.markdown ?? ".runwise/runwise-report.md")}\``,
    `- HTML: \`${formatReportPath(options.cwd, options.htmlPath, report.reportFiles?.html ?? ".runwise/runwise-report.html")}\``
  );

  return lines.join("\n");
}

export function renderHtmlReport(
  report: RunwiseDoctorReport,
  options: ReportRenderOptions = {}
): string {
  const fixFirst = getPriorityFindings(report.findings).slice(0, 5);
  const scoreBadge = `<span class="score"><strong>${report.summary.overallScore}</strong><span>/100</span></span>`;
  const headerMetrics = [
    renderMetric("Generated", report.generatedAt),
    renderMetric("Scanned path", report.scannedPath),
    renderMetric("Overall score", scoreBadge, false)
  ].join("\n");
  const scoreMetrics = [
    renderMetric("Overall", `${report.summary.overallScore}/100`),
    renderMetric("Critical", String(report.summary.critical)),
    renderMetric("High", String(report.summary.high)),
    renderMetric("Medium", String(report.summary.medium)),
    renderMetric("Low", String(report.summary.low)),
    renderMetric("Info", String(report.summary.info)),
    renderMetric("Blocking", String(report.rules.blocking))
  ].join("\n");
  const ruleMetrics = [
    renderMetric("Total rules", String(report.rules.total)),
    renderMetric("Passed", String(report.rules.passed)),
    renderMetric("Failed", String(report.rules.failed)),
    renderMetric("Not applicable", String(report.rules.notApplicable)),
    renderMetric("Blocking", String(report.rules.blocking))
  ].join("\n");
  const fixFirstHtml =
    fixFirst.length > 0
      ? `<div class="finding-list">${fixFirst.map(renderFindingCard).join("\n")}</div>`
      : `<div class="empty-state">No priority findings. / 暂无优先修复项。</div>`;
  const findingsHtml = renderFindingsBySeverity(report.findings);
  const jsonReportPath = formatReportPath(
    options.cwd,
    options.jsonPath,
    report.reportFiles?.json ?? ".runwise/runwise-report.json"
  );
  const markdownReportPath = formatReportPath(
    options.cwd,
    options.markdownPath,
    report.reportFiles?.markdown ?? ".runwise/runwise-report.md"
  );
  const htmlReportPath = formatReportPath(
    options.cwd,
    options.htmlPath,
    report.reportFiles?.html ?? ".runwise/runwise-report.html"
  );

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Runwise Doctor Report</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f7f7f3;
      --panel: #ffffff;
      --text: #191a17;
      --muted: #62665f;
      --border: #d9ddd2;
      --accent: #0f766e;
      --accent-soft: #d9f2ee;
      --critical: #b42318;
      --high: #c2410c;
      --medium: #b7791f;
      --low: #2563eb;
      --info: #4b5563;
      --shadow: 0 18px 50px rgba(20, 24, 18, 0.08);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #11130f;
        --panel: #1a1d17;
        --text: #f3f4ef;
        --muted: #b7bcae;
        --border: #33382e;
        --accent: #5eead4;
        --accent-soft: #133936;
        --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      }
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
    }
    main {
      max-width: 1160px;
      margin: 0 auto;
      padding: 40px 20px 56px;
    }
    header {
      padding: 32px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }
    h1, h2, h3, p { margin-top: 0; }
    h1 { margin-bottom: 8px; font-size: clamp(2rem, 5vw, 4rem); line-height: 1; letter-spacing: 0; }
    h2 { margin: 32px 0 16px; font-size: 1.35rem; }
    h3 { margin-bottom: 10px; font-size: 1rem; }
    .tagline { color: var(--muted); max-width: 780px; margin-bottom: 6px; }
    .meta-grid, .metric-grid, .category-grid, .rule-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }
    .meta-grid { margin-top: 24px; }
    .metric, .finding, .empty-state {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel);
      padding: 16px;
    }
    .metric-label { color: var(--muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .metric-value { margin-top: 4px; font-size: 1.45rem; font-weight: 750; overflow-wrap: anywhere; }
    .score {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      color: var(--accent);
    }
    .score strong { font-size: clamp(2.4rem, 8vw, 5rem); line-height: 1; }
    .score span { color: var(--muted); font-size: 1.1rem; }
    .section {
      margin-top: 22px;
      padding: 24px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.42);
    }
    @media (prefers-color-scheme: dark) {
      .section { background: rgba(255, 255, 255, 0.025); }
    }
    .finding-list { display: grid; gap: 12px; }
    .finding-head {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-critical { color: var(--critical); }
    .badge-high { color: var(--high); }
    .badge-medium { color: var(--medium); }
    .badge-low { color: var(--low); }
    .badge-info { color: var(--info); }
    .badge-blocking { color: var(--critical); background: rgba(180, 35, 24, 0.08); }
    .detail { color: var(--muted); }
    .finding-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .finding-grid p { margin-bottom: 8px; }
    code {
      padding: 2px 5px;
      border-radius: 5px;
      background: var(--accent-soft);
      color: var(--text);
      overflow-wrap: anywhere;
    }
    footer {
      margin-top: 36px;
      padding-top: 18px;
      border-top: 1px solid var(--border);
      color: var(--muted);
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Runwise</h1>
      <p class="tagline">Local-first AI readiness, tracing, replay and eval toolkit.</p>
      <p class="tagline">面向 AI 项目的本地优先上线体检、运行审计、失败回放与评测生成工具。</p>
      <div class="meta-grid">
        ${headerMetrics}
      </div>
    </header>

    <section class="section" aria-labelledby="score-title">
      <h2 id="score-title">Score Summary / 评分摘要</h2>
      <div class="metric-grid">
        ${scoreMetrics}
      </div>
    </section>

    <section class="section" aria-labelledby="rules-title">
      <h2 id="rules-title">Rule Summary / 规则摘要</h2>
      <div class="rule-grid">
        ${ruleMetrics}
      </div>
    </section>

    <section class="section" aria-labelledby="category-title">
      <h2 id="category-title">Category Scores / 分类评分</h2>
      ${renderCategoryScores(report.summary.categoryScores)}
    </section>

    <section class="section" aria-labelledby="fix-first-title">
      <h2 id="fix-first-title">What to Fix First / 优先修复项</h2>
      ${fixFirstHtml}
    </section>

    <section class="section" aria-labelledby="findings-title">
      <h2 id="findings-title">Findings / 检查发现</h2>
      ${findingsHtml}
    </section>

    <section class="section" aria-labelledby="files-title">
      <h2 id="files-title">Report Files / 报告文件</h2>
      <p><code>${escapeHtml(jsonReportPath)}</code></p>
      <p><code>${escapeHtml(markdownReportPath)}</code></p>
      <p><code>${escapeHtml(htmlReportPath)}</code></p>
    </section>

    <footer>
      <p>Generated by Runwise.<br>Local-first AI readiness, tracing, replay and eval toolkit.</p>
      <p>由 Runwise 生成。<br>面向 AI 项目的本地优先上线体检、运行审计、失败回放与评测生成工具。</p>
    </footer>
  </main>
</body>
</html>`;
}

export const formatDoctorReportJson = renderJsonReport;
export const formatDoctorReportMarkdown = renderMarkdownReport;

function withReportFiles(
  report: RunwiseDoctorReport,
  options: Required<ReportRenderOptions>
): RunwiseDoctorReport {
  return {
    ...report,
    reportFiles: {
      json: formatReportPath(options.cwd, options.jsonPath, ".runwise/runwise-report.json"),
      markdown: formatReportPath(options.cwd, options.markdownPath, ".runwise/runwise-report.md"),
      html: formatReportPath(options.cwd, options.htmlPath, ".runwise/runwise-report.html")
    }
  };
}

function formatFindingMarkdown(finding: RunwiseFinding): string[] {
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

function renderFindingsBySeverity(findings: RunwiseFinding[]): string {
  if (findings.length === 0) {
    return `<div class="empty-state">No findings. Keep the current readiness baseline healthy.<br>暂无 finding，请保持当前就绪度基线。</div>`;
  }

  return SEVERITY_ORDER.map((severity) => {
    const severityFindings = getFindingsBySeverity(findings, severity);
    if (severityFindings.length === 0) {
      return "";
    }

    return `<h3>${capitalize(severity)}</h3><div class="finding-list">${severityFindings.map(renderFindingCard).join("\n")}</div>`;
  })
    .filter(Boolean)
    .join("\n");
}

function renderFindingCard(finding: RunwiseFinding): string {
  const ruleId = finding.ruleId
    ? `<span class="badge">Rule: ${escapeHtml(finding.ruleId)}</span>`
    : "";
  const file = finding.file
    ? `<p class="detail">File: <code>${escapeHtml(finding.file)}</code></p>`
    : "";
  const blocking = finding.blocking === true
    ? `<span class="badge badge-blocking">Blocking</span>`
    : "";

  return `<article class="finding">
  <div class="finding-head">
    <span class="badge badge-${finding.severity}">${finding.severity}</span>
    <span class="badge">${escapeHtml(finding.category)}</span>
    ${ruleId}
    ${blocking}
  </div>
  <h3>${escapeHtml(finding.title)}</h3>
  <p class="detail">${escapeHtml(finding.titleZh)}</p>
  ${file}
  <div class="finding-grid">
    <div>
      <p><strong>Message</strong></p>
      <p>${escapeHtml(finding.message)}</p>
      <p><strong>Recommendation</strong></p>
      <p>${escapeHtml(finding.recommendation)}</p>
    </div>
    <div>
      <p><strong>中文说明</strong></p>
      <p>${escapeHtml(finding.messageZh)}</p>
      <p><strong>中文建议</strong></p>
      <p>${escapeHtml(finding.recommendationZh)}</p>
    </div>
  </div>
</article>`;
}

function renderCategoryScores(
  categoryScores: RunwiseDoctorReport["summary"]["categoryScores"]
): string {
  if (!categoryScores || Object.keys(categoryScores).length === 0) {
    return `<div class="empty-state">Category scoring will be refined in a later report loop.<br>分类评分将在后续报告 loop 中继续细化。</div>`;
  }

  return `<div class="category-grid">${Object.entries(categoryScores)
    .map(([category, score]) => renderMetric(formatCategory(category as RunwiseCategory), `${score}/100`))
    .join("\n")}</div>`;
}

function renderMetric(label: string, value: string, escapeValue = true): string {
  return `<div class="metric"><div class="metric-label">${escapeHtml(label)}</div><div class="metric-value">${escapeValue ? escapeHtml(value) : value}</div></div>`;
}

function formatFixFirstMarkdown(findings: RunwiseFinding[]): string[] {
  const priorityFindings = getPriorityFindings(findings).slice(0, 5);

  if (priorityFindings.length === 0) {
    return ["No priority findings. Keep the current readiness baseline healthy."];
  }

  return priorityFindings.map((finding) => {
    const prefix = finding.blocking === true ? "Blocking" : capitalize(finding.severity);
    return `- ${prefix}: ${escapeMarkdown(finding.title)} / ${escapeMarkdown(finding.titleZh)} (\`${finding.id}\`)`;
  });
}

function getPriorityFindings(findings: RunwiseFinding[]): RunwiseFinding[] {
  return [...findings]
    .filter(
      (finding) =>
        finding.blocking === true ||
        finding.severity === "critical" ||
        finding.severity === "high" ||
        finding.severity === "medium"
    )
    .sort(compareFindingsByPriority);
}

function compareFindingsByPriority(a: RunwiseFinding, b: RunwiseFinding): number {
  if (a.blocking === true && b.blocking !== true) {
    return -1;
  }
  if (a.blocking !== true && b.blocking === true) {
    return 1;
  }

  return SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
}

function getFindingsBySeverity(
  findings: RunwiseFinding[],
  severity: RunwiseSeverity
): RunwiseFinding[] {
  return findings.filter((finding) => finding.severity === severity);
}

function formatReportPath(
  cwd: string | undefined,
  reportPath: string | undefined,
  fallback: string
): string {
  if (!reportPath) {
    return fallback;
  }

  if (!cwd) {
    return reportPath;
  }

  const relativePath = path.relative(cwd, reportPath);
  return relativePath.startsWith("..") ? reportPath : relativePath;
}

function formatCategory(category: RunwiseCategory): string {
  return category;
}

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function escapeMarkdown(value: string): string {
  return value.replaceAll("|", "\\|");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
