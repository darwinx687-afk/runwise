# Runwise v0.1.0-preview.0

## 摘要

Runwise `v0.1.0-preview.0` 是 Runwise public preview 的第一个 release candidate 草稿。Runwise 是一个本地优先的就绪度、追踪回放和评测用例生成工具，面向 AI Agent、MCP server、RAG 和 LLM application。

此 release candidate 仅供审查。git tag 和 GitHub Release 尚未创建。

## 已包含

- 本地优先的 Runwise Doctor 就绪度扫描器。
- 基于规则的就绪度引擎。
- JSON、Markdown 和静态 HTML 报告。
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

## 基础命令

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

- 此 release candidate 草稿仍采用源码分发。
- 生成的 `.runwise/` 产物是本地、被忽略且可复现的文件。
- 在 release tag 存在前，GitHub Action 是仓库本地 composite action。
- GitHub Actions 当前会因引用的 actions 报告非阻塞 Node.js 20 deprecation annotation，但 CI 通过。

## 继续暂缓

- npm 发布继续暂缓。
- GitHub Marketplace release 继续暂缓。
- 第一个 preview tag 已准备，但本 loop 不创建。
