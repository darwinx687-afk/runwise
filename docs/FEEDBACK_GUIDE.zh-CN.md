# 反馈指南

Runwise 目前处于公开预览阶段。最有价值的反馈通常包含：你运行的命令、期望结果、实际结果，以及安全的最小复现示例。

请不要在公开 issue 中分享密钥、客户隐私数据、专有 trace、私有 API endpoint 或完整内部报告。

## 我们希望收到什么反馈

- `runwise doctor` finding 是否误报或漏报。
- 就绪度规则的 false positive 或 false negative。
- 生态检测请求和缺失的本地检测信号。
- 面向 AI Agent、MCP、RAG 和 LLM application 的 trace schema 是否好用。
- replay 报告是否清晰，是否适合运行后复盘。
- Failure-to-Eval 输出结构是否有实际价值。
- 国内大模型服务商检测覆盖和命名是否合适。
- 英文或简体中文文档缺口。

## Bug 报告

请尽量包含：

- Runwise version 或 commit。
- 执行的命令。
- 预期行为。
- 实际行为。
- OS、Node.js version 和 pnpm version。
- 是否可以分享安全的 `.runwise` 报告片段。
- 项目是否包含 AI、MCP 或 RAG trace。

建议优先使用 Bug Report issue template。

## Doctor 误报 / 漏报

如果 Doctor finding 有噪音或缺失，请包含：

- 可见的 rule 或 finding 名称。
- 已脱敏的报告片段。
- 相关本地文件名或 package 名称。
- 为什么这个 finding 是错误的或缺失的。
- 项目类型：AI Agent、MCP server、RAG workflow、LLM application 或混合技术栈。

## 生态检测请求

如果希望新增或改进某个生态 profile，请包含：

- 生态名称。
- 安全的本地检测信号，例如 package 名称、config 文件名、docs 字符串或环境变量样例名称。
- 推荐的 Runwise 检查。
- 该生态属于全球生态、国内可用生态、两者都有、内部生态还是私有生态。
- 如安全，可提供已脱敏的配置片段。

请不要包含 API key、access token、私有 endpoint 或客户数据。

## Trace Schema 反馈

请告诉我们当前 `runwise.agent_trace` 格式是否覆盖了你需要审查的事件：

- LLM call。
- Tool call。
- MCP tool call。
- RAG retrieval。
- 审批请求和审批响应。
- 错误和 partial run。
- 最终输出。

如果缺少内容，可以用自然语言或已脱敏的最小 JSON 片段描述事件结构。

## Replay 报告反馈

有价值的 replay 反馈包括：

- 时间线是否容易扫读。
- 风险和审批摘要是否清楚。
- 错误和 partial run 上下文是否足够。
- 哪些内容能帮助 reviewer 在不重新运行 agent 的情况下理解运行过程。

## Failure-to-Eval 反馈

有价值的 Failure-to-Eval 反馈包括：

- 生成的 eval case 是否便于审查。
- expected behavior 和 prohibited behavior 是否清楚。
- assertions 是否匹配失败场景。
- JSON、YAML 和 Markdown 输出是否适合你的工作流。

## 国内大模型检测反馈

欢迎反馈 OpenAI-compatible API、Ollama、DashScope/Qwen、DeepSeek、Moonshot/Kimi、Zhipu/GLM、Minimax、Baichuan、SiliconFlow 以及其他 provider pattern 的本地检测信号。

请保持 provider 示例通用且已脱敏。

## 安全敏感反馈

如果反馈涉及安全敏感内容，请不要在公开 issue 中暴露攻击细节或私有数据。请遵循 `SECURITY.md`，只分享协调披露所需的最小安全上下文。
