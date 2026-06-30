import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliBin = resolve(rootDir, "node_modules/.bin/runwise");
const fixtureRoot = realpathSync(mkdtempSync(join(tmpdir(), "runwise-doctor-")));

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

try {
  createFixtureProject(fixtureRoot);

  const result = spawnSync(cliBin, ["doctor"], {
    cwd: fixtureRoot,
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  assert.equal(
    result.status,
    0,
    `runwise doctor failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
  );
  assert.match(result.stdout, /Runwise Doctor/);
  assert.match(result.stdout, /Reports:/);

  const reportDir = join(fixtureRoot, ".runwise");
  const jsonPath = join(reportDir, "runwise-report.json");
  const markdownPath = join(reportDir, "runwise-report.md");

  assert.equal(existsSync(jsonPath), true, "JSON report should be generated");
  assert.equal(existsSync(markdownPath), true, "Markdown report should be generated");

  const report = JSON.parse(readFileSync(jsonPath, "utf8"));
  const markdown = readFileSync(markdownPath, "utf8");

  assert.equal(report.tool, "runwise");
  assert.equal(report.command, "doctor");
  assert.equal(report.scannedPath, fixtureRoot);
  assert.equal(report.checks.governanceFilesDetected, true);
  assert.equal(report.summary.overallScore >= 0, true);
  assert.equal(report.summary.overallScore <= 100, true);

  assertFinding(report, "evals.missing", "medium");
  assertFinding(report, "tracing.missing", "medium");
  assertFinding(report, "governance.complete", "info");

  assert.match(markdown, /# Runwise Doctor Report/);
  assert.match(markdown, /No eval coverage detected/);
  assert.match(markdown, /未检测到评测覆盖/);
  assert.match(markdown, /No trace coverage detected/);
  assert.match(markdown, /未检测到追踪覆盖/);
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}

console.log("Runwise Doctor CLI tests passed.");

function createFixtureProject(projectRoot) {
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

  for (const file of governanceFiles) {
    writeFileSync(join(projectRoot, file), `# ${file}\n`);
  }
}

function assertFinding(report, id, severity) {
  const finding = report.findings.find((item) => item.id === id);
  assert.ok(finding, `Expected finding ${id}`);
  assert.equal(finding.severity, severity, `Expected ${id} severity ${severity}`);
}
