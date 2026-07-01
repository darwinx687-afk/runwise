# 示例 Gallery

Runwise 示例都是很小的本地 fixture。它们帮助你看到 Doctor、trace 验证、静态复盘和 Failure-to-Eval 能识别什么，同时不安装真实 AI framework，也不调用外部 API。

生成结果会写到 `.runwise/`，这个目录会被 git 忽略。

## MCP demo

这个示例展示一个轻量 MCP 风格项目，包含 MCP 配置和 tool approval 说明。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/mcp-demo --output .runwise/examples/mcp-demo
```

Runwise 可以检测：

- MCP 配置信号
- 高风险 tool 文档
- approval policy 线索

重点看：

- 报告是否清楚展示 MCP 使用
- tool-risk finding 是否有用，而不是太吵
- reviewer 是否能看到足够清楚的审批建议

为什么有用：

MCP 项目在给团队 review 前，通常需要把 tool、审批和风险边界讲清楚。

## RAG demo

这个示例代表一个小型 retrieval 风格项目，包含 prompt、trace 和 eval 占位文件。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/rag-demo --output .runwise/examples/rag-demo
```

Runwise 可以检测：

- RAG 项目信号
- trace 和 eval 占位
- grounded-answer workflow 的文档线索

重点看：

- retrieval 相关文件是否被识别
- trace 和 eval 覆盖是否出现在报告里
- finding 是否能让下一步 review 更明确

为什么有用：

RAG 项目在上线前，如果检索证据、trace 记录和 eval case 都能被看见，会更容易 review。

## Browser agent demo

这个示例代表 browser-agent 风格项目线索，但不会运行浏览器自动化框架。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/browser-agent-demo --output .runwise/examples/browser-agent-demo
```

Runwise 可以检测：

- browser agent 兼容性说明
- browser-use 风格 package 信号
- tool-risk 和 review 文档线索

重点看：

- 浏览器自动化风险是否在报告里可见
- 项目是否解释了审批和 review 边界
- reviewer 是否能看出这是 fixture，而不是会真实运行的 browser agent

为什么有用：

Browser agent 可能触碰真实账号、表单和网站，所以在 live run 前需要清楚的本地证据。

## Enterprise workflow demo

这个示例代表 Dify 风格 workflow platform 信号和工作流文档。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/enterprise-workflow-demo --output .runwise/examples/enterprise-workflow-demo
```

Runwise 可以检测：

- workflow platform 线索
- 配置占位
- review 和 handoff 文档信号

重点看：

- workflow 风格文件是否被识别
- 部署或交付假设是否可见
- finding 是否能帮助团队在分享前 review 项目

为什么有用：

Workflow 项目即使 demo 能跑，也常常需要给团队或客户一份清楚的 readiness 说明。

## China-ready LLM demo

这个示例展示 OpenAI-compatible API 和国内大模型服务商配置占位。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/china-ready-llm-demo --output .runwise/examples/china-ready-llm-demo
```

Runwise 可以检测：

- `OPENAI_BASE_URL` 风格配置
- OpenAI-compatible API 线索
- DashScope/Qwen、DeepSeek、Moonshot/Kimi、Zhipu/GLM、Minimax、Baichuan 和 SiliconFlow 等 provider 占位

重点看：

- provider 信号是否清楚出现
- 报告是否提醒补充数据边界和 fallback 文档
- 缺失的部署假设是否容易发现

为什么有用：

很多团队在项目 review 前，需要先说明 global / China-ready 的部署配置、数据边界和降级策略。

## Codex project demo

这个示例代表 coding-agent 项目指令文件和 editor-agent 线索。

试一下：

```bash
pnpm exec runwise doctor --cwd examples/codex-project-demo --output .runwise/examples/codex-project-demo
```

Runwise 可以检测：

- `AGENTS.md` 和 `CLAUDE.md` 风格指令文件
- Cursor 和 Windsurf 规则文件
- 本地 review 和治理信号

重点看：

- coding-agent 指令是否被识别
- 本地 review 期待是否可见
- 报告是否能区分项目指导和 runtime 行为

为什么有用：

Coding-agent 项目在贡献者开始使用前，最好先让指令、边界和本地 review artifact 变得可见。

## Trace fixtures

这些 trace fixture 展示 valid、invalid、risky 和 error-oriented 的 `runwise.agent_trace` 文件。

试一下：

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

Runwise 可以检测：

- trace schema 问题
- MCP/tool 风险信号
- 审批、错误和失败说明
- 从已 review 的失败生成 eval case 字段

重点看：

- validation error 是否好理解
- replay 是否能在不重新运行的情况下解释这次执行
- 生成的 eval case 草稿是否适合 review

为什么有用：

Trace 文件可以把一次运行变成证据：先检查，再复盘，最后沉淀成未来的 eval case。
