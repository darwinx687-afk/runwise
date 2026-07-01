# 生态检测示例

这是整理过的示例，不是生成的 `.runwise/` artifact。

## 检测到的 Profile

| Profile | Confidence | 本地线索 |
| --- | --- | --- |
| MCP | confirmed | `mcp.json`、MCP tool 文档 |
| Codex | confirmed | `AGENTS.md`、项目指令 |
| OpenAI-compatible API | likely | `OPENAI_BASE_URL` 占位 |
| China-ready LLM | likely | DashScope/Qwen、DeepSeek、Moonshot/Kimi 占位 |

## 建议

1. 记录 provider base URL 和模型名称。
2. 说明每个 provider 的数据边界。
3. 补充 provider 不可用或限流时的 fallback 行为。
4. 让 ecosystem 示例尽量贴近真实项目结构。

## 如果没有检测出来

- 在 README 中加一小段说明当前技术栈。
- 用安全的 `.env.example` 占位，不要写真实密钥。
- 把配置文件放在容易识别的位置。
- 添加能体现该技术栈的 trace fixture。

## 为什么重要

生态检测能帮助 reviewer 在逐个读文件之前，先理解这是哪类 AI 项目。
