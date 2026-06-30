# 生态兼容性

Runwise 会识别常见 AI 项目生态的本地信号：

- MCP
- LangChain
- OpenAI Agents
- Dify
- browser-use
- Claude Code
- Codex
- Cursor
- Windsurf
- Ollama
- OpenAI-compatible API
- 国内大模型服务商

检测过程是本地启发式识别。Runwise 会查看文件名、package 元数据、配置名称、环境变量示例和轻量文档。

Runwise 不会执行这些框架、导入运行时集成、调用模型、调用外部 API，也不会声明任何官方合作关系。
