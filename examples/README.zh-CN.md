# Runwise 示例

这些示例是轻量的兼容性示例和 fixture。它们不是生产 AI 应用，不包含真实依赖，也不应包含密钥。

## 目录

- `mcp-demo`：MCP 检测信号和高风险工具审批文档。
- `rag-demo`：面向 grounded-answer 工作流的 prompt、trace 和 eval 占位文件。
- `browser-agent-demo`：浏览器 Agent 兼容性说明和 browser-use 风格信号。
- `enterprise-workflow-demo`：Dify 风格工作流平台检测信号。
- `china-ready-llm-demo`：OpenAI-compatible API 和国内大模型服务商配置占位。
- `codex-project-demo`：Codex、Claude Code、Cursor 和 Windsurf 风格项目指令信号。
- `traces`：用于验证、回放和 Failure-to-Eval 的本地 `runwise.agent_trace` fixture。

## 安全边界

示例仅用于 Runwise 检测和文档说明。它们不会运行模型、执行工具、调用外部 API 或启动外部框架。
