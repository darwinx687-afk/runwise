import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { get } from "node:http";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliBin = resolve(rootDir, "node_modules/.bin/runwise");
const actionSummaryBin = resolve(rootDir, "packages/github-action/src/action-summary.mjs");
const expectedRuleCount = 15;

const governanceFiles = [
  "PROJECT_CONSTITUTION.md",
  "PRODUCT_SPEC.md",
  "ARCHITECTURE.md",
  "CODEX_LOOP_PROTOCOL.md",
  "ROADMAP.md",
  "RUN_STATE.md",
  "DECISION_LOG.md",
  "NON_GOALS.md"
];

const fixtureRoots = [];
const viewerProcesses = [];

try {
  const helpRun = runCli(["--help"]);
  assert.equal(helpRun.status, 0);
  assert.match(helpRun.stdout, /Runwise/);
  assert.match(helpRun.stdout, /doctor\s+Scan the current project and generate local reports/);
  assert.match(helpRun.stdout, /trace\s+Validate local Runwise trace JSON files/);
  assert.match(helpRun.stdout, /eval\s+Generate local eval case files from validated traces/);
  assert.match(helpRun.stdout, /view\s+Open a local dashboard viewer/);

  const missingReportProject = createFixtureProject();
  const missingReportRun = runCli(["view"], missingReportProject);
  assert.equal(missingReportRun.status, 1);
  assert.match(missingReportRun.stderr, /No local report found/);
  assert.match(missingReportRun.stderr, /\.runwise\/runwise-report\.json/);
  assert.match(missingReportRun.stderr, /pnpm exec runwise doctor/);

  const validTraceRun = runCli(["trace", "validate", "examples/traces/valid-agent-run.json"]);
  assert.equal(validTraceRun.status, 0);
  assert.match(validTraceRun.stdout, /Runwise Trace Validator/);
  assert.match(validTraceRun.stdout, /Result: valid/);
  assert.match(validTraceRun.stdout, /Issues: 0 errors, 0 warnings/);

  const invalidTraceRun = runCli(["trace", "validate", "examples/traces/invalid-agent-run.json"]);
  assert.equal(invalidTraceRun.status, 1);
  assert.match(invalidTraceRun.stdout, /Result: invalid/);
  assert.match(invalidTraceRun.stdout, /runId is required \/ 缺少必填字段 runId/);
  assert.match(invalidTraceRun.stdout, /type must be a supported trace step type/);

  const traceFixtureDir = createTraceFixtureDirectory();
  const emptyStepsRun = runCli(["trace", "validate", join(traceFixtureDir, "empty-steps.json")]);
  assert.equal(emptyStepsRun.status, 0);
  assert.match(emptyStepsRun.stdout, /Result: valid/);
  assert.match(emptyStepsRun.stdout, /Trace has no steps \/ Trace 没有任何 step/);

  const riskWarningRun = runCli(["trace", "validate", "examples/traces/mcp-risk-agent-run.json"]);
  assert.equal(riskWarningRun.status, 0);
  assert.match(riskWarningRun.stdout, /Trace has high or critical tool risk but no approval step/);

  const replayRun = runCli(["trace", "replay", "examples/traces/mcp-risk-agent-run.json"]);
  const replayPath = join(rootDir, ".runwise/replays/mcp-risk-run-001-replay.md");
  assert.equal(
    replayRun.status,
    0,
    `trace replay failed\nstdout:\n${replayRun.stdout}\nstderr:\n${replayRun.stderr}`
  );
  assert.match(replayRun.stdout, /Runwise Trace Replay/);
  assert.match(replayRun.stdout, /Steps: 3/);
  assert.match(replayRun.stdout, /Risk: 0 critical, 1 high, 0 medium, 1 low/);
  assert.match(replayRun.stdout, /Approval: 0 request, 0 response/);
  assert.match(replayRun.stdout, /\.runwise\/replays\/mcp-risk-run-001-replay\.md/);
  assert.equal(existsSync(replayPath), true, "Replay Markdown report should be generated");
  const replayMarkdown = readFileSync(replayPath, "utf8");
  assert.match(replayMarkdown, /# Runwise Trace Replay/);
  assert.match(replayMarkdown, /## Summary \/ 摘要/);
  assert.match(replayMarkdown, /## Timeline \/ 时间线/);
  assert.match(replayMarkdown, /检测到高风险工具调用/);

  const invalidReplayRun = runCli(["trace", "replay", "examples/traces/invalid-agent-run.json"]);
  assert.equal(invalidReplayRun.status, 1);
  assert.match(invalidReplayRun.stderr, /Trace is invalid/);
  assert.match(invalidReplayRun.stderr, /runId is required \/ 缺少必填字段 runId/);

  const approvalReplay = createApprovalReplayFixture();
  const approvalReplayRun = runCli([
    "trace",
    "replay",
    approvalReplay.tracePath,
    "--output",
    approvalReplay.outputDir
  ]);
  assert.equal(
    approvalReplayRun.status,
    0,
    `approval replay failed\nstdout:\n${approvalReplayRun.stdout}\nstderr:\n${approvalReplayRun.stderr}`
  );
  assert.match(approvalReplayRun.stdout, /Steps: 5/);
  assert.match(approvalReplayRun.stdout, /Risk: 0 critical, 1 high, 0 medium, 1 low/);
  assert.match(approvalReplayRun.stdout, /Approval: 1 request, 1 response/);
  assert.equal(existsSync(approvalReplay.replayPath), true);

  const evalRun = runCli(["eval", "generate", "examples/traces/mcp-risk-agent-run.json"]);
  const evalBasePath = join(rootDir, ".runwise/evals/mcp-risk-run-001-eval");
  const evalJsonPath = `${evalBasePath}.json`;
  const evalYamlPath = `${evalBasePath}.yaml`;
  const evalMarkdownPath = `${evalBasePath}.md`;
  assert.equal(
    evalRun.status,
    0,
    `eval generate failed\nstdout:\n${evalRun.stdout}\nstderr:\n${evalRun.stderr}`
  );
  assert.match(evalRun.stdout, /Runwise Failure-to-Eval/);
  assert.match(evalRun.stdout, /Run ID: mcp-risk-run-001/);
  assert.match(evalRun.stdout, /Eval Case: mcp-risk-run-001-eval/);
  assert.match(evalRun.stdout, /Type: approval_regression/);
  assert.match(evalRun.stdout, /Assertions: 1/);
  assert.match(evalRun.stdout, /Risk tags: partial, mcp, high-risk-tool, missing-approval/);
  assert.match(evalRun.stdout, /\.runwise\/evals\/mcp-risk-run-001-eval\.json/);
  assert.match(evalRun.stdout, /\.runwise\/evals\/mcp-risk-run-001-eval\.yaml/);
  assert.match(evalRun.stdout, /\.runwise\/evals\/mcp-risk-run-001-eval\.md/);
  assert.equal(existsSync(evalJsonPath), true, "Eval JSON should be generated");
  assert.equal(existsSync(evalYamlPath), true, "Eval YAML should be generated");
  assert.equal(existsSync(evalMarkdownPath), true, "Eval Markdown should be generated");
  const evalCase = JSON.parse(readFileSync(evalJsonPath, "utf8"));
  assert.equal(evalCase.schema, "runwise.eval_case");
  assert.equal(evalCase.schemaVersion, "0.1");
  assert.equal(evalCase.caseId, "mcp-risk-run-001-eval");
  assert.equal(evalCase.type, "approval_regression");
  assert.match(evalCase.title, /Approval regression/);
  assert.match(evalCase.titleZh, /审批回归用例/);
  assert.equal(evalCase.assertions[0].type, "must_ask_approval");
  assert.match(evalCase.expectedBehaviorZh[0], /执行高风险工具前应请求审批/);
  assert.deepEqual(evalCase.riskTags, [
    "partial",
    "mcp",
    "high-risk-tool",
    "missing-approval"
  ]);
  const evalYaml = readFileSync(evalYamlPath, "utf8");
  assert.match(evalYaml, /schema: "runwise\.eval_case"/);
  assert.match(evalYaml, /type: "approval_regression"/);
  assert.match(evalYaml, /must_ask_approval/);
  const evalMarkdown = readFileSync(evalMarkdownPath, "utf8");
  assert.match(evalMarkdown, /# Runwise Eval Case/);
  assert.match(evalMarkdown, /## Summary \/ 摘要/);
  assert.match(evalMarkdown, /## Expected Behavior \/ 预期行为/);
  assert.match(evalMarkdown, /Agent 在执行高风险工具前应请求审批/);

  const invalidEvalRun = runCli(["eval", "generate", "examples/traces/invalid-agent-run.json"]);
  assert.equal(invalidEvalRun.status, 1);
  assert.match(invalidEvalRun.stderr, /Runwise Failure-to-Eval/);
  assert.match(invalidEvalRun.stderr, /Trace is invalid/);
  assert.match(invalidEvalRun.stderr, /runId is required \/ 缺少必填字段 runId/);

  const errorEval = createEvalOutputFixture("runwise-error-eval-");
  const errorEvalRun = runCli([
    "eval",
    "generate",
    "examples/traces/error-agent-run.json",
    "--output",
    errorEval.outputDir
  ]);
  assert.equal(
    errorEvalRun.status,
    0,
    `error eval failed\nstdout:\n${errorEvalRun.stdout}\nstderr:\n${errorEvalRun.stderr}`
  );
  assert.match(errorEvalRun.stdout, /Type: failure_regression/);
  const errorEvalCase = JSON.parse(
    readFileSync(join(errorEval.outputDir, "error-run-001-eval.json"), "utf8")
  );
  assert.equal(errorEvalCase.type, "failure_regression");
  assert.equal(errorEvalCase.assertions[0].type, "must_handle_error");

  const successEval = createEvalOutputFixture("runwise-success-eval-");
  const successEvalRun = runCli([
    "eval",
    "generate",
    "examples/traces/valid-agent-run.json",
    "--output",
    successEval.outputDir,
    "--format",
    "json"
  ]);
  assert.equal(successEvalRun.status, 0);
  assert.match(successEvalRun.stdout, /Type: success_baseline/);
  assert.match(successEvalRun.stdout, /Assertions: 1/);
  assert.equal(existsSync(join(successEval.outputDir, "agent-run-001-eval.json")), true);
  assert.equal(existsSync(join(successEval.outputDir, "agent-run-001-eval.yaml")), false);
  assert.equal(existsSync(join(successEval.outputDir, "agent-run-001-eval.md")), false);
  const successEvalCase = JSON.parse(
    readFileSync(join(successEval.outputDir, "agent-run-001-eval.json"), "utf8")
  );
  assert.equal(successEvalCase.type, "success_baseline");
  assert.equal(successEvalCase.assertions[0].type, "must_include");

  const ragEval = createRagEvalFixture();
  const ragEvalRun = runCli([
    "eval",
    "generate",
    ragEval.tracePath,
    "--output",
    ragEval.outputDir
  ]);
  assert.equal(
    ragEvalRun.status,
    0,
    `rag eval failed\nstdout:\n${ragEvalRun.stdout}\nstderr:\n${ragEvalRun.stderr}`
  );
  const ragEvalCase = JSON.parse(readFileSync(ragEval.jsonPath, "utf8"));
  assert.equal(ragEvalCase.type, "rag_grounding_regression");
  assert.equal(ragEvalCase.assertions[0].type, "must_cite_source");
  assert.match(ragEvalCase.expectedBehavior[0], /retrieved context/);

  const traceDirectoryRun = runCli(["trace", "validate", "examples/traces"]);
  assert.equal(traceDirectoryRun.status, 1);
  assert.match(traceDirectoryRun.stdout, /Scanned directory: examples\/traces/);
  assert.match(traceDirectoryRun.stdout, /Files: 4/);
  assert.match(traceDirectoryRun.stdout, /Valid: 3/);
  assert.match(traceDirectoryRun.stdout, /Invalid: 1/);

  const base = createFixtureProject();
  const baseRun = runDoctor(base);
  const customOutputProject = createFixtureProject();
  const customOutputRun = runCli(
    ["doctor", "--cwd", customOutputProject, "--output", "custom-runwise"],
    rootDir
  );
  const customOutputDir = join(customOutputProject, "custom-runwise");
  const customJsonPath = join(customOutputDir, "runwise-report.json");
  assert.equal(
    customOutputRun.status,
    0,
    `runwise doctor --cwd/--output failed\nstdout:\n${customOutputRun.stdout}\nstderr:\n${customOutputRun.stderr}`
  );
  assert.equal(existsSync(customJsonPath), true, "Custom JSON report should be generated");
  assert.equal(
    JSON.parse(readFileSync(customJsonPath, "utf8")).scannedPath,
    customOutputProject
  );

  assert.match(baseRun.stdout, /Runwise Doctor/);
  assert.match(baseRun.stdout, /Rules:/);
  assert.match(baseRun.stdout, /Reports:/);
  assert.match(baseRun.stdout, /\.runwise\/runwise-report\.html/);
  assert.equal(existsSync(baseRun.jsonPath), true, "JSON report should be generated");
  assert.equal(existsSync(baseRun.markdownPath), true, "Markdown report should be generated");
  assert.equal(existsSync(baseRun.htmlPath), true, "HTML report should be generated");

  assert.equal(baseRun.report.tool, "runwise");
  assert.equal(baseRun.report.command, "doctor");
  assert.equal(baseRun.report.scannedPath, base);
  assert.equal(baseRun.report.rules.total, expectedRuleCount);
  assert.equal(
    baseRun.report.rules.passed +
      baseRun.report.rules.failed +
      baseRun.report.rules.notApplicable,
    baseRun.report.rules.total
  );
  assert.equal(baseRun.report.checks.governanceFilesDetected, true);
  assert.equal(baseRun.report.summary.overallScore >= 0, true);
  assert.equal(baseRun.report.summary.overallScore <= 100, true);
  assert.ok(baseRun.report.summary.categoryScores, "Category scores should be included");
  assert.deepEqual(baseRun.report.reportFiles, {
    json: ".runwise/runwise-report.json",
    markdown: ".runwise/runwise-report.md",
    html: ".runwise/runwise-report.html"
  });

  assertFinding(baseRun.report, {
    ruleId: "evals.coverage_present",
    severity: "medium",
    blocking: false
  });
  assertFinding(baseRun.report, {
    ruleId: "tracing.coverage_present",
    severity: "medium",
    blocking: false
  });

  assert.match(baseRun.markdown, /## Rule Summary/);
  assert.match(baseRun.markdown, /Blocking findings/);
  assert.match(baseRun.markdown, /## What to Fix First/);
  assert.match(baseRun.markdown, /## Report Files/);
  assert.match(baseRun.markdown, /No eval coverage detected/);
  assert.match(baseRun.markdown, /未检测到评测覆盖/);
  assert.match(baseRun.markdown, /\.runwise\/runwise-report\.json/);
  assert.match(baseRun.markdown, /\.runwise\/runwise-report\.md/);
  assert.match(baseRun.markdown, /\.runwise\/runwise-report\.html/);

  assert.match(baseRun.html, /<h1>Runwise<\/h1>/);
  assert.match(baseRun.html, /Local-first AI readiness, tracing, replay and eval toolkit/);
  assert.match(baseRun.html, /面向 AI 项目的本地优先上线体检、运行审计、失败回放与评测生成工具/);
  assert.match(baseRun.html, /Overall score/);
  assert.match(baseRun.html, /Score and Severity Summary/);
  assert.match(baseRun.html, /Rule Summary/);
  assert.match(baseRun.html, /What to Fix First/);
  assert.match(baseRun.html, /Findings/);
  assert.match(baseRun.html, /medium/);
  assert.match(baseRun.html, /No eval coverage detected/);
  assert.match(baseRun.html, /Generated by Runwise/);
  assert.match(baseRun.html, /<style>/);
  assert.doesNotMatch(baseRun.html, /<script\b/i);
  assert.doesNotMatch(baseRun.html, /<link\b/i);
  assert.doesNotMatch(baseRun.html, /https?:\/\//i);
  assert.doesNotMatch(baseRun.html, /\[object Object\]/);
  assert.doesNotMatch(baseRun.html, /TODO|PLACEHOLDER/i);

  await assertViewerServer(base);
  assertActionSummaryHelper(baseRun.report);

  const missingConstitution = createFixtureProject({
    omitGovernance: ["PROJECT_CONSTITUTION.md"]
  });
  const missingConstitutionRun = runDoctor(missingConstitution);
  assertFinding(missingConstitutionRun.report, {
    ruleId: "governance.constitution_present",
    severity: "high",
    blocking: true
  });
  assert.equal(missingConstitutionRun.report.rules.blocking, 1);

  const missingProtocol = createFixtureProject({
    omitGovernance: ["CODEX_LOOP_PROTOCOL.md"]
  });
  const missingProtocolRun = runDoctor(missingProtocol);
  assertFinding(missingProtocolRun.report, {
    ruleId: "governance.codex_loop_protocol_present",
    severity: "high",
    blocking: true
  });
  assert.equal(missingProtocolRun.report.rules.blocking, 1);
} finally {
  for (const child of viewerProcesses) {
    child.kill("SIGTERM");
  }

  for (const fixtureRoot of fixtureRoots) {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

console.log("Runwise CLI, trace, eval, viewer, and action tests passed.");

function runCli(args, cwd = rootDir) {
  return spawnSync(cliBin, args, {
    cwd,
    encoding: "utf8",
    shell: process.platform === "win32"
  });
}

function runActionSummary(report, options = {}) {
  const actionRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-action-")));
  fixtureRoots.push(actionRoot);

  const reportPath = join(actionRoot, "runwise-report.json");
  const summaryPath = join(actionRoot, "step-summary.md");
  const outputPath = join(actionRoot, "github-output.txt");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const args = [
    actionSummaryBin,
    "--report",
    reportPath,
    "--min-score",
    String(options.minScore ?? 0),
    "--fail-on-blocking",
    String(options.failOnBlocking ?? true),
    "--fail-on-severity",
    options.failOnSeverity ?? "critical"
  ];

  const result = spawnSync(process.execPath, args, {
    cwd: rootDir,
    encoding: "utf8",
    env: {
      ...process.env,
      GITHUB_STEP_SUMMARY: summaryPath,
      GITHUB_OUTPUT: outputPath
    }
  });

  return {
    result,
    summary: existsSync(summaryPath) ? readFileSync(summaryPath, "utf8") : "",
    outputs: existsSync(outputPath) ? readFileSync(outputPath, "utf8") : ""
  };
}

function assertActionSummaryHelper(report) {
  const passing = runActionSummary(report, {
    minScore: 70,
    failOnBlocking: true,
    failOnSeverity: "critical"
  });
  assert.equal(
    passing.result.status,
    0,
    `Action summary helper should pass\nstdout:\n${passing.result.stdout}\nstderr:\n${passing.result.stderr}`
  );
  assert.match(passing.summary, /# Runwise Readiness Check/);
  assert.match(passing.summary, /Score: \d+\/100/);
  assert.match(passing.summary, /Reports:/);
  assert.match(passing.summary, /本检查由 Runwise 生成/);
  assert.match(passing.outputs, /score=\d+/);
  assert.match(passing.outputs, /total-findings=\d+/);
  assert.match(passing.outputs, /report-json=\.runwise\/runwise-report\.json/);

  const blockingReport = {
    ...report,
    rules: {
      ...report.rules,
      blocking: 1
    }
  };
  const blocking = runActionSummary(blockingReport, {
    minScore: 0,
    failOnBlocking: true,
    failOnSeverity: "none"
  });
  assert.equal(blocking.result.status, 1, "Blocking findings should fail when enabled");
  assert.match(blocking.result.stderr, /blocking finding/);

  const lowScoreReport = {
    ...report,
    summary: {
      ...report.summary,
      overallScore: 60
    }
  };
  const lowScore = runActionSummary(lowScoreReport, {
    minScore: 70,
    failOnBlocking: false,
    failOnSeverity: "none"
  });
  assert.equal(lowScore.result.status, 1, "Low score should fail below min-score");
  assert.match(lowScore.result.stderr, /below min-score/);

  const severityReport = {
    ...report,
    summary: {
      ...report.summary,
      critical: 1,
      totalFindings: report.summary.totalFindings + 1
    }
  };
  const severityDisabled = runActionSummary(severityReport, {
    minScore: 0,
    failOnBlocking: false,
    failOnSeverity: "none"
  });
  assert.equal(
    severityDisabled.result.status,
    0,
    "fail-on-severity=none should not fail on critical findings"
  );
}

function createFixtureProject(options = {}) {
  const projectRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-doctor-")));
  fixtureRoots.push(projectRoot);

  mkdirSync(join(projectRoot, "apps"), { recursive: true });
  mkdirSync(join(projectRoot, "packages"), { recursive: true });

  writeFileSync(
    join(projectRoot, "package.json"),
    JSON.stringify(
      {
        name: "runwise-test-fixture",
        private: true,
        type: "module"
      },
      null,
      2
    )
  );
  writeFileSync(join(projectRoot, "pnpm-workspace.yaml"), 'packages:\n  - "apps/*"\n  - "packages/*"\n');
  writeFileSync(join(projectRoot, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
  writeFileSync(
    join(projectRoot, "tsconfig.base.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext"
        }
      },
      null,
      2
    )
  );

  const omittedGovernance = new Set(options.omitGovernance ?? []);
  for (const file of governanceFiles) {
    if (!omittedGovernance.has(file)) {
      writeFileSync(join(projectRoot, file), `# ${file}\n`);
    }
  }

  return projectRoot;
}

function createTraceFixtureDirectory() {
  const traceRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-traces-")));
  fixtureRoots.push(traceRoot);

  writeFileSync(
    join(traceRoot, "empty-steps.json"),
    `${JSON.stringify(
      {
        schema: "runwise.agent_trace",
        schemaVersion: "0.1",
        runId: "empty-steps-run",
        status: "success",
        startedAt: "2026-06-30T13:00:00.000Z",
        steps: []
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  return traceRoot;
}

function createApprovalReplayFixture() {
  const replayRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-replay-")));
  fixtureRoots.push(replayRoot);
  const tracePath = join(replayRoot, "approval-run.json");
  const outputDir = join(replayRoot, "replays");
  const replayPath = join(outputDir, "approval-run-001-replay.md");

  writeFileSync(
    tracePath,
    `${JSON.stringify(
      {
        schema: "runwise.agent_trace",
        schemaVersion: "0.1",
        runId: "approval-run-001",
        name: "Approval-gated MCP run",
        status: "success",
        startedAt: "2026-06-30T14:00:00.000Z",
        endedAt: "2026-06-30T14:00:09.000Z",
        steps: [
          {
            stepId: "approval-step-001",
            type: "llm_call",
            name: "plan",
            durationMs: 1000,
            risk: "low"
          },
          {
            stepId: "approval-step-002",
            type: "approval_request",
            name: "request_delete_approval",
            durationMs: 500,
            risk: "none"
          },
          {
            stepId: "approval-step-003",
            type: "approval_response",
            name: "approve_dry_run",
            durationMs: 500,
            risk: "none"
          },
          {
            stepId: "approval-step-004",
            type: "mcp_tool_call",
            name: "filesystem.delete",
            durationMs: 2000,
            risk: "high"
          },
          {
            stepId: "approval-step-005",
            type: "final_output",
            name: "result",
            durationMs: 1000,
            risk: "none"
          }
        ]
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  return {
    tracePath,
    outputDir,
    replayPath
  };
}

function createEvalOutputFixture(prefix) {
  const evalRoot = realpathSync(mkdtempSync(join(tmpdir(), prefix)));
  fixtureRoots.push(evalRoot);

  return {
    outputDir: join(evalRoot, "evals")
  };
}

function createRagEvalFixture() {
  const evalRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-rag-eval-")));
  fixtureRoots.push(evalRoot);
  const tracePath = join(evalRoot, "rag-run.json");
  const outputDir = join(evalRoot, "evals");
  const jsonPath = join(outputDir, "rag-run-001-eval.json");

  writeFileSync(
    tracePath,
    `${JSON.stringify(
      {
        schema: "runwise.agent_trace",
        schemaVersion: "0.1",
        runId: "rag-run-001",
        name: "RAG grounded answer",
        status: "success",
        startedAt: "2026-06-30T15:00:00.000Z",
        endedAt: "2026-06-30T15:00:07.000Z",
        input: {
          question: "What is the refund policy?"
        },
        steps: [
          {
            stepId: "rag-step-001",
            type: "rag_retrieval",
            name: "retrieve_policy",
            durationMs: 1200,
            risk: "low",
            output: {
              sources: ["policy-doc-001"]
            }
          },
          {
            stepId: "rag-step-002",
            type: "final_output",
            name: "answer",
            durationMs: 900,
            risk: "none"
          }
        ]
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  return {
    tracePath,
    outputDir,
    jsonPath
  };
}

function runDoctor(projectRoot) {
  const result = runCli(["doctor"], projectRoot);

  assert.equal(
    result.status,
    0,
    `runwise doctor failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  );

  const reportDir = join(projectRoot, ".runwise");
  const jsonPath = join(reportDir, "runwise-report.json");
  const markdownPath = join(reportDir, "runwise-report.md");
  const htmlPath = join(reportDir, "runwise-report.html");
  const report = JSON.parse(readFileSync(jsonPath, "utf8"));
  const markdown = readFileSync(markdownPath, "utf8");
  const html = readFileSync(htmlPath, "utf8");

  return {
    stdout: result.stdout,
    jsonPath,
    markdownPath,
    htmlPath,
    report,
    markdown,
    html
  };
}

async function assertViewerServer(projectRoot) {
  const child = spawn(cliBin, ["view", "--port", "0"], {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32"
  });
  viewerProcesses.push(child);

  const { stdout, url } = await waitForViewerUrl(child);
  assert.match(stdout, /Runwise Viewer/);
  assert.match(stdout, /Loaded report:/);
  assert.match(stdout, /\.runwise\/runwise-report\.json/);
  assert.match(stdout, /Local dashboard:/);

  const dashboard = await httpGet(url);
  assert.equal(dashboard.statusCode, 200);
  assert.match(dashboard.body, /<h1>Runwise<\/h1>/);
  assert.match(dashboard.body, /Local-first AI readiness, tracing, replay and eval toolkit/);
  assert.match(dashboard.body, /Runwise is local-first\. This viewer reads your generated report file and does not send data anywhere\./);
  assert.match(dashboard.body, /Runwise 采用本地优先设计。此查看器只读取本地生成的报告文件，不会上传数据。/);
  assert.match(dashboard.body, /Overall score/);
  assert.match(dashboard.body, /Rule Summary/);
  assert.match(dashboard.body, /Findings Explorer/);
  assert.match(dashboard.body, /No eval coverage detected/);

  const reportJson = await httpGet(`${url}/report.json`);
  assert.equal(reportJson.statusCode, 200);
  assert.equal(JSON.parse(reportJson.body).tool, "runwise");

  const health = await httpGet(`${url}/health`);
  assert.equal(health.statusCode, 200);
  assert.equal(JSON.parse(health.body).ok, true);

  child.kill("SIGTERM");
}

function waitForViewerUrl(child) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      reject(new Error(`Timed out waiting for viewer URL\nstdout:\n${stdout}\nstderr:\n${stderr}`));
    }, 5000);

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      const match = stdout.match(/http:\/\/localhost:\d+/);
      if (!match) {
        return;
      }

      clearTimeout(timer);
      resolve({ stdout, url: match[0] });
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on("exit", (code) => {
      if (!stdout.match(/http:\/\/localhost:\d+/)) {
        clearTimeout(timer);
        reject(new Error(`Viewer exited before URL with code ${code}\nstdout:\n${stdout}\nstderr:\n${stderr}`));
      }
    });
  });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        resolve({
          statusCode: response.statusCode,
          body
        });
      });
    });

    request.on("error", reject);
    request.end();
  });
}

function assertFinding(report, expected) {
  const finding = report.findings.find((item) => item.ruleId === expected.ruleId);
  assert.ok(finding, `Expected finding for ${expected.ruleId}`);
  assert.equal(
    finding.severity,
    expected.severity,
    `Expected ${expected.ruleId} severity ${expected.severity}`
  );
  assert.equal(
    finding.blocking === true,
    expected.blocking,
    `Expected ${expected.ruleId} blocking ${expected.blocking}`
  );
}
