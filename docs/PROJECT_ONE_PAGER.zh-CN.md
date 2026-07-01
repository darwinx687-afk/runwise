# Runwise 项目一页纸

## 它是什么

Runwise 是一个开源、本地优先的就绪度、追踪回放和评测用例生成工具，面向 AI Agent、MCP server、RAG 系统和 LLM application。

## 当前版本

- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- 状态：public preview prerelease
- 分发方式：仅支持源码安装

## 为什么需要它

AI Agent 项目经常需要在 demo、CI 门禁或早期发布审查前提供证据。Runwise 聚焦生成本地、可审阅的产物，而不是依赖 hosted storage、隐藏模型调用或运行时接管。

## 当前能做什么

- 通过 `runwise doctor` 运行本地就绪度检查。
- 生成 JSON、Markdown 和静态 HTML 报告。
- 从生成的 report JSON 启动本地 Dashboard Viewer。
- 验证本地 `runwise.agent_trace` 文件。
- 生成静态 trace replay 报告。
- 将审查过的失败转换为确定性的 eval case 草稿。
- 检测本地生态兼容性信号。

## 当前不做什么

- 不发布 npm package。
- 不上架 GitHub Marketplace。
- 不提供 hosted service、cloud sync、登录、计费或数据库。
- 不做 agent runtime orchestration。
- 不做模型调用、模型评审、评测执行或模型训练。
- 不声明官方生态合作或官方集成。

## 适合谁

- 构建本地 AI Agent 原型的开发者。
- 交付 MCP server、RAG workflow 或 LLM application 的团队。
- 希望在 CI 门禁或公开预览前获得就绪度证据的维护者。
- 在采用 hosted infrastructure 前评估本地 AgentOps 工作流的团队。

## 希望获得的反馈

- 就绪度规则和评分预期。
- trace replay 的可读性。
- Failure-to-Eval 产物结构。
- MCP、RAG、browser agent、OpenAI-compatible API 和国内大模型服务商检测。
- 下一次 preview 前需要补充的文档和示例。
