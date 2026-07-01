# Runwise 示例

这些示例是用于本地试用 Runwise 的轻量 fixture。它们不是生产 AI 应用，不包含真实依赖，也不应包含密钥。

建议先看 [示例 Gallery](../docs/EXAMPLE_GALLERY.zh-CN.md)，里面说明了每个示例的用途、运行命令和 review 重点。

## 快速列表

- `mcp-demo`：MCP 配置和 tool approval 信号。
- `rag-demo`：retrieval、trace 和 eval 占位。
- `browser-agent-demo`：browser-agent 和 browser-use 风格信号。
- `enterprise-workflow-demo`：Dify 风格 workflow 信号。
- `china-ready-llm-demo`：OpenAI-compatible API 和国内大模型服务商占位。
- `codex-project-demo`：Codex、Claude Code、Cursor 和 Windsurf 风格指令信号。
- `traces`：用于 validation、replay 和 Failure-to-Eval 的本地 trace fixture。

## 安全边界

这些示例只用于检测和文档说明。它们不会运行模型、执行工具、调用外部 API 或启动外部框架。
