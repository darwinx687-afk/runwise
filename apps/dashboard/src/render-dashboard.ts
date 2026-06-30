import type {
  RunwiseCategory,
  RunwiseDoctorReport,
  RunwiseFinding,
  RunwiseSeverity
} from "@runwise/schemas";

const SEVERITY_ORDER: RunwiseSeverity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "info"
];

const PRIORITY_SEVERITIES = new Set<RunwiseSeverity>([
  "critical",
  "high",
  "medium"
]);

export function renderDashboardHtml(report: RunwiseDoctorReport): string {
  const findings = report.findings ?? [];
  const priorityFindings = getPriorityFindings(findings).slice(0, 5);
  const categories = getFindingCategories(findings);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Runwise Dashboard Viewer</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f5f7f4;
      --panel: #ffffff;
      --panel-soft: #edf3ef;
      --text: #151816;
      --muted: #5b645e;
      --border: #d5ddd6;
      --accent: #0f766e;
      --accent-strong: #115e59;
      --critical: #b42318;
      --high: #c2410c;
      --medium: #a16207;
      --low: #2563eb;
      --info: #4b5563;
      --shadow: 0 14px 42px rgba(21, 24, 22, 0.08);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #101411;
        --panel: #171d19;
        --panel-soft: #202820;
        --text: #f4f7f3;
        --muted: #a8b1aa;
        --border: #303b34;
        --accent: #5eead4;
        --accent-strong: #99f6e4;
        --shadow: 0 14px 42px rgba(0, 0, 0, 0.36);
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
      max-width: 1180px;
      margin: 0 auto;
      padding: 28px 20px 48px;
    }
    header {
      display: grid;
      gap: 24px;
      grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.6fr);
      align-items: stretch;
      padding: 28px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }
    h1, h2, h3, p { margin-top: 0; }
    h1 {
      margin-bottom: 8px;
      font-size: 2.4rem;
      line-height: 1;
      letter-spacing: 0;
    }
    h2 {
      margin: 0 0 16px;
      font-size: 1.15rem;
      letter-spacing: 0;
    }
    h3 {
      margin-bottom: 8px;
      font-size: 1rem;
      letter-spacing: 0;
    }
    .tagline {
      margin-bottom: 4px;
      color: var(--muted);
      max-width: 720px;
    }
    .meta {
      display: grid;
      gap: 10px;
      margin-top: 22px;
    }
    .meta-row {
      display: grid;
      grid-template-columns: 120px minmax(0, 1fr);
      gap: 12px;
      font-size: 0.92rem;
    }
    .label {
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .value { overflow-wrap: anywhere; }
    .score-panel {
      display: grid;
      place-items: center;
      min-height: 190px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel-soft);
      text-align: center;
    }
    .score-panel strong {
      display: block;
      color: var(--accent-strong);
      font-size: clamp(3rem, 9vw, 5.8rem);
      line-height: 1;
    }
    .section {
      margin-top: 22px;
      padding: 22px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
    }
    .card, .finding {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--panel);
      padding: 16px;
    }
    .card {
      background: var(--panel-soft);
      min-height: 88px;
    }
    .card-value {
      margin-top: 4px;
      font-size: 1.65rem;
      font-weight: 780;
      overflow-wrap: anywhere;
    }
    .bar-list {
      display: grid;
      gap: 12px;
    }
    .bar-row {
      display: grid;
      grid-template-columns: minmax(120px, 190px) minmax(0, 1fr) 54px;
      gap: 12px;
      align-items: center;
    }
    .bar-track {
      height: 10px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--panel-soft);
    }
    .bar-fill {
      height: 100%;
      border-radius: inherit;
      background: var(--accent);
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: end;
      margin-bottom: 16px;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    select {
      min-width: 150px;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 9px 10px;
      background: var(--panel);
      color: var(--text);
      font: inherit;
    }
    .toggle {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      min-height: 40px;
      color: var(--text);
      font-size: 0.94rem;
    }
    .finding-list {
      display: grid;
      gap: 12px;
    }
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
    .badge-blocking {
      color: var(--critical);
      background: rgba(180, 35, 24, 0.08);
    }
    .detail { color: var(--muted); }
    .finding-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    code {
      padding: 2px 5px;
      border-radius: 5px;
      background: var(--panel-soft);
      color: var(--text);
      overflow-wrap: anywhere;
    }
    .empty-state {
      border: 1px dashed var(--border);
      border-radius: 8px;
      padding: 16px;
      color: var(--muted);
      background: var(--panel-soft);
    }
    footer {
      margin-top: 34px;
      padding-top: 18px;
      border-top: 1px solid var(--border);
      color: var(--muted);
    }

    @media (max-width: 780px) {
      header { grid-template-columns: 1fr; }
      .meta-row { grid-template-columns: 1fr; gap: 2px; }
      .bar-row { grid-template-columns: 1fr; gap: 6px; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Runwise</h1>
        <p class="tagline">Local-first AI readiness, tracing, replay and eval toolkit.</p>
        <p class="tagline">面向 AI 项目的本地优先上线体检、运行审计、失败回放与评测生成工具。</p>
        <div class="meta">
          ${renderMetaRow("Generated", report.generatedAt)}
          ${renderMetaRow("Scanned path", report.scannedPath)}
        </div>
      </div>
      <div class="score-panel" aria-label="Overall score">
        <div>
          <span class="label">Overall score</span>
          <strong>${escapeHtml(String(report.summary.overallScore))}</strong>
          <span class="detail">/100</span>
        </div>
      </div>
    </header>

    <section class="section" aria-labelledby="score-cards-title">
      <h2 id="score-cards-title">Score Cards / 评分卡</h2>
      <div class="grid">
        ${renderMetricCard("Overall score", `${report.summary.overallScore}/100`)}
        ${renderMetricCard("Critical", report.summary.critical)}
        ${renderMetricCard("High", report.summary.high)}
        ${renderMetricCard("Medium", report.summary.medium)}
        ${renderMetricCard("Low", report.summary.low)}
        ${renderMetricCard("Info", report.summary.info)}
        ${renderMetricCard("Blocking findings", report.rules.blocking)}
      </div>
    </section>

    <section class="section" aria-labelledby="rules-title">
      <h2 id="rules-title">Rule Summary / 规则摘要</h2>
      <div class="grid">
        ${renderMetricCard("Total rules", report.rules.total)}
        ${renderMetricCard("Passed", report.rules.passed)}
        ${renderMetricCard("Failed", report.rules.failed)}
        ${renderMetricCard("Not applicable", report.rules.notApplicable)}
        ${renderMetricCard("Blocking", report.rules.blocking)}
      </div>
    </section>

    <section class="section" aria-labelledby="category-title">
      <h2 id="category-title">Category Scores / 分类评分</h2>
      ${renderCategoryScores(report.summary.categoryScores)}
    </section>

    <section class="section" aria-labelledby="fix-title">
      <h2 id="fix-title">What to Fix First / 优先修复项</h2>
      ${renderPriorityFindings(priorityFindings)}
    </section>

    <section class="section" aria-labelledby="findings-title">
      <h2 id="findings-title">Findings Explorer / 检查发现</h2>
      ${renderFilters(categories)}
      <p class="detail"><span id="visible-count">${findings.length}</span> of ${findings.length} findings shown.</p>
      ${renderFindings(findings)}
    </section>

    <section class="section" aria-labelledby="report-links-title">
      <h2 id="report-links-title">Report Links / 报告路径</h2>
      <p class="detail">These files are generated locally under the project <code>.runwise</code> directory.</p>
      <p class="detail">这些文件位于项目本地的 <code>.runwise</code> 目录中。</p>
      ${renderReportFiles(report)}
    </section>

    <footer>
      <p>Runwise is local-first. This viewer reads your generated report file and does not send data anywhere.</p>
      <p>Runwise 采用本地优先设计。此查看器只读取本地生成的报告文件，不会上传数据。</p>
    </footer>
  </main>
  <script>
    (() => {
      const severity = document.querySelector("#severity-filter");
      const category = document.querySelector("#category-filter");
      const blockingOnly = document.querySelector("#blocking-only");
      const cards = Array.from(document.querySelectorAll("[data-finding-card]"));
      const visibleCount = document.querySelector("#visible-count");

      function applyFilters() {
        let shown = 0;
        for (const card of cards) {
          const matchesSeverity = severity.value === "all" || card.dataset.severity === severity.value;
          const matchesCategory = category.value === "all" || card.dataset.category === category.value;
          const matchesBlocking = !blockingOnly.checked || card.dataset.blocking === "true";
          const visible = matchesSeverity && matchesCategory && matchesBlocking;
          card.hidden = !visible;
          if (visible) shown += 1;
        }
        visibleCount.textContent = String(shown);
      }

      severity.addEventListener("change", applyFilters);
      category.addEventListener("change", applyFilters);
      blockingOnly.addEventListener("change", applyFilters);
      applyFilters();
    })();
  </script>
</body>
</html>`;
}

function renderMetaRow(label: string, value: string): string {
  return `<div class="meta-row"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value)}</div></div>`;
}

function renderMetricCard(label: string, value: string | number): string {
  return `<div class="card"><div class="label">${escapeHtml(label)}</div><div class="card-value">${escapeHtml(String(value))}</div></div>`;
}

function renderCategoryScores(categoryScores: RunwiseDoctorReport["summary"]["categoryScores"]): string {
  if (!categoryScores || Object.keys(categoryScores).length === 0) {
    return `<div class="empty-state">Category scoring is not available in this report.<br>此报告暂未提供分类评分。</div>`;
  }

  return `<div class="bar-list">${Object.entries(categoryScores)
    .map(([category, score]) => {
      const safeScore = clampScore(score);
      return `<div class="bar-row">
  <div><strong>${escapeHtml(formatCategory(category as RunwiseCategory))}</strong></div>
  <div class="bar-track" aria-label="${escapeHtml(category)} score"><div class="bar-fill" style="width: ${safeScore}%"></div></div>
  <div class="detail">${safeScore}/100</div>
</div>`;
    })
    .join("\n")}</div>`;
}

function renderPriorityFindings(findings: RunwiseFinding[]): string {
  if (findings.length === 0) {
    return `<div class="empty-state">No priority findings. Keep the current readiness baseline healthy.<br>暂无优先修复项，请保持当前就绪度基线。</div>`;
  }

  return `<div class="finding-list">${findings.map(renderFindingCard).join("\n")}</div>`;
}

function renderFilters(categories: RunwiseCategory[]): string {
  return `<div class="filters">
  <label class="field">
    <span class="label">Severity</span>
    <select id="severity-filter">
      <option value="all">All severities</option>
      ${SEVERITY_ORDER.map((severity) => `<option value="${severity}">${capitalize(severity)}</option>`).join("\n")}
    </select>
  </label>
  <label class="field">
    <span class="label">Category</span>
    <select id="category-filter">
      <option value="all">All categories</option>
      ${categories.map((category) => `<option value="${category}">${escapeHtml(formatCategory(category))}</option>`).join("\n")}
    </select>
  </label>
  <label class="toggle">
    <input id="blocking-only" type="checkbox">
    Blocking only
  </label>
</div>`;
}

function renderFindings(findings: RunwiseFinding[]): string {
  if (findings.length === 0) {
    return `<div class="empty-state">No findings. Keep the current readiness baseline healthy.<br>暂无 finding，请保持当前就绪度基线。</div>`;
  }

  return `<div class="finding-list">${findings.map(renderFindingCard).join("\n")}</div>`;
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

  return `<article class="finding" data-finding-card data-severity="${finding.severity}" data-category="${finding.category}" data-blocking="${finding.blocking === true}">
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

function renderReportFiles(report: RunwiseDoctorReport): string {
  const reportFiles = report.reportFiles ?? {
    json: ".runwise/runwise-report.json",
    markdown: ".runwise/runwise-report.md",
    html: ".runwise/runwise-report.html"
  };

  return `<div class="grid">
    ${renderMetricCard("JSON", reportFiles.json)}
    ${renderMetricCard("Markdown", reportFiles.markdown)}
    ${renderMetricCard("Static HTML", reportFiles.html)}
  </div>`;
}

function getPriorityFindings(findings: RunwiseFinding[]): RunwiseFinding[] {
  return [...findings]
    .filter((finding) => finding.blocking === true || PRIORITY_SEVERITIES.has(finding.severity))
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

function getFindingCategories(findings: RunwiseFinding[]): RunwiseCategory[] {
  return [...new Set(findings.map((finding) => finding.category))].sort();
}

function formatCategory(category: RunwiseCategory): string {
  return category;
}

function clampScore(score: number): number {
  if (Number.isNaN(score)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
