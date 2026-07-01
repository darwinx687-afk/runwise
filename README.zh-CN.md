<p align="center">
  <img src="./assets/runwise-banner.svg" alt="Runwise - AI Agent 上线体检、运行审计、失败复盘与评测生成">
</p>

# Runwise

![License MIT](https://img.shields.io/badge/license-MIT-0f766e)
![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-2563eb)
![pnpm workspace](https://img.shields.io/badge/pnpm-workspace-f59e0b)
![Local-first](https://img.shields.io/badge/local--first-yes-14b8a6)
![Bilingual](https://img.shields.io/badge/docs-English%20%2F%20中文-8b5cf6)
![GitHub Action ready](https://img.shields.io/badge/GitHub%20Action-ready-111827)

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise 是面向 AI Agent、MCP Server、RAG 与大语言模型应用的开源上线体检、运行审计、失败回放与评测生成工具。

它适合希望在 demo、CI 门禁和发布前获得本地、可审阅证据的团队。Runwise 不是 agent framework、聊天机器人平台、hosted SaaS、Dify/OpenWebUI 克隆、Langfuse/Promptfoo 替代品，也不是模型训练框架。

## 为什么需要 Runwise

现代 AI 应用经常在 prompt、工具、MCP server、检索、审批和部署假设之间出问题。Runwise 帮你在不上传项目数据的前提下，把这些风险变成可见证据。

- 使用结构化 Doctor rule 检查本地就绪度。
- 生成 JSON、Markdown 和静态 HTML 报告。
- 在回放或评测生成前验证 `runwise.agent_trace` 文件。
- 为审查生成静态 trace replay 报告。
- 将失败和高风险运行转化为可复用评测用例文件。
- 识别常见 AI 项目技术栈的本地生态信号。

## 快速开始

Runwise 当前从源码运行。

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
pnpm check
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
```

## Runwise 当前能做什么

| 领域 | 当前能力 |
| --- | --- |
| Doctor | 本地就绪度检查：workspace 结构、包管理器状态、TypeScript 配置、治理文件、AI 迹象、MCP 迹象、评测覆盖、trace 覆盖和生态信号。 |
| Reports | 在 `.runwise/` 下生成 JSON、Markdown 和静态 HTML artifact。 |
| Dashboard | 基于 `.runwise/runwise-report.json` 启动本地查看器。 |
| Trace | 本地验证 `runwise.agent_trace` 文件和目录。 |
| Replay | 为验证过的 trace 生成静态 Markdown 复盘报告。 |
| Failure-to-Eval | 从验证过的 trace 确定性生成 JSON/YAML/Markdown 评测用例。 |
| 生态检测 | 本地启发式识别 MCP、LangChain、OpenAI Agents、Dify、browser-use、Claude Code、Codex、Cursor、Windsurf、Ollama、OpenAI-compatible API 和国内大模型服务商。 |

## 核心流程

```text
project source
  -> runwise doctor
  -> local report artifacts
  -> trace validation
  -> static replay
  -> Failure-to-Eval cases
  -> CI / review evidence
```

Runwise 不会调用模型、执行工具、运行 agent、上传 trace、训练模型或要求登录。

## 命令

```bash
pnpm exec runwise doctor
pnpm exec runwise doctor --cwd . --output .runwise
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace validate examples/traces
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

如果目录中包含无效 fixture，目录 trace 验证可能以退出码 `1` 结束。

## 报告

`runwise doctor` 会写入：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

静态 HTML 报告 = doctor 生成的可分享审计交付物。

本地 Dashboard 查看器 = 读取 report JSON 的交互式本地查看器。

生成的 `.runwise/` 文件应保持被忽略状态，并作为可复现的本地输出。

## 本地 Dashboard 查看器

```bash
pnpm exec runwise view
```

查看器只读取本地 `.runwise/runwise-report.json`，不会上传项目数据。

## GitHub Action

当前本地用法：

```yaml
- uses: ./
  with:
    min-score: "70"
    fail-on-blocking: "true"
    fail-on-severity: "critical"
```

公开仓库和 release tag 创建后的未来用法：

```yaml
- uses: <owner>/<repo>@v0
```

当前 preview 不声明 GitHub Marketplace 可用性。

## Trace Schema

Runwise 定义了一套轻量本地 trace 格式，用于 AI Agent、MCP、RAG 和大语言模型应用运行。它记录运行元数据、model/environment 提示，以及 LLM call、tool call、MCP tool call、RAG retrieval、审批、错误和最终输出等有序 step。

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

## Trace Replay / 运行轨迹复盘

Replay 读取验证过的 trace，解释运行时间线、风险点、审批流程和错误，不会重新运行 Agent，也不会调用模型。

```bash
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
```

## Failure-to-Eval / 失败转评测

Runwise 可以把验证过的 trace 转化为可复用评测用例文件，帮助团队将真实失败、高风险工具调用、缺失审批和 RAG 证据问题沉淀为回归测试资产。

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

Runwise 只生成评测用例文件，不执行评测，也不会调用任何模型。

## 生态兼容性

Runwise 会基于本地文件和配置线索识别常见 AI 项目生态，例如 MCP、LangChain、OpenAI Agents、Dify、browser-use、Claude Code、Codex、Cursor、Windsurf、Ollama、OpenAI-compatible API 以及国内大模型服务商。

检测过程是本地启发式识别。Runwise 不会执行这些框架，不会上传项目数据，也不声明与任何生态厂商存在官方合作关系。

## 国内可用 / 全球可用部署提示

Runwise 可以识别 `OPENAI_BASE_URL`、OpenAI-compatible API、Ollama、DashScope/Qwen、DeepSeek、Moonshot/Kimi、Zhipu/GLM、Minimax、Baichuan 和 SiliconFlow 等占位信号。

你可以用这些 finding 来补充部署前文档：provider base URL、模型名称、数据边界、速率限制和降级策略。

## 示例项目

见 [examples/README.zh-CN.md](./examples/README.zh-CN.md)。

- `examples/mcp-demo`
- `examples/rag-demo`
- `examples/browser-agent-demo`
- `examples/enterprise-workflow-demo`
- `examples/china-ready-llm-demo`
- `examples/codex-project-demo`
- `examples/traces`

这些示例是轻量兼容性示例和 fixture，不是生产 AI 应用。

## 架构

```text
apps/
  dashboard/                 本地 report-file Dashboard Viewer。
  docs/                      文档应用外壳。
packages/
  cli/                       Runwise 命令行界面。
  core/                      本地扫描、规则引擎、评分、trace、replay 和 eval 生成逻辑。
  schemas/                   共享 TypeScript schema 契约。
  reporter/                  JSON、YAML、Markdown 和 HTML artifact 生成。
  integrations/              本地生态 profile 和检测边界。
  github-action/             GitHub Action summary 和 threshold helper。
docs/
  en/                        英文 Markdown 文档。
  zh-CN/                     简体中文 Markdown 文档。
```

## 路线图

- Phase 0-2：项目基础、Doctor CLI、规则引擎和评分。
- Phase 3-5：报告、本地 Dashboard 查看器和 GitHub Action 就绪度检查。
- Phase 6-8：Trace 验证、静态回放和 Failure-to-Eval 生成。
- Phase 9：生态兼容性检测和示例。
- Phase 10：开源发布前展示与仓库材料打磨。

见 [ROADMAP.md](./ROADMAP.md)。

## 欢迎反馈

Runwise 目前处于公开预览阶段。我们尤其希望收到这些反馈：

- Doctor 规则是否误报或漏报
- AI 生态检测线索是否准确
- trace schema 是否好用
- replay 复盘报告是否清楚
- Failure-to-Eval 是否有实际价值
- 国内大模型服务商检测是否完整

请不要在公开 issue 中包含密钥、客户隐私数据或专有 trace。

参见 [反馈指南](./docs/FEEDBACK_GUIDE.zh-CN.md)、[早期用户测试指南](./docs/EARLY_USER_TESTING_GUIDE.zh-CN.md) 和 [最终发布文案包](./docs/FINAL_LAUNCH_COPY_PACK.zh-CN.md)。

## 贡献

提交变更前，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)、[PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) 和 [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md)。

## 安全

Runwise 采用本地优先设计，运行时代码避免隐藏网络调用。报告安全问题前请阅读 [SECURITY.md](./SECURITY.md)。

## 许可证

Runwise 使用 [MIT License](./LICENSE) 发布。
