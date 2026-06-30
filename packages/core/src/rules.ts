import type { RunwiseRuleDefinition } from "@runwise/schemas";
import type { RunwiseRuleEvaluation } from "./rule-engine.js";
import type { RunwiseProjectContext } from "./scanner.js";

export interface RunwiseRule extends RunwiseRuleDefinition {
  evaluate(context: RunwiseProjectContext): RunwiseRuleEvaluation;
}

const GOVERNANCE_BLOCKING_FILES = new Set([
  "PROJECT_CONSTITUTION.md",
  "CODEX_LOOP_PROTOCOL.md"
]);

export const RUNWISE_RULES: readonly RunwiseRule[] = [
  {
    id: "workspace.package_json_present",
    category: "workspace",
    severity: "medium",
    title: "package.json is missing",
    titleZh: "缺少 package.json",
    description: "Checks whether the project root has a package.json file.",
    descriptionZh: "检查项目根目录是否存在 package.json 文件。",
    message: "package.json is missing from the project root.",
    messageZh: "项目根目录缺少 package.json。",
    recommendation: "Add package.json so Runwise can identify the project and package metadata.",
    recommendationZh: "添加 package.json，让 Runwise 可以识别项目和包元数据。",
    evaluate: (context) => ({
      status: context.workspace.hasPackageJson ? "passed" : "failed",
      file: "package.json"
    })
  },
  {
    id: "workspace.pnpm_workspace_present",
    category: "workspace",
    severity: "medium",
    title: "pnpm workspace file is missing",
    titleZh: "缺少 pnpm 工作区文件",
    description: "Checks whether pnpm-workspace.yaml exists at the project root.",
    descriptionZh: "检查项目根目录是否存在 pnpm-workspace.yaml。",
    message: "pnpm-workspace.yaml is missing from the project root.",
    messageZh: "项目根目录缺少 pnpm-workspace.yaml。",
    recommendation: "Add pnpm-workspace.yaml to make workspace boundaries explicit.",
    recommendationZh: "添加 pnpm-workspace.yaml，以明确工作区边界。",
    evaluate: (context) => ({
      status: context.workspace.hasPnpmWorkspace ? "passed" : "failed",
      file: "pnpm-workspace.yaml"
    })
  },
  {
    id: "workspace.apps_packages_shape",
    category: "workspace",
    severity: "medium",
    title: "apps/ and packages/ workspace shape is incomplete",
    titleZh: "apps/ 和 packages/ 工作区结构不完整",
    description: "Checks for the standard Runwise apps/ and packages/ directories.",
    descriptionZh: "检查标准 Runwise apps/ 和 packages/ 目录。",
    message: "apps/ and packages/ directories are not both present.",
    messageZh: "apps/ 和 packages/ 目录未同时存在。",
    recommendation: "Create apps/ and packages/ to keep app and package surfaces separated.",
    recommendationZh: "创建 apps/ 和 packages/，保持应用与包边界分离。",
    evaluate: (context) => {
      const missing = [
        context.workspace.hasAppsDir ? undefined : "apps/",
        context.workspace.hasPackagesDir ? undefined : "packages/"
      ].filter((item): item is string => item !== undefined);

      return {
        status: missing.length === 0 ? "passed" : "failed",
        message: `Missing workspace directories: ${missing.join(", ")}.`,
        messageZh: `缺少工作区目录：${missing.join(", ")}。`
      };
    }
  },
  {
    id: "package_manager.lockfile_present",
    category: "package-manager",
    severity: "medium",
    title: "Package manager lockfile is missing",
    titleZh: "缺少包管理器锁文件",
    description: "Checks whether a pnpm, npm, Yarn, or Bun lockfile exists.",
    descriptionZh: "检查是否存在 pnpm、npm、Yarn 或 Bun 锁文件。",
    message: "No package manager lockfile was detected.",
    messageZh: "未检测到包管理器锁文件。",
    recommendation: "Commit a lockfile so dependency readiness can be reproduced.",
    recommendationZh: "提交锁文件，让依赖就绪状态可以复现。",
    evaluate: (context) => ({
      status: hasAnyPackageManager(context) ? "passed" : "failed"
    })
  },
  {
    id: "package_manager.pnpm_preferred",
    category: "package-manager",
    severity: "low",
    title: "pnpm preferred package manager is not used",
    titleZh: "未使用首选包管理器 pnpm",
    description: "Checks whether the project uses pnpm as the preferred workspace package manager.",
    descriptionZh: "检查项目是否使用 pnpm 作为首选工作区包管理器。",
    message: "A non-pnpm lockfile was detected without pnpm-lock.yaml.",
    messageZh: "检测到非 pnpm 锁文件，但缺少 pnpm-lock.yaml。",
    recommendation: "Prefer pnpm for Runwise workspaces unless another package manager is intentional.",
    recommendationZh: "除非另有明确意图，Runwise 工作区建议优先使用 pnpm。",
    evaluate: (context) => {
      if (context.packageManager.pnpm) {
        return { status: "passed", file: "pnpm-lock.yaml" };
      }

      if (!hasAnyPackageManager(context)) {
        return { status: "not_applicable" };
      }

      return { status: "failed" };
    }
  },
  {
    id: "typescript.config_present",
    category: "typescript",
    severity: "medium",
    title: "TypeScript configuration is missing",
    titleZh: "缺少 TypeScript 配置",
    description: "Checks whether a root TypeScript configuration exists.",
    descriptionZh: "检查根目录是否存在 TypeScript 配置。",
    message: "No root tsconfig.json or tsconfig.base.json was found.",
    messageZh: "未找到根目录 tsconfig.json 或 tsconfig.base.json。",
    recommendation: "Add a TypeScript config before expanding typed scanner contracts.",
    recommendationZh: "在扩展类型化扫描契约前添加 TypeScript 配置。",
    evaluate: (context) => ({
      status:
        context.typescript.hasRootTsconfig || context.typescript.hasBaseTsconfig
          ? "passed"
          : "failed"
    })
  },
  {
    id: "governance.constitution_present",
    category: "governance",
    severity: "high",
    title: "Project constitution is missing",
    titleZh: "缺少项目宪章",
    description: "Checks whether PROJECT_CONSTITUTION.md exists.",
    descriptionZh: "检查 PROJECT_CONSTITUTION.md 是否存在。",
    message: "PROJECT_CONSTITUTION.md is missing.",
    messageZh: "缺少 PROJECT_CONSTITUTION.md。",
    recommendation: "Restore PROJECT_CONSTITUTION.md before using findings as release evidence.",
    recommendationZh: "在将检查结果作为发布证据前恢复 PROJECT_CONSTITUTION.md。",
    blocking: true,
    evaluate: (context) => ({
      status: context.governance.present.includes("PROJECT_CONSTITUTION.md")
        ? "passed"
        : "failed",
      file: "PROJECT_CONSTITUTION.md"
    })
  },
  {
    id: "governance.codex_loop_protocol_present",
    category: "governance",
    severity: "high",
    title: "Codex loop protocol is missing",
    titleZh: "缺少 Codex Loop 协议",
    description: "Checks whether CODEX_LOOP_PROTOCOL.md exists.",
    descriptionZh: "检查 CODEX_LOOP_PROTOCOL.md 是否存在。",
    message: "CODEX_LOOP_PROTOCOL.md is missing.",
    messageZh: "缺少 CODEX_LOOP_PROTOCOL.md。",
    recommendation: "Restore CODEX_LOOP_PROTOCOL.md before continuing governed loop work.",
    recommendationZh: "在继续治理化 loop 工作前恢复 CODEX_LOOP_PROTOCOL.md。",
    blocking: true,
    evaluate: (context) => ({
      status: context.governance.present.includes("CODEX_LOOP_PROTOCOL.md")
        ? "passed"
        : "failed",
      file: "CODEX_LOOP_PROTOCOL.md"
    })
  },
  {
    id: "governance.core_files_present",
    category: "governance",
    severity: "medium",
    title: "Core governance files are missing",
    titleZh: "缺少核心治理文件",
    description: "Checks whether non-blocking governance files are present.",
    descriptionZh: "检查非阻塞治理文件是否存在。",
    message: "One or more core governance files are missing.",
    messageZh: "一个或多个核心治理文件缺失。",
    recommendation: "Restore missing governance files to preserve project memory and boundaries.",
    recommendationZh: "恢复缺失的治理文件，以保留项目记忆和边界。",
    evaluate: (context) => {
      const missing = context.governance.missing.filter(
        (file) => !GOVERNANCE_BLOCKING_FILES.has(file)
      );

      return {
        status: missing.length === 0 ? "passed" : "failed",
        message: `Missing governance files: ${missing.join(", ")}.`,
        messageZh: `缺少治理文件：${missing.join(", ")}。`
      };
    }
  },
  {
    id: "ai.indicators_detected",
    category: "ai-indicators",
    severity: "low",
    title: "No AI project indicators detected",
    titleZh: "未检测到 AI 项目迹象",
    description: "Checks for common AI project files, folders, prompts, evals, traces, or MCP config.",
    descriptionZh: "检查常见 AI 项目文件、文件夹、prompts、evals、traces 或 MCP 配置。",
    message: "No common AI project indicators were detected.",
    messageZh: "未检测到常见 AI 项目迹象。",
    recommendation:
      "If this is an AI project, add explicit prompts, evals, traces, MCP config, or agent instructions.",
    recommendationZh: "如果这是 AI 项目，请添加明确的 prompts、evals、traces、MCP 配置或 agent 指令。",
    evaluate: (context) => ({
      status: context.aiIndicators.present.length > 0 ? "passed" : "failed"
    })
  },
  {
    id: "mcp.config_detected",
    category: "mcp",
    severity: "info",
    title: "MCP configuration is detected",
    titleZh: "已检测到 MCP 配置",
    description: "Checks whether explicit MCP config or MCP package indicators exist.",
    descriptionZh: "检查是否存在明确 MCP 配置或 MCP 包迹象。",
    message: "No MCP configuration was detected.",
    messageZh: "未检测到 MCP 配置。",
    recommendation: "Add MCP config when this project exposes or consumes MCP tools.",
    recommendationZh: "当项目暴露或消费 MCP 工具时，请添加 MCP 配置。",
    evaluate: (context) => ({
      status: hasMcpIndicators(context) ? "passed" : "not_applicable"
    })
  },
  {
    id: "mcp.approval_policy_present_when_mcp_detected",
    category: "mcp",
    severity: "medium",
    title: "MCP approval policy is missing when MCP is detected",
    titleZh: "检测到 MCP 时缺少审批策略",
    description: "Checks for an approval, security, or policy file when MCP indicators exist.",
    descriptionZh: "在存在 MCP 迹象时检查审批、安全或策略文件。",
    message: "MCP indicators exist, but no approval, security, or policy file was found.",
    messageZh: "存在 MCP 迹象，但未找到审批、安全或策略文件。",
    recommendation: "Document MCP tool approval boundaries in a policy or security file.",
    recommendationZh: "在策略或安全文件中记录 MCP 工具审批边界。",
    evaluate: (context) => {
      if (!hasMcpIndicators(context)) {
        return { status: "not_applicable" };
      }

      return { status: context.mcp.hasApprovalPolicy ? "passed" : "failed" };
    }
  },
  {
    id: "evals.coverage_present",
    category: "evals",
    severity: "medium",
    title: "No eval coverage detected",
    titleZh: "未检测到评测覆盖",
    description: "Checks for evals/, tests/evals/, or obvious eval files.",
    descriptionZh: "检查 evals/、tests/evals/ 或明显的 eval 文件。",
    message: "No evals/, tests/evals/, or obvious eval files were found.",
    messageZh: "未找到 evals/、tests/evals/ 或明显的 eval 文件。",
    recommendation: "Add minimal eval coverage before relying on agent behavior in production paths.",
    recommendationZh: "在依赖生产路径中的 agent 行为之前，添加最小评测覆盖。",
    evaluate: (context) => ({
      status: context.evals.detected ? "passed" : "failed"
    })
  },
  {
    id: "integrations.openai_compatible_api_review",
    category: "integrations",
    severity: "info",
    title: "OpenAI-compatible API usage detected",
    titleZh: "检测到 OpenAI-compatible API 使用迹象",
    description: "Checks for local OpenAI-compatible API configuration indicators.",
    descriptionZh: "检查本地 OpenAI-compatible API 配置信号。",
    message:
      "OpenAI-compatible API usage detected. Verify provider-specific base URLs, rate limits, and data handling assumptions.",
    messageZh:
      "检测到 OpenAI-compatible API 使用迹象。请核对服务商特定 base URL、速率限制和数据处理假设。",
    recommendation:
      "Document provider-specific base URLs, rate limits, data boundaries, and fallback behavior.",
    recommendationZh: "记录服务商特定 base URL、速率限制、数据边界和降级策略。",
    evaluate: (context) => ({
      status: hasIntegration(context, "openai-compatible-api") ? "failed" : "not_applicable"
    })
  },
  {
    id: "integrations.china_ready_llm_review",
    category: "integrations",
    severity: "info",
    title: "China-ready LLM provider indicators detected",
    titleZh: "检测到国内大模型服务商相关信号",
    description: "Checks for local China-ready LLM provider configuration indicators.",
    descriptionZh: "检查本地国内大模型服务商配置信号。",
    message:
      "China-ready LLM provider indicators were detected. Ensure deployment documentation covers base URL, model provider, data boundary, and fallback behavior.",
    messageZh:
      "检测到国内大模型服务商相关信号。建议在部署文档中说明 base URL、模型服务商、数据边界和降级策略。",
    recommendation:
      "Add deployment notes for provider base URLs, model names, data handling, and fallback behavior.",
    recommendationZh: "补充服务商 base URL、模型名称、数据处理和降级策略的部署说明。",
    evaluate: (context) => ({
      status: hasIntegration(context, "china-ready-llm") ? "failed" : "not_applicable"
    })
  },
  {
    id: "tracing.coverage_present",
    category: "tracing",
    severity: "medium",
    title: "No trace coverage detected",
    titleZh: "未检测到追踪覆盖",
    description: "Checks for traces/, .runwise/traces/, or obvious trace files.",
    descriptionZh: "检查 traces/、.runwise/traces/ 或明显的 trace 文件。",
    message: "No traces/, .runwise/traces/, or obvious trace files were found.",
    messageZh: "未找到 traces/、.runwise/traces/ 或明显的 trace 文件。",
    recommendation: "Add trace capture before debugging complex agent or MCP workflows.",
    recommendationZh: "在调试复杂 agent 或 MCP 工作流之前，添加追踪采集。",
    evaluate: (context) => ({
      status: context.tracing.detected ? "passed" : "failed"
    })
  },
  {
    id: "reports.output_directory_available",
    category: "reports",
    severity: "info",
    title: "Runwise output directory is unavailable",
    titleZh: "Runwise 输出目录不可用",
    description: "Checks whether .runwise/ exists for generated local reports.",
    descriptionZh: "检查 .runwise/ 是否存在，可用于生成本地报告。",
    message: ".runwise/ is not available for report output.",
    messageZh: ".runwise/ 不可用于报告输出。",
    recommendation: "Create .runwise/ before writing report artifacts.",
    recommendationZh: "写入报告产物前创建 .runwise/。",
    evaluate: (context) => ({
      status: context.reports.outputDirectoryAvailable ? "passed" : "failed"
    })
  }
];

function hasAnyPackageManager(context: RunwiseProjectContext) {
  return (
    context.packageManager.pnpm ||
    context.packageManager.npm ||
    context.packageManager.yarn ||
    context.packageManager.bun
  );
}

function hasMcpIndicators(context: RunwiseProjectContext) {
  return context.mcp.configFiles.length > 0 || context.mcp.packageIndicators.length > 0;
}

function hasIntegration(context: RunwiseProjectContext, id: string) {
  return context.integrations.detected.some((integration) => integration.id === id);
}
