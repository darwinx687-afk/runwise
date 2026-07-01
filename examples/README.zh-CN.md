# Runwise 示例

这些示例是用于本地试用 Runwise 的轻量兼容性 fixture。它们不是生产 AI 应用，不包含真实依赖，也不应包含密钥。

建议从这里开始：

- [示例 Gallery](../docs/EXAMPLE_GALLERY.zh-CN.md)：每个示例代表什么、运行什么命令、重点看什么。
- [首次运行 Walkthrough](../docs/FIRST_RUN_WALKTHROUGH.zh-CN.md)：完整源码试用流程。
- [Demo Output 示例](../docs/demo-output/README.zh-CN.md)：整理过的报告、复盘、eval 和生态检测示例。

## 示例目录

- `mcp-demo`：MCP 配置和 tool approval 信号。
- `rag-demo`：retrieval、trace 和 eval 占位。
- `browser-agent-demo`：browser-agent 和 browser-use 风格信号。
- `enterprise-workflow-demo`：Dify 风格 workflow 信号。
- `china-ready-llm-demo`：OpenAI-compatible API 和国内大模型服务商占位。
- `codex-project-demo`：Codex、Claude Code、Cursor 和 Windsurf 风格指令信号。
- `traces`：用于 validation、replay 和 Failure-to-Eval 的本地 trace fixture。

## 安全边界

这些示例只用于检测和文档说明。它们不会安装真实 framework 依赖，不会运行模型、执行工具、调用外部 API 或启动外部服务。
