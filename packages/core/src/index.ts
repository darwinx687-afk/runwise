import { promises as fs } from "node:fs";
import * as path from "node:path";
import type {
  RunwiseDoctorReport,
  RunwiseFinding,
  RunwiseSeverity
} from "@runwise/schemas";

export const RUNWISE_PROJECT_NAME = "Runwise";
export const RUNWISE_CURRENT_PHASE = "Phase 1";
export const RUNWISE_DOCTOR_VERSION = "0.0.0";

export type RunwiseFoundationStatus = "foundation-only";

export interface RunwiseDoctorScanOptions {
  cwd?: string;
  version?: string;
  generatedAt?: string;
}

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

const CRITICAL_GOVERNANCE_FILES = new Set([
  "PROJECT_CONSTITUTION.md",
  "CODEX_LOOP_PROTOCOL.md"
]);

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
  ".runwise",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

const SEVERITY_DEDUCTIONS: Record<RunwiseSeverity, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 3,
  info: 0
};

export async function scanRunwiseDoctor(
  options: RunwiseDoctorScanOptions = {}
): Promise<RunwiseDoctorReport> {
  const scannedPath = path.resolve(options.cwd ?? process.cwd());
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const findings: RunwiseFinding[] = [];

  const packageJsonExists = await fileExists(scannedPath, "package.json");
  const pnpmWorkspaceExists = await fileExists(scannedPath, "pnpm-workspace.yaml");
  const appsDirExists = await directoryExists(scannedPath, "apps");
  const packagesDirExists = await directoryExists(scannedPath, "packages");
  const workspaceDetected =
    packageJsonExists && pnpmWorkspaceExists && appsDirExists && packagesDirExists;

  if (workspaceDetected) {
    findings.push({
      id: "workspace.detected",
      title: "Workspace detected",
      titleZh: "已检测到工作区",
      severity: "info",
      category: "workspace",
      message: "package.json, pnpm-workspace.yaml, apps/, and packages/ were found.",
      messageZh: "已找到 package.json、pnpm-workspace.yaml、apps/ 和 packages/。",
      recommendation: "Keep workspace boundaries explicit as packages and examples grow.",
      recommendationZh: "随着 packages 和 examples 增长，继续保持清晰的工作区边界。"
    });
  } else {
    const missing = listMissing([
      ["package.json", packageJsonExists],
      ["pnpm-workspace.yaml", pnpmWorkspaceExists],
      ["apps/", appsDirExists],
      ["packages/", packagesDirExists]
    ]);

    findings.push({
      id: "workspace.incomplete",
      title: "Workspace shape is incomplete",
      titleZh: "工作区结构不完整",
      severity: "medium",
      category: "workspace",
      message: `Missing workspace items: ${missing.join(", ")}.`,
      messageZh: `缺少工作区项目：${missing.join(", ")}。`,
      recommendation:
        "Add the missing workspace files or folders so local tooling can reason about the project.",
      recommendationZh: "补齐缺失的工作区文件或文件夹，方便本地工具识别项目结构。"
    });
  }

  const pnpmLockExists = await fileExists(scannedPath, "pnpm-lock.yaml");
  const packageLockExists = await fileExists(scannedPath, "package-lock.json");
  const yarnLockExists = await fileExists(scannedPath, "yarn.lock");
  const otherLockfiles = [
    packageLockExists ? "package-lock.json" : undefined,
    yarnLockExists ? "yarn.lock" : undefined
  ].filter((item): item is string => item !== undefined);
  const packageManagerDetected =
    pnpmLockExists || packageLockExists || yarnLockExists;

  if (pnpmLockExists) {
    findings.push({
      id: "package-manager.pnpm",
      title: "pnpm lockfile detected",
      titleZh: "已检测到 pnpm 锁文件",
      severity: "info",
      category: "package-manager",
      message: "pnpm-lock.yaml is present.",
      messageZh: "已找到 pnpm-lock.yaml。",
      recommendation: "Continue using pnpm as the primary workspace package manager.",
      recommendationZh: "继续使用 pnpm 作为主要工作区包管理器。",
      file: "pnpm-lock.yaml"
    });
  }

  if (otherLockfiles.length > 0) {
    findings.push({
      id: "package-manager.other-lockfile",
      title: "Additional package manager lockfile detected",
      titleZh: "已检测到其他包管理器锁文件",
      severity: "low",
      category: "package-manager",
      message: `Additional lockfile detected: ${otherLockfiles.join(", ")}.`,
      messageZh: `检测到其他锁文件：${otherLockfiles.join(", ")}。`,
      recommendation:
        "Keep one package manager as the source of truth unless the mixed setup is intentional.",
      recommendationZh: "除非混合设置是有意为之，否则保持一个包管理器作为事实来源。"
    });
  }

  if (!packageManagerDetected) {
    findings.push({
      id: "package-manager.missing-lockfile",
      title: "No package manager lockfile detected",
      titleZh: "未检测到包管理器锁文件",
      severity: "medium",
      category: "package-manager",
      message: "No pnpm-lock.yaml, package-lock.json, or yarn.lock file was found.",
      messageZh: "未找到 pnpm-lock.yaml、package-lock.json 或 yarn.lock。",
      recommendation: "Add a lockfile so readiness checks can validate dependency state.",
      recommendationZh: "添加锁文件，让就绪度检查可以验证依赖状态。"
    });
  }

  const rootTsconfigExists =
    (await fileExists(scannedPath, "tsconfig.base.json")) ||
    (await fileExists(scannedPath, "tsconfig.json"));
  const packageTsconfigs = await findFilesByName(scannedPath, "tsconfig.json", 4);
  const typescriptDetected = rootTsconfigExists || packageTsconfigs.length > 0;

  if (typescriptDetected) {
    findings.push({
      id: "typescript.detected",
      title: "TypeScript configuration detected",
      titleZh: "已检测到 TypeScript 配置",
      severity: "info",
      category: "typescript",
      message: `Found TypeScript configuration at root or in ${packageTsconfigs.length} package folder(s).`,
      messageZh: `已在根目录或 ${packageTsconfigs.length} 个包目录中找到 TypeScript 配置。`,
      recommendation: "Keep shared compiler settings aligned across workspace packages.",
      recommendationZh: "保持工作区包之间的共享编译配置一致。"
    });
  } else {
    findings.push({
      id: "typescript.missing",
      title: "TypeScript configuration missing",
      titleZh: "缺少 TypeScript 配置",
      severity: "medium",
      category: "typescript",
      message: "No tsconfig.base.json, tsconfig.json, or package-level tsconfig was found.",
      messageZh: "未找到 tsconfig.base.json、tsconfig.json 或包级 tsconfig。",
      recommendation: "Add a TypeScript config before expanding typed scanner contracts.",
      recommendationZh: "在扩展类型化扫描契约之前添加 TypeScript 配置。"
    });
  }

  const missingGovernanceFiles = [];
  for (const file of GOVERNANCE_FILES) {
    if (!(await fileExists(scannedPath, file))) {
      missingGovernanceFiles.push(file);
    }
  }
  const governanceFilesDetected = missingGovernanceFiles.length === 0;

  if (governanceFilesDetected) {
    findings.push({
      id: "governance.complete",
      title: "Core governance files detected",
      titleZh: "已检测到核心治理文件",
      severity: "info",
      category: "governance",
      message: "All required Runwise governance files are present.",
      messageZh: "所有必需的 Runwise 治理文件均已存在。",
      recommendation: "Keep RUN_STATE.md current at the end of each loop.",
      recommendationZh: "在每个 loop 结束时保持 RUN_STATE.md 为最新状态。"
    });
  } else {
    const missingCritical = missingGovernanceFiles.filter((file) =>
      CRITICAL_GOVERNANCE_FILES.has(file)
    );
    const missingOther = missingGovernanceFiles.filter(
      (file) => !CRITICAL_GOVERNANCE_FILES.has(file)
    );

    if (missingCritical.length > 0) {
      findings.push({
        id: "governance.critical-files-missing",
        title: "Critical governance files missing",
        titleZh: "缺少关键治理文件",
        severity: "high",
        category: "governance",
        message: `Missing critical governance files: ${missingCritical.join(", ")}.`,
        messageZh: `缺少关键治理文件：${missingCritical.join(", ")}。`,
        recommendation: "Restore these files before using Runwise findings as release evidence.",
        recommendationZh: "在将 Runwise 结果作为发布证据前，请恢复这些文件。"
      });
    }

    if (missingOther.length > 0) {
      findings.push({
        id: "governance.files-missing",
        title: "Governance files missing",
        titleZh: "缺少治理文件",
        severity: "medium",
        category: "governance",
        message: `Missing governance files: ${missingOther.join(", ")}.`,
        messageZh: `缺少治理文件：${missingOther.join(", ")}。`,
        recommendation: "Add the missing governance files to preserve project memory and boundaries.",
        recommendationZh: "补充缺失的治理文件，以保留项目记忆和边界。"
      });
    }
  }

  const detectedAiIndicators = [];
  for (const indicator of AI_INDICATORS) {
    if (await pathExists(scannedPath, indicator)) {
      detectedAiIndicators.push(indicator);
    }
  }
  const aiProjectIndicatorsDetected = detectedAiIndicators.length > 0;

  if (aiProjectIndicatorsDetected) {
    findings.push({
      id: "ai-indicators.detected",
      title: "AI project indicators detected",
      titleZh: "已检测到 AI 项目迹象",
      severity: "info",
      category: "ai-indicators",
      message: `Detected AI project indicator(s): ${detectedAiIndicators.join(", ")}.`,
      messageZh: `检测到 AI 项目迹象：${detectedAiIndicators.join(", ")}。`,
      recommendation: "Document the intended AI workflow so future checks can be more precise.",
      recommendationZh: "记录预期的 AI 工作流，以便未来检查更加精准。"
    });
  } else {
    findings.push({
      id: "ai-indicators.missing",
      title: "No AI project indicators detected",
      titleZh: "未检测到 AI 项目迹象",
      severity: "low",
      category: "ai-indicators",
      message: "No common AI project files or folders were found.",
      messageZh: "未找到常见的 AI 项目文件或文件夹。",
      recommendation:
        "If this is an AI project, add explicit prompts, evals, traces, MCP config, or agent instructions.",
      recommendationZh: "如果这是 AI 项目，请添加明确的 prompts、evals、traces、MCP 配置或 agent 指令。"
    });
  }

  const detectedMcpConfigs = [];
  for (const configFile of MCP_CONFIG_FILES) {
    if (await fileExists(scannedPath, configFile)) {
      detectedMcpConfigs.push(configFile);
    }
  }

  const packageJsonFiles = await findFilesByName(scannedPath, "package.json", 4);
  const packageJsonMcpIndicators = [];
  for (const packageJsonFile of packageJsonFiles) {
    const parsed = await readJsonFile(scannedPath, packageJsonFile);
    if (parsed && packageJsonContainsMcp(parsed)) {
      packageJsonMcpIndicators.push(packageJsonFile);
    }
  }

  const mcpIndicatorsDetected =
    detectedMcpConfigs.length > 0 || packageJsonMcpIndicators.length > 0;

  if (mcpIndicatorsDetected) {
    const detected = [...detectedMcpConfigs, ...packageJsonMcpIndicators];
    findings.push({
      id: "mcp.detected",
      title: "MCP indicators detected",
      titleZh: "已检测到 MCP 迹象",
      severity: "info",
      category: "mcp",
      message: `Detected MCP indicator(s): ${detected.join(", ")}.`,
      messageZh: `检测到 MCP 迹象：${detected.join(", ")}。`,
      recommendation: "Keep MCP server permissions and tool policies explicit.",
      recommendationZh: "保持 MCP Server 权限和工具策略清晰明确。"
    });
  }

  if (detectedMcpConfigs.length > 0) {
    const policyFilesDetected = await anyFileExists(scannedPath, POLICY_FILES);
    if (!policyFilesDetected) {
      findings.push({
        id: "mcp.policy-missing",
        title: "MCP config found without an apparent policy file",
        titleZh: "发现 MCP 配置但未发现明显策略文件",
        severity: "medium",
        category: "mcp",
        message:
          "An MCP config file exists, but no obvious approval, security, or policy file was found.",
        messageZh: "存在 MCP 配置文件，但未找到明显的审批、安全或策略文件。",
        recommendation: "Add an MCP policy or security file that documents tool approval boundaries.",
        recommendationZh: "添加 MCP 策略或安全文件，记录工具审批边界。"
      });
    }
  }

  const evalDirectoriesDetected =
    (await directoryExists(scannedPath, "evals")) ||
    (await directoryExists(scannedPath, path.join("tests", "evals")));
  const evalFiles = await findFilesMatchingName(scannedPath, /eval/i, 4);
  const evalsDetected = evalDirectoriesDetected || evalFiles.length > 0;

  if (evalsDetected) {
    findings.push({
      id: "evals.detected",
      title: "Eval coverage indicators detected",
      titleZh: "已检测到评测覆盖迹象",
      severity: "info",
      category: "evals",
      message: "Eval folders or files were found in obvious project locations.",
      messageZh: "已在明显的项目位置找到评测文件夹或文件。",
      recommendation: "Keep eval fixtures stable and runnable from local checks.",
      recommendationZh: "保持评测 fixtures 稳定，并可通过本地检查运行。"
    });
  } else {
    findings.push({
      id: "evals.missing",
      title: "No eval coverage detected",
      titleZh: "未检测到评测覆盖",
      severity: "medium",
      category: "evals",
      message: "No evals/, tests/evals/, or obvious eval files were found.",
      messageZh: "未找到 evals/、tests/evals/ 或明显的 eval 文件。",
      recommendation: "Add minimal eval coverage before relying on agent behavior in production paths.",
      recommendationZh: "在依赖生产路径中的 agent 行为之前，添加最小评测覆盖。"
    });
  }

  const traceDirectoriesDetected =
    (await directoryExists(scannedPath, "traces")) ||
    (await directoryExists(scannedPath, path.join(".runwise", "traces")));
  const traceFiles = await findFilesMatchingName(scannedPath, /trace/i, 4);
  const tracesDetected = traceDirectoriesDetected || traceFiles.length > 0;

  if (tracesDetected) {
    findings.push({
      id: "tracing.detected",
      title: "Trace coverage indicators detected",
      titleZh: "已检测到追踪覆盖迹象",
      severity: "info",
      category: "tracing",
      message: "Trace folders or files were found in obvious project locations.",
      messageZh: "已在明显的项目位置找到追踪文件夹或文件。",
      recommendation: "Keep traces scrubbed, reproducible, and safe for review.",
      recommendationZh: "保持追踪记录经过脱敏、可复现，并适合审阅。"
    });
  } else {
    findings.push({
      id: "tracing.missing",
      title: "No trace coverage detected",
      titleZh: "未检测到追踪覆盖",
      severity: "medium",
      category: "tracing",
      message: "No traces/, .runwise/traces/, or obvious trace files were found.",
      messageZh: "未找到 traces/、.runwise/traces/ 或明显的 trace 文件。",
      recommendation: "Add trace capture before debugging complex agent or MCP workflows.",
      recommendationZh: "在调试复杂 agent 或 MCP 工作流之前，添加追踪采集。"
    });
  }

  if (await directoryExists(scannedPath, ".runwise")) {
    findings.push({
      id: "reports.output-directory-ready",
      title: "Runwise report output directory is ready",
      titleZh: "Runwise 报告输出目录已就绪",
      severity: "info",
      category: "reports",
      message: ".runwise/ exists for local report output.",
      messageZh: ".runwise/ 已存在，可用于本地报告输出。",
      recommendation: "Keep generated reports local unless intentionally publishing them.",
      recommendationZh: "除非有意发布，否则将生成的报告保留在本地。"
    });
  }

  const summary = summarizeFindings(findings);

  return {
    tool: "runwise",
    command: "doctor",
    version: options.version ?? RUNWISE_DOCTOR_VERSION,
    scannedPath,
    generatedAt,
    summary,
    checks: {
      workspaceDetected,
      packageManagerDetected,
      typescriptDetected,
      governanceFilesDetected,
      aiProjectIndicatorsDetected,
      mcpIndicatorsDetected,
      evalsDetected,
      tracesDetected
    },
    findings
  };
}

export function summarizeFindings(findings: RunwiseFinding[]): RunwiseDoctorReport["summary"] {
  const summary = {
    overallScore: calculateOverallScore(findings),
    totalFindings: findings.length,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0
  };

  for (const finding of findings) {
    summary[finding.severity] += 1;
  }

  return summary;
}

export function calculateOverallScore(findings: RunwiseFinding[]) {
  const score = findings.reduce(
    (currentScore, finding) => currentScore - SEVERITY_DEDUCTIONS[finding.severity],
    100
  );

  return Math.max(0, Math.min(100, score));
}

async function pathExists(root: string, relativePath: string) {
  try {
    await fs.stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function fileExists(root: string, relativePath: string) {
  try {
    const stat = await fs.stat(path.join(root, relativePath));
    return stat.isFile();
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

async function anyFileExists(root: string, files: readonly string[]) {
  for (const file of files) {
    if (await fileExists(root, file)) {
      return true;
    }
  }

  return false;
}

async function findFilesByName(root: string, fileName: string, maxDepth: number) {
  return findFilesMatchingName(root, new RegExp(`^${escapeRegExp(fileName)}$`), maxDepth);
}

async function findFilesMatchingName(root: string, pattern: RegExp, maxDepth: number) {
  const results: string[] = [];

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
      const relativePath = path.relative(root, absolutePath);

      if (entry.isDirectory()) {
        if (!IGNORED_SCAN_DIRS.has(entry.name)) {
          await walk(absolutePath, depth + 1);
        }
        continue;
      }

      if (entry.isFile() && pattern.test(entry.name)) {
        results.push(relativePath);
      }
    }
  }

  await walk(root, 0);
  return results.sort();
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

function listMissing(items: Array<[string, boolean]>) {
  return items.filter(([, exists]) => !exists).map(([name]) => name);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
