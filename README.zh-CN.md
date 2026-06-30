# Runwise

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise 是一个开源的 AI Agent、MCP Server 和 LLM 应用就绪度检查、追踪、回放与评测工具包。

Runwise 采用本地优先策略。当前质量门禁会检查 workspace 结构、包状态、报告生成，以及可用的 TypeScript 包级检查。

## 快速开始

在项目根目录运行本地 Doctor 扫描：

```bash
pnpm install
pnpm exec runwise doctor
```

Runwise 会写入本地报告：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

交付前验证本地 workspace：

```bash
pnpm check
pnpm check:types
pnpm test
```

## 核心功能

- 基于规则的本地 Doctor 检查：工作区结构、包管理器状态、TypeScript 配置、治理文件、AI 迹象、MCP 迹象、评测覆盖和追踪覆盖。
- 生成 JSON、Markdown 和静态 HTML 报告，作为可审阅的就绪度证据。
- 为 Doctor rule、finding、scoring、report、trace、replay 和 eval case 提供共享 TypeScript schema。
- Failure-to-Eval 生成能力，可把验证过的 trace 转化为可复用的本地评测用例文件。
- 面向常见 AI 项目技术栈的本地生态兼容性检测。
- 为未来的追踪、回放、评测、集成、GitHub Action、Dashboard 和文档工作保留包边界。

## Doctor 规则引擎

Runwise Doctor 运行本地就绪度规则，不需要 API key、网络访问、云服务、登录、计费或数据库。

- Finding 同时包含英文和中文文本。
- Blocking finding 表示应优先修复的 loop 治理问题。
- Non-blocking finding 表示就绪度缺口，但不会阻止本地报告生成。
- 报告包含规则执行计数、评分和简短的优先修复建议。

## 静态 HTML 报告

Runwise 会生成一个可直接在浏览器打开的本地 HTML 报告，可作为项目审计交付物、GitHub Actions artifact，或后续 Dashboard 的设计基础。

## 本地 Dashboard 查看器

运行 `runwise doctor` 后，可以启动本地查看器：

```bash
pnpm exec runwise view
```

查看器只读取本地 `.runwise/runwise-report.json`，不会上传项目数据。

## Trace Schema 与轨迹验证

Runwise 定义了一套轻量的本地运行轨迹格式，用于描述 AI Agent、MCP、RAG 与大语言模型应用的运行过程。你可以先验证 trace 文件，再将其用于后续失败回放、评测生成或可观测性流程。

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

## Trace Replay / 运行轨迹复盘

验证 trace 后，Runwise 可以生成静态复盘报告。Replay 只读取 trace 并解释运行时间线、风险点、审批流程和错误，不会重新运行 Agent，也不会调用模型。

```bash
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
```

## Failure-to-Eval / 失败转评测

Runwise 可以把验证过的 trace 转化为可复用的评测用例，帮助团队将真实失败、高风险工具调用、缺失审批和 RAG 证据问题沉淀为回归测试资产。

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

当前阶段 Runwise 只生成评测用例文件，不执行评测，也不会调用任何模型。

## 生态兼容性

Runwise 会基于本地文件和配置线索识别常见 AI 项目生态，例如 MCP、LangChain、OpenAI Agents、Dify、browser-use、Claude Code、Codex、Cursor、Windsurf、Ollama、OpenAI-compatible API 以及国内大模型服务商。

检测过程是本地启发式识别。Runwise 不会执行这些框架，也不会上传项目数据。

## GitHub Action

Runwise 可以作为 CI 上线准备度门禁使用。它会在 GitHub Actions 中本地运行，生成 JSON/Markdown/HTML 报告，写入 job summary，并可根据 blocking finding、critical finding 或最低分数阈值决定是否让 workflow 失败。

当前仓库本地自检用法：

```yaml
- uses: ./
  with:
    min-score: "70"
    fail-on-blocking: "true"
```

公开发布 tag 之后的未来用法：

```yaml
- uses: runwise-ai/runwise@v0
  with:
    min-score: "70"
    fail-on-blocking: "true"
    fail-on-severity: "critical"
```

## 架构概览

Runwise 是一个 pnpm monorepo，并采用 TypeScript-first 架构。

```text
apps/
  dashboard/                 未来的本地 Dashboard 外壳。
  docs/                      未来的文档应用外壳。
packages/
  cli/                       Runwise 命令行界面。
  core/                      本地扫描、规则引擎、评分、trace、replay 和 eval 生成逻辑。
  schemas/                   共享 TypeScript schema 契约。
  reporter/                  JSON、YAML、Markdown 和 HTML artifact 生成。
  integrations/              本地生态 profile 和检测边界。
  github-action/             GitHub Action summary 和 threshold helper。
examples/
  mcp-demo/                  未来的 MCP Server 示例。
  rag-demo/                  未来的 RAG 应用示例。
  browser-agent-demo/        未来的浏览器 Agent 示例。
  enterprise-workflow-demo/  未来的企业工作流示例。
  china-ready-llm-demo/      本地模型服务商兼容性示例。
  codex-project-demo/        Codex 风格项目兼容性示例。
docs/
  en/                        英文文档。
  zh-CN/                     简体中文文档。
```

## 路线图

- Phase 0：项目基础设施、治理文件、工作区设置和 CLI 占位命令。
- Phase 1：实现第一版本地就绪度检查的 Runwise Doctor CLI。
- Phase 2：基于规则的 Doctor 引擎和评分细化。
- Phase 3：报告系统细化和 HTML 报告。
- Phase 4：完善 Dashboard 和文档。
- Phase 5：GitHub Action 上线准备度检查。
- Phase 6：Trace schema 和验证。
- Phase 7：Trace replay。
- Phase 8：Failure-to-Eval 生成。
- Phase 9：生态集成和兼容性示例。

## 贡献

Runwise 在当前阶段会刻意保持小范围和本地优先。提交变更前，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)、[PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) 和 [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md)。

## 许可证

Runwise 使用 [MIT License](./LICENSE) 发布。
