# Runwise

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise 是一个开源的 AI Agent、MCP Server 和 LLM 应用就绪度检查、追踪、回放与评测工具包。

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

## 核心功能

- 基于规则的本地 Doctor 检查：工作区结构、包管理器状态、TypeScript 配置、治理文件、AI 迹象、MCP 迹象、评测覆盖和追踪覆盖。
- 生成 JSON、Markdown 和静态 HTML 报告，作为可审阅的就绪度证据。
- 为 Doctor rule、finding、scoring 和 report 提供共享 TypeScript schema。
- 为未来的追踪、回放、评测、集成、GitHub Action、Dashboard 和文档工作保留包边界。

## Doctor 规则引擎

Runwise Doctor 运行本地就绪度规则，不需要 API key、网络访问、云服务、登录、计费或数据库。

- Finding 同时包含英文和中文文本。
- Blocking finding 表示应优先修复的 loop 治理问题。
- Non-blocking finding 表示就绪度缺口，但不会阻止本地报告生成。
- 报告包含规则执行计数、评分和简短的优先修复建议。

## 静态 HTML 报告

Runwise 会生成一个可直接在浏览器打开的本地 HTML 报告，可作为项目审计交付物、GitHub Actions artifact，或后续 Dashboard 的设计基础。

## 架构概览

Runwise 是一个 pnpm monorepo，并采用 TypeScript-first 架构。

```text
apps/
  dashboard/                 未来的本地 Dashboard 外壳。
  docs/                      未来的文档应用外壳。
packages/
  cli/                       Runwise 命令行界面。
  core/                      本地扫描、规则引擎和评分逻辑。
  schemas/                   共享 TypeScript schema 契约。
  reporter/                  JSON、Markdown 和 HTML 报告生成。
  integrations/              集成适配器边界。
  github-action/             GitHub Action 包边界。
examples/
  mcp-demo/                  未来的 MCP Server 示例。
  rag-demo/                  未来的 RAG 应用示例。
  browser-agent-demo/        未来的浏览器 Agent 示例。
  enterprise-workflow-demo/  未来的企业工作流示例。
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

## 贡献

Runwise 在 Phase 3 会刻意保持小范围。提交变更前，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)、[PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) 和 [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md)。

## 许可证

Runwise 使用 [MIT License](./LICENSE) 发布。
