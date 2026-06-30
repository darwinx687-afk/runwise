import type { RunwiseIntegrationProfile } from "@runwise/schemas";

export const RUNWISE_INTEGRATION_PROFILES: readonly RunwiseIntegrationProfile[] = [
  {
    id: "mcp",
    name: "MCP",
    nameZh: "MCP",
    description: "Model Context Protocol tooling or server/client configuration.",
    descriptionZh: "Model Context Protocol 工具、server 或 client 配置。",
    signals: [
      "mcp.json",
      ".mcp.json",
      "mcp.config.json",
      "package.json dependency or script containing mcp"
    ],
    recommendedChecks: [
      "Check tool permissions, approval policies, risky tool names, and trace coverage for MCP tool calls."
    ],
    recommendedChecksZh: [
      "检查工具权限、审批策略、高风险工具名称，以及 MCP 工具调用的 trace 覆盖情况。"
    ]
  },
  {
    id: "openai-agents",
    name: "OpenAI Agents",
    nameZh: "OpenAI Agents",
    description: "OpenAI Agents SDK or OpenAI agent workflow indicators.",
    descriptionZh: "OpenAI Agents SDK 或 OpenAI agent 工作流信号。",
    signals: [
      "package.json dependency containing @openai/agents or openai-agents",
      "requirements.txt containing openai-agents",
      "pyproject.toml containing openai-agents"
    ],
    recommendedChecks: [
      "Check trace coverage, tool boundaries, approval gates, and eval cases for agent workflows."
    ],
    recommendedChecksZh: [
      "检查 agent 工作流的 trace 覆盖、工具边界、审批门禁和评测用例。"
    ]
  },
  {
    id: "langchain",
    name: "LangChain",
    nameZh: "LangChain",
    description: "LangChain application or package indicators.",
    descriptionZh: "LangChain 应用或依赖信号。",
    signals: [
      "package.json dependency containing langchain or @langchain/*",
      "requirements.txt containing langchain",
      "pyproject.toml containing langchain"
    ],
    recommendedChecks: [
      "Check chain traces, retrieval grounding, tool boundaries, and regression eval coverage."
    ],
    recommendedChecksZh: [
      "检查 chain trace、检索证据、工具边界和回归评测覆盖。"
    ]
  },
  {
    id: "dify",
    name: "Dify",
    nameZh: "Dify",
    description: "Dify self-hosting, plugin, or workflow configuration indicators.",
    descriptionZh: "Dify 自托管、插件或工作流配置线索。",
    signals: [
      "docker-compose files mentioning dify",
      ".env.example mentioning DIFY",
      "docs mentioning Dify"
    ],
    recommendedChecks: [
      "Check deployment boundaries, workflow traces, plugin configuration, and generated eval artifacts."
    ],
    recommendedChecksZh: [
      "检查部署边界、工作流 trace、插件配置和生成的评测 artifact。"
    ]
  },
  {
    id: "browser-use",
    name: "browser-use",
    nameZh: "browser-use",
    description: "browser-use automation project indicators.",
    descriptionZh: "browser-use 自动化项目信号。",
    signals: [
      "requirements.txt containing browser-use",
      "pyproject.toml containing browser-use",
      "package or documentation mentioning browser-use"
    ],
    recommendedChecks: [
      "Check browser action traces, approval boundaries, replay evidence, and failure-to-eval coverage."
    ],
    recommendedChecksZh: [
      "检查浏览器动作 trace、审批边界、回放证据和失败转评测覆盖。"
    ]
  },
  {
    id: "claude-code",
    name: "Claude Code",
    nameZh: "Claude Code",
    description: "Claude Code project memory or workspace instruction indicators.",
    descriptionZh: "Claude Code 项目记忆或工作区指令信号。",
    signals: ["CLAUDE.md", ".claude/"],
    recommendedChecks: [
      "Check project memory, instruction scope, tool approval assumptions, and generated trace/eval artifacts."
    ],
    recommendedChecksZh: [
      "检查项目记忆、指令作用域、工具审批假设，以及生成的 trace/eval artifact。"
    ]
  },
  {
    id: "codex",
    name: "Codex",
    nameZh: "Codex",
    description: "Codex instruction, loop protocol, or workspace state indicators.",
    descriptionZh: "Codex 指令、loop 协议或工作区状态信号。",
    signals: ["AGENTS.md", ".codex/", "CODEX_LOOP_PROTOCOL.md"],
    recommendedChecks: [
      "Check loop protocol, project constitution, task boundaries, and generated artifacts."
    ],
    recommendedChecksZh: [
      "检查 loop 协议、项目宪章、任务边界和生成的 artifact。"
    ]
  },
  {
    id: "cursor",
    name: "Cursor",
    nameZh: "Cursor",
    description: "Cursor workspace rule or editor-agent configuration indicators.",
    descriptionZh: "Cursor 工作区规则或编辑器 agent 配置信号。",
    signals: [".cursor/", ".cursorrules"],
    recommendedChecks: [
      "Check editor-agent rules, prompt boundaries, trace fixtures, and eval coverage."
    ],
    recommendedChecksZh: [
      "检查编辑器 agent 规则、prompt 边界、trace fixture 和评测覆盖。"
    ]
  },
  {
    id: "windsurf",
    name: "Windsurf",
    nameZh: "Windsurf",
    description: "Windsurf workspace rule or editor-agent configuration indicators.",
    descriptionZh: "Windsurf 工作区规则或编辑器 agent 配置信号。",
    signals: [".windsurf/", ".windsurfrules"],
    recommendedChecks: [
      "Check workspace rules, approval assumptions, local evidence artifacts, and eval coverage."
    ],
    recommendedChecksZh: [
      "检查工作区规则、审批假设、本地证据 artifact 和评测覆盖。"
    ]
  },
  {
    id: "ollama",
    name: "Ollama",
    nameZh: "Ollama",
    description: "Ollama local model runtime configuration indicators.",
    descriptionZh: "Ollama 本地模型运行时配置信号。",
    signals: ["OLLAMA_HOST", "ollama in package scripts, docs, env, or examples"],
    recommendedChecks: [
      "Check local model configuration, fallback behavior, trace metadata, and deployment notes."
    ],
    recommendedChecksZh: [
      "检查本地模型配置、降级行为、trace 元数据和部署说明。"
    ]
  },
  {
    id: "openai-compatible-api",
    name: "OpenAI-compatible API",
    nameZh: "OpenAI-compatible API",
    description: "OpenAI-compatible API usage or base URL configuration indicators.",
    descriptionZh: "OpenAI-compatible API 使用或 base URL 配置信号。",
    signals: [
      "OPENAI_API_KEY",
      "OPENAI_BASE_URL",
      "OPENAI_API_BASE",
      "baseURL",
      "openai-compatible"
    ],
    recommendedChecks: [
      "Verify provider-specific base URLs, rate limits, and data handling assumptions."
    ],
    recommendedChecksZh: [
      "核对服务商特定 base URL、速率限制和数据处理假设。"
    ]
  },
  {
    id: "china-ready-llm",
    name: "China-ready LLM",
    nameZh: "国内大模型适配",
    description: "China-ready LLM provider configuration indicators.",
    descriptionZh: "国内大模型服务商配置线索。",
    signals: [
      "DASHSCOPE_API_KEY",
      "QWEN",
      "DEEPSEEK_API_KEY",
      "ZHIPU",
      "GLM",
      "MOONSHOT_API_KEY",
      "KIMI",
      "MINIMAX",
      "BAICHUAN",
      "SILICONFLOW",
      "OPENAI_BASE_URL with non-OpenAI provider hint"
    ],
    recommendedChecks: [
      "Ensure deployment documentation covers base URL, model provider, data boundary, and fallback behavior."
    ],
    recommendedChecksZh: [
      "建议在部署文档中说明 base URL、模型服务商、数据边界和降级策略。"
    ]
  }
] as const;
