# 示例 Gallery

Runwise 示例都是很小的本地 fixture。它们帮助你看到 Doctor、trace 验证、静态复盘、Failure-to-Eval 和生态检测能识别什么，同时不安装真实 AI framework，也不调用外部 API。

生成结果会写到 `.runwise/`，这个目录会被 git 忽略。下面链接的 sample 是整理过的文档，不是生成的 `.runwise` artifact。

![示例 Gallery 总览](../assets/examples/example-gallery-overview.svg)

## MCP demo

![MCP demo](../assets/examples/mcp-demo-card.svg)

这个示例代表一个轻量 MCP 风格项目，包含 MCP 配置和 tool approval 说明。

Runwise 可以检测：

- MCP 配置检测
- tool-risk 线索
- approval-policy 建议
- trace 覆盖缺口

试一下：

```bash
pnpm exec runwise doctor --cwd examples/mcp-demo --output .runwise/examples/mcp-demo
```

重点看：

- 报告里是否清楚展示 MCP 使用
- 高风险 tool finding 是否好理解
- 审批建议是否足够清楚，方便 reviewer 判断

相关示例：

- [Doctor 报告示例](./demo-output/doctor-report-sample.zh-CN.md)

为什么重要：

MCP 项目可能暴露能力很强的工具。Runwise 帮 reviewer 在项目分享或上线前看到工具风险和审批策略缺口。

## RAG demo

![RAG demo](../assets/examples/rag-demo-card.svg)

这个示例代表一个 retrieval 风格项目，包含 prompt、trace 和 eval 占位文件。

Runwise 可以检测：

- RAG 项目信号
- source / evidence 文档线索
- eval 覆盖占位
- report 输出路径

试一下：

```bash
pnpm exec runwise doctor --cwd examples/rag-demo --output .runwise/examples/rag-demo
```

重点看：

- retrieval 相关文件是否被识别
- trace 和 eval 覆盖是否出现在报告里
- finding 是否能让下一步 review 更明确

相关示例：

- [Doctor 报告示例](./demo-output/doctor-report-sample.zh-CN.md)

为什么重要：

RAG 项目在上线前，如果 source evidence、trace 记录和 eval 覆盖都能被看见，会更容易 review。

## Browser agent demo

这个示例代表 browser-agent 风格项目线索，但不会运行浏览器自动化框架。

相关视觉卡片：

- [生态检测卡片](../assets/examples/ecosystem-detection-card.svg)

Runwise 可以检测：

- browser-agent 兼容性说明
- browser-use 风格 package 信号
- tool-risk 和 review 文档线索

试一下：

```bash
pnpm exec runwise doctor --cwd examples/browser-agent-demo --output .runwise/examples/browser-agent-demo
```

重点看：

- 浏览器自动化风险是否在报告里可见
- 审批和 review 边界是否写清楚
- reviewer 是否能看出这是 fixture，而不是会真实运行的 browser agent

相关示例：

- [Doctor 报告示例](./demo-output/doctor-report-sample.zh-CN.md)

为什么重要：

Browser agent 可能触碰真实账号、表单和网站。在 live run 前，reviewer 需要清楚的本地证据。

## Enterprise workflow demo

这个示例代表 Dify 风格 workflow platform 信号和工作流文档。

相关视觉卡片：

- [生态检测卡片](../assets/examples/ecosystem-detection-card.svg)

Runwise 可以检测：

- workflow platform 线索
- 配置占位
- review 和 handoff 文档信号

试一下：

```bash
pnpm exec runwise doctor --cwd examples/enterprise-workflow-demo --output .runwise/examples/enterprise-workflow-demo
```

重点看：

- workflow 风格文件是否被识别
- 部署或交付假设是否可见
- finding 是否能帮助团队在分享前 review 项目

相关示例：

- [生态检测示例](./demo-output/ecosystem-detection-sample.zh-CN.md)

为什么重要：

Workflow 项目即使 demo 能跑，也常常需要给团队或客户一份清楚的 readiness 说明。

## China-ready LLM demo

![生态检测](../assets/examples/ecosystem-detection-card.svg)

这个示例展示 OpenAI-compatible API 和国内大模型服务商配置占位。

Runwise 可以检测：

- `OPENAI_BASE_URL` 风格配置
- OpenAI-compatible API 线索
- DashScope/Qwen、DeepSeek、Moonshot/Kimi、Zhipu/GLM、Minimax、Baichuan 和 SiliconFlow 等国内大模型服务商占位

试一下：

```bash
pnpm exec runwise doctor --cwd examples/china-ready-llm-demo --output .runwise/examples/china-ready-llm-demo
```

重点看：

- provider 信号是否清楚出现
- 是否提醒补充数据边界和 fallback 文档
- 缺失的部署假设是否容易发现

相关示例：

- [生态检测示例](./demo-output/ecosystem-detection-sample.zh-CN.md)

为什么重要：

很多团队在项目 review 前，需要先说明 global / China-ready 的部署配置、数据边界和降级策略。

## Codex project demo

这个示例代表 coding-agent 项目指令文件和 editor-agent 线索。

相关视觉卡片：

- [生态检测卡片](../assets/examples/ecosystem-detection-card.svg)

Runwise 可以检测：

- `AGENTS.md` 和 `CLAUDE.md` 风格指令文件
- Cursor 和 Windsurf 规则文件
- 本地 review 和治理信号

试一下：

```bash
pnpm exec runwise doctor --cwd examples/codex-project-demo --output .runwise/examples/codex-project-demo
```

重点看：

- coding-agent 指令是否被识别
- 本地 review 期待是否可见
- 报告是否能区分项目指导和 runtime 行为

相关示例：

- [生态检测示例](./demo-output/ecosystem-detection-sample.zh-CN.md)

为什么重要：

Coding-agent 项目在贡献者开始使用前，最好先让指令、边界和本地 review artifact 变得可见。

## Trace fixtures

![Trace replay](../assets/examples/trace-replay-card.svg)

这些 trace fixture 展示 valid、invalid、risky 和 error-oriented 的 `runwise.agent_trace` 文件。

Runwise 可以检测：

- trace schema 问题
- MCP/tool 风险信号
- 审批、错误和失败说明
- 从已 review 的失败生成 eval case 字段

试一下：

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

重点看：

- validation message 是否好理解
- replay 是否能在不重新运行的情况下解释这次执行
- 生成的 eval case 草稿是否适合 review

相关示例：

- [Trace Replay 示例](./demo-output/trace-replay-sample.zh-CN.md)
- [Failure-to-Eval 示例](./demo-output/failure-to-eval-sample.zh-CN.md)

为什么重要：

Trace 文件可以把一次运行变成证据：先检查，再复盘，最后沉淀成未来的 eval case。

![Failure-to-Eval](../assets/examples/failure-to-eval-card.svg)
