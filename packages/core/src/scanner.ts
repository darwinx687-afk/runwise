import { promises as fs } from "node:fs";
import * as path from "node:path";
import {
  detectRunwiseIntegrations,
  type RunwisePackageJsonSource,
  type RunwiseTextSource
} from "@runwise/integrations";
import type { RunwiseDoctorReport, RunwiseIntegrationDetection } from "@runwise/schemas";
import { runRuleEngine } from "./rule-engine.js";
import { summarizeFindings, summarizeRuleResults } from "./scoring.js";

export const RUNWISE_PROJECT_NAME = "Runwise";
export const RUNWISE_CURRENT_PHASE = "Phase 10";
export const RUNWISE_DOCTOR_VERSION = "0.1.0-preview.0";

export interface RunwiseDoctorScanOptions {
  cwd?: string;
  version?: string;
  generatedAt?: string;
}

export type RunwiseProjectContext = {
  rootPath: string;
  files: string[];
  directories: string[];
  packageJson?: unknown;
  packageManager: {
    pnpm: boolean;
    npm: boolean;
    yarn: boolean;
    bun: boolean;
  };
  workspace: {
    hasPackageJson: boolean;
    hasPnpmWorkspace: boolean;
    hasAppsDir: boolean;
    hasPackagesDir: boolean;
  };
  typescript: {
    hasRootTsconfig: boolean;
    hasBaseTsconfig: boolean;
  };
  governance: {
    present: string[];
    missing: string[];
  };
  aiIndicators: {
    present: string[];
  };
  mcp: {
    configFiles: string[];
    packageIndicators: string[];
    hasApprovalPolicy: boolean;
  };
  evals: {
    detected: boolean;
    locations: string[];
  };
  tracing: {
    detected: boolean;
    locations: string[];
  };
  reports: {
    outputDirectoryAvailable: boolean;
  };
  integrations: {
    detected: RunwiseIntegrationDetection[];
  };
};

const GOVERNANCE_FILES = [
  "PROJECT_CONSTITUTION.md",
  "PRODUCT_SPEC.md",
  "ARCHITECTURE.md",
  "CODEX_LOOP_PROTOCOL.md",
  "ROADMAP.md",
  "RUN_STATE.md",
  "DECISION_LOG.md",
  "NON_GOALS.md"
] as const;

const AI_INDICATORS = [
  "AGENTS.md",
  "CLAUDE.md",
  ".cursor",
  ".windsurf",
  "prompts",
  "evals",
  "traces",
  "mcp.json",
  ".mcp.json",
  "mcp.config.json"
] as const;

const MCP_CONFIG_FILES = ["mcp.json", ".mcp.json", "mcp.config.json"] as const;

const POLICY_FILES = [
  "MCP_POLICY.md",
  "POLICY.md",
  "APPROVAL_POLICY.md",
  "SECURITY.md",
  "PROJECT_CONSTITUTION.md",
  "CODEX_LOOP_PROTOCOL.md",
  "NON_GOALS.md"
] as const;

const IGNORED_SCAN_DIRS = new Set([
  ".git",
  ".next",
  ".runwise",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

export async function scanRunwiseDoctor(
  options: RunwiseDoctorScanOptions = {}
): Promise<RunwiseDoctorReport> {
  const context = await buildProjectContext(options.cwd ?? process.cwd());
  const ruleResults = runRuleEngine(context);
  const findings = ruleResults
    .map((result) => result.finding)
    .filter((finding): finding is NonNullable<typeof finding> => finding !== undefined);

  return {
    tool: "runwise",
    command: "doctor",
    version: options.version ?? RUNWISE_DOCTOR_VERSION,
    scannedPath: context.rootPath,
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    summary: summarizeFindings(findings),
    rules: summarizeRuleResults(ruleResults),
    checks: {
      workspaceDetected:
        context.workspace.hasPackageJson &&
        context.workspace.hasPnpmWorkspace &&
        context.workspace.hasAppsDir &&
        context.workspace.hasPackagesDir,
      packageManagerDetected:
        context.packageManager.pnpm ||
        context.packageManager.npm ||
        context.packageManager.yarn ||
        context.packageManager.bun,
      typescriptDetected:
        context.typescript.hasRootTsconfig || context.typescript.hasBaseTsconfig,
      governanceFilesDetected: context.governance.missing.length === 0,
      aiProjectIndicatorsDetected: context.aiIndicators.present.length > 0,
      mcpIndicatorsDetected:
        context.mcp.configFiles.length > 0 || context.mcp.packageIndicators.length > 0,
      evalsDetected: context.evals.detected,
      tracesDetected: context.tracing.detected
    },
    integrations: context.integrations,
    findings
  };
}

export async function buildProjectContext(cwd: string): Promise<RunwiseProjectContext> {
  const rootPath = path.resolve(cwd);
  const { files, directories } = await collectProjectEntries(rootPath);
  const packageJson = await readJsonFile(rootPath, "package.json");

  const governance = {
    present: GOVERNANCE_FILES.filter((file) => files.includes(file)),
    missing: GOVERNANCE_FILES.filter((file) => !files.includes(file))
  };
  const presentAiIndicators: string[] = [];
  for (const indicator of AI_INDICATORS) {
    if (await pathExists(rootPath, indicator)) {
      presentAiIndicators.push(indicator);
    }
  }
  const aiIndicators = {
    present: presentAiIndicators
  };
  const packageJsonFiles = files.filter((file) => path.basename(file) === "package.json");
  const parsedPackageJsonFiles: RunwisePackageJsonSource[] = [];
  const packageIndicators = [];

  for (const packageJsonFile of packageJsonFiles) {
    const parsed = await readJsonFile(rootPath, packageJsonFile);
    if (parsed) {
      parsedPackageJsonFiles.push({
        file: packageJsonFile,
        data: parsed
      });
    }

    if (parsed && packageJsonContainsMcp(parsed)) {
      packageIndicators.push(packageJsonFile);
    }
  }

  const evalLocations = await getCoverageLocations(rootPath, files, directories, "eval");
  const traceLocations = await getCoverageLocations(rootPath, files, directories, "trace");
  const integrationTextFiles = await getIntegrationTextSources(rootPath, files);
  const detectedIntegrations = detectRunwiseIntegrations({
    files,
    directories,
    packageJsonFiles: parsedPackageJsonFiles,
    textFiles: integrationTextFiles
  });

  return {
    rootPath,
    files,
    directories,
    packageJson,
    packageManager: {
      pnpm: files.includes("pnpm-lock.yaml"),
      npm: files.includes("package-lock.json"),
      yarn: files.includes("yarn.lock"),
      bun: files.includes("bun.lock") || files.includes("bun.lockb")
    },
    workspace: {
      hasPackageJson: files.includes("package.json"),
      hasPnpmWorkspace: files.includes("pnpm-workspace.yaml"),
      hasAppsDir: directories.includes("apps"),
      hasPackagesDir: directories.includes("packages")
    },
    typescript: {
      hasRootTsconfig: files.includes("tsconfig.json"),
      hasBaseTsconfig: files.includes("tsconfig.base.json")
    },
    governance,
    aiIndicators,
    mcp: {
      configFiles: MCP_CONFIG_FILES.filter((file) => files.includes(file)),
      packageIndicators,
      hasApprovalPolicy: POLICY_FILES.some((file) => files.includes(file))
    },
    evals: {
      detected: evalLocations.length > 0,
      locations: evalLocations
    },
    tracing: {
      detected: traceLocations.length > 0,
      locations: traceLocations
    },
    reports: {
      outputDirectoryAvailable: await directoryExists(rootPath, ".runwise")
    },
    integrations: {
      detected: detectedIntegrations
    }
  };
}

async function collectProjectEntries(rootPath: string, maxDepth = 5) {
  const files: string[] = [];
  const directories: string[] = [];

  async function walk(currentDirectory: string, depth: number) {
    if (depth > maxDepth) {
      return;
    }

    let entries;
    try {
      entries = await fs.readdir(currentDirectory, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const absolutePath = path.join(currentDirectory, entry.name);
      const relativePath = normalizeRelativePath(path.relative(rootPath, absolutePath));

      if (entry.isDirectory()) {
        if (IGNORED_SCAN_DIRS.has(entry.name)) {
          continue;
        }

        directories.push(relativePath);
        await walk(absolutePath, depth + 1);
        continue;
      }

      if (entry.isFile()) {
        files.push(relativePath);
      }
    }
  }

  await walk(rootPath, 0);

  return {
    files: files.sort(),
    directories: directories.sort()
  };
}

async function getCoverageLocations(
  rootPath: string,
  files: string[],
  directories: string[],
  keyword: "eval" | "trace"
) {
  const directLocations =
    keyword === "eval"
      ? ["evals", normalizeRelativePath(path.join("tests", "evals"))]
      : ["traces", normalizeRelativePath(path.join(".runwise", "traces"))];
  const directoryMatches = directories.filter(
    (directory) =>
      directLocations.includes(directory) || getBaseName(directory).toLowerCase().includes(keyword)
  );
  const fileMatches = files.filter((file) =>
    getBaseName(file).toLowerCase().includes(keyword)
  );
  const directExistingMatches = (
    await Promise.all(
      directLocations.map(async (location) =>
        (await directoryExists(rootPath, location)) ? location : undefined
      )
    )
  ).filter((location): location is string => location !== undefined);

  return [...new Set([...directExistingMatches, ...directoryMatches, ...fileMatches])].sort();
}

async function pathExists(root: string, relativePath: string) {
  try {
    await fs.stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function directoryExists(root: string, relativePath: string) {
  try {
    const stat = await fs.stat(path.join(root, relativePath));
    return stat.isDirectory();
  } catch {
    return false;
  }
}

async function readJsonFile(root: string, relativePath: string) {
  try {
    const raw = await fs.readFile(path.join(root, relativePath), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isRecord(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

async function getIntegrationTextSources(
  rootPath: string,
  files: string[]
): Promise<RunwiseTextSource[]> {
  const textSources: RunwiseTextSource[] = [];

  for (const file of files) {
    if (!isIntegrationTextCandidate(file)) {
      continue;
    }

    const text = await readTextFile(rootPath, file);
    if (text === undefined) {
      continue;
    }

    textSources.push({
      file,
      text
    });
  }

  return textSources;
}

function isIntegrationTextCandidate(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  const baseName = getBaseName(normalized);
  const lowerBaseName = baseName.toLowerCase();

  return (
    lowerBaseName === "requirements.txt" ||
    lowerBaseName === "pyproject.toml" ||
    lowerBaseName.startsWith("docker-compose") ||
    lowerBaseName.startsWith(".env") ||
    lowerBaseName === "agents.md" ||
    lowerBaseName === "claude.md" ||
    lowerBaseName === ".cursorrules" ||
    lowerBaseName === ".windsurfrules" ||
    lowerBaseName === "mcp.json" ||
    lowerBaseName === ".mcp.json" ||
    lowerBaseName === "mcp.config.json" ||
    (normalized.startsWith("examples/") && lowerBaseName.startsWith("readme")) ||
    (normalized.startsWith("examples/") &&
      normalized.includes("/src/") &&
      [".ts", ".js", ".py", ".json"].some((extension) => lowerBaseName.endsWith(extension)))
  );
}

async function readTextFile(root: string, relativePath: string) {
  try {
    const stat = await fs.stat(path.join(root, relativePath));
    if (!stat.isFile() || stat.size > 200_000) {
      return undefined;
    }

    return await fs.readFile(path.join(root, relativePath), "utf8");
  } catch {
    return undefined;
  }
}

function packageJsonContainsMcp(packageJson: Record<string, unknown>) {
  const searchableValues: string[] = [];

  for (const sectionName of [
    "scripts",
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies"
  ]) {
    const section = packageJson[sectionName];
    if (!isRecord(section)) {
      continue;
    }

    for (const [key, value] of Object.entries(section)) {
      searchableValues.push(key);
      if (typeof value === "string") {
        searchableValues.push(value);
      }
    }
  }

  return searchableValues.some((value) => value.toLowerCase().includes("mcp"));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeRelativePath(relativePath: string) {
  return relativePath.split(path.sep).join("/");
}

function getBaseName(relativePath: string) {
  return relativePath.split("/").at(-1) ?? relativePath;
}
