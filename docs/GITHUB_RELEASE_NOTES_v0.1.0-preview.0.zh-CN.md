# Runwise v0.1.0-preview.0

## 公开预览状态

这是 Runwise 的第一个公开预览版本，适合通过源码方式试用、反馈，并初步评估本地优先的 AgentOps 工作流。

- Release URL: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- 分发方式：仅支持源码安装

## 摘要

Runwise 是一个本地优先的就绪度、追踪回放和评测用例生成工具，面向 AI Agent、MCP server、RAG 系统和 LLM application。本 prerelease 聚焦在 demo、CI 门禁和早期发布审查前生成可审阅的本地证据。

## 已包含

- 本地优先的 Runwise Doctor 就绪度扫描器。
- 基于规则的就绪度引擎和就绪度评分。
- JSON、Markdown 和静态 HTML Doctor 报告。
- 面向生成 report JSON 的本地 Dashboard Viewer。
- Composite GitHub Action 就绪度门禁。
- 本地 `runwise.agent_trace` 验证。
- 静态 trace replay 报告。
- 确定性的 Failure-to-Eval 生成。
- 本地生态兼容性检测。
- 轻量示例和 trace fixtures。
- 英文和简体中文文档。

## 尚未包含

- npm package 发布。
- GitHub Marketplace listing。
- 托管服务、登录、计费、数据库或 cloud sync。
- Agent runtime orchestration。
- 模型调用、模型评审、评测执行或模型训练。
- 官方生态合作或官方集成声明。

## 从源码安装

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
```

## 核心命令

```bash
pnpm check
pnpm check:types
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

## 已知限制

- 这是 prerelease public preview，不是 stable release。
- 当前采用源码分发；npm 发布继续暂缓。
- GitHub Marketplace release 继续暂缓。
- 生成的 `.runwise/` 产物是本地、默认被忽略且可复现的文件。
- GitHub Action 可从本仓库使用；更广泛采用前应单独验证公开版本化用法。
- GitHub Actions 当前会因引用的 actions 报告非阻塞 Node.js 20 deprecation annotation，但 CI 通过。

## 欢迎反馈

特别欢迎针对 AI Agent 就绪度规则、trace replay 可读性、Failure-to-Eval 输出结构、生态兼容性检测和国内大模型服务商信号的反馈。
