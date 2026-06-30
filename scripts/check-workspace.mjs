import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { join, relative } from "node:path";

const rootDir = process.cwd();
const require = createRequire(import.meta.url);
const mode = process.argv.includes("--ts-only") ? "ts-only" : "full";

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".runwise",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

const requiredWorkspaceDirectories = [
  "apps/dashboard",
  "apps/docs",
  "packages/cli",
  "packages/core",
  "packages/schemas",
  "packages/reporter",
  "packages/integrations",
  "packages/github-action",
  "examples/mcp-demo",
  "examples/rag-demo",
  "examples/browser-agent-demo",
  "examples/enterprise-workflow-demo",
  "docs/en",
  "docs/zh-CN"
];

const requiredGovernanceFiles = [
  "PROJECT_CONSTITUTION.md",
  "PRODUCT_SPEC.md",
  "ARCHITECTURE.md",
  "CODEX_LOOP_PROTOCOL.md",
  "ROADMAP.md",
  "RUN_STATE.md",
  "DECISION_LOG.md",
  "NON_GOALS.md",
  "BILINGUAL_STYLE_GUIDE.md",
  "RELEASE_PROTOCOL.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "LICENSE",
  "README.md",
  "README.zh-CN.md"
];

const sourceWorkspaceDirectories = requiredWorkspaceDirectories.filter(
  (directory) => directory.startsWith("apps/") ||
    directory.startsWith("packages/") ||
    directory.startsWith("examples/")
);

const requiredPackageEntryFiles = sourceWorkspaceDirectories.flatMap((directory) => [
  `${directory}/package.json`,
  `${directory}/tsconfig.json`,
  `${directory}/src/index.ts`
]);

const failures = [];
const esbuild = await loadEsbuild();
const tsFiles = collectFiles(rootDir, (filePath) => filePath.endsWith(".ts"));

checkTypeScriptSources(tsFiles);

if (mode === "full") {
  checkRequiredDirectories(requiredWorkspaceDirectories);
  checkRequiredFiles(requiredGovernanceFiles);
  checkRequiredFiles(requiredPackageEntryFiles);
  const jsonFiles = collectFiles(rootDir, (filePath) => filePath.endsWith("package.json"));
  checkPackageJsonFiles(jsonFiles);
  const trackedRunwiseFiles = checkTrackedRunwiseArtifacts();

  finish({
    workspaceDirectories: requiredWorkspaceDirectories.length,
    governanceFiles: requiredGovernanceFiles.length,
    packageEntryFiles: requiredPackageEntryFiles.length,
    packageJsonFiles: jsonFiles.length,
    tsFiles: tsFiles.length,
    trackedRunwiseFiles: trackedRunwiseFiles.length
  });
} else {
  finish({
    tsFiles: tsFiles.length
  });
}

function checkRequiredDirectories(directories) {
  for (const directory of directories) {
    const path = join(rootDir, directory);
    if (!existsSync(path)) {
      failures.push(`Missing required workspace directory: ${directory}`);
      continue;
    }

    if (!statSync(path).isDirectory()) {
      failures.push(`Required workspace path is not a directory: ${directory}`);
    }
  }
}

function checkRequiredFiles(files) {
  for (const file of files) {
    const path = join(rootDir, file);
    if (!existsSync(path)) {
      failures.push(`Missing required file: ${file}`);
      continue;
    }

    if (!statSync(path).isFile()) {
      failures.push(`Required path is not a file: ${file}`);
    }
  }
}

function checkPackageJsonFiles(files) {
  for (const filePath of files) {
    const relativePath = relative(rootDir, filePath);
    try {
      JSON.parse(readFileSync(filePath, "utf8"));
    } catch (error) {
      failures.push(`Invalid package JSON: ${relativePath} (${formatError(error)})`);
    }
  }
}

function checkTypeScriptSources(files) {
  for (const filePath of files) {
    const relativePath = relative(rootDir, filePath);
    const source = readFileSync(filePath, "utf8");

    try {
      esbuild.transformSync(source, {
        loader: "ts",
        format: "esm",
        target: "es2022",
        sourcefile: relativePath
      });
    } catch (error) {
      failures.push(`TypeScript syntax/transpile check failed: ${relativePath} (${formatError(error)})`);
    }
  }
}

function checkTrackedRunwiseArtifacts() {
  const result = spawnSync("git", ["ls-files", ".runwise"], {
    cwd: rootDir,
    encoding: "utf8"
  });

  if (result.error) {
    failures.push(`Unable to verify tracked .runwise artifacts: ${result.error.message}`);
    return [];
  }

  if (result.status !== 0) {
    failures.push(`Unable to verify tracked .runwise artifacts: ${result.stderr.trim() || "git ls-files failed"}`);
    return [];
  }

  const files = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const file of files) {
    failures.push(`Generated .runwise artifact is tracked and must be untracked: ${file}`);
  }

  return files;
}

function finish(summary) {
  if (failures.length > 0) {
    console.error("Workspace check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  if (mode === "ts-only") {
    console.log(`Workspace TypeScript check passed: ${summary.tsFiles} TypeScript files syntax/transpile checked.`);
    return;
  }

  console.log(
    [
      "Workspace check passed:",
      `${summary.workspaceDirectories} required workspace directories,`,
      `${summary.governanceFiles} governance files,`,
      `${summary.packageEntryFiles} package entry files,`,
      `${summary.packageJsonFiles} package files,`,
      `${summary.tsFiles} TypeScript files,`,
      `${summary.trackedRunwiseFiles} tracked .runwise artifacts.`
    ].join(" ")
  );
}

async function loadEsbuild() {
  const directCandidate = join(rootDir, "node_modules", "esbuild");
  if (existsSync(directCandidate)) {
    return require(directCandidate);
  }

  const pnpmDir = join(rootDir, "node_modules", ".pnpm");
  const candidate = readdirSync(pnpmDir)
    .filter((entry) => entry.startsWith("esbuild@"))
    .sort()
    .at(-1);

  if (!candidate) {
    throw new Error("esbuild is required for workspace checks but was not found.");
  }

  return require(join(pnpmDir, candidate, "node_modules", "esbuild"));
}

function collectFiles(directory, predicate) {
  const results = [];

  function walk(currentDirectory) {
    for (const entry of readdirSync(currentDirectory)) {
      if (ignoredDirectories.has(entry)) {
        continue;
      }

      const entryPath = join(currentDirectory, entry);
      const stat = statSync(entryPath);

      if (stat.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (stat.isFile() && predicate(entryPath)) {
        results.push(entryPath);
      }
    }
  }

  walk(directory);
  return results.sort();
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
