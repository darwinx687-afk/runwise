# Runwise 发布说明草稿

Runwise 是一个本地优先的开源工具，用于 AI Agent 项目上线体检、报告生成、运行轨迹验证、静态复盘和失败转评测。

这个 initial open-source preview 面向正在构建 AI Agent、MCP Server、RAG 系统和大语言模型应用的开发者与团队，帮助他们在 demo、CI 门禁或发布前获得可审阅的本地证据。

## 当前可用能力

- 使用 `runwise doctor` 运行本地就绪度检查。
- 生成 JSON、Markdown 和静态 HTML 报告。
- 从生成的 report JSON 启动本地 Dashboard 查看器。
- 验证本地 `runwise.agent_trace` 文件。
- 生成静态 trace replay 报告。
- 从验证过的 trace 生成可复用评测用例文件。
- 识别 MCP、LangChain、OpenAI Agents、Dify、browser-use、Codex、Cursor、Windsurf、Ollama、OpenAI-compatible API 和国内大模型服务商等生态的本地兼容性信号。

## Runwise 不是什么

Runwise 不是 agent framework、聊天机器人平台、hosted SaaS、Dify/OpenWebUI 克隆、Langfuse/Promptfoo 替代品，也不是模型训练框架。

## 当前分发方式

Runwise 当前从源码运行。npm 发布、Marketplace listing、release tag 和公开 package 名称应在仓库设置和元数据审查之后再确定。
