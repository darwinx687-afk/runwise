# 对比说明

Runwise 更像是一个本地的上线前检查和复盘层。它帮助你先检查 AI Agent 类项目、生成报告、验证 trace、静态复盘运行过程，并把失败记录转成 eval case，然后再决定是否接入更重的观测或评测平台。

这不是排名。Langfuse、Promptfoo、Dify 和 Open WebUI 解决的问题不同，也可以和 Runwise 一起使用。

## 快速理解

| 工具 | 更适合什么 | Runwise 的区别 |
| --- | --- | --- |
| Runwise | AI Agent 类项目上线前的本地 readiness review。 | 当前从源码运行，检查本地项目证据，生成报告，验证 trace，静态复盘运行过程，并生成 eval case 草稿。 |
| Langfuse | LLM observability、tracing、prompt management、evaluation 和 experiment 工作流。 | Runwise 更靠前、更轻量：在你接入完整观测流程前，先做本地 readiness review。 |
| Promptfoo | LLM eval、red teaming、prompt/model comparison 和 CI eval 工作流。 | Runwise 目前不是 eval runner。它会把 failure trace 转成 eval case 草稿，帮助判断哪些失败值得沉淀成 eval。 |
| Dify / Open WebUI | 构建、运行、管理或自托管 AI app 和模型界面。 | Runwise 不运行 app，不托管 agent，也不提供聊天或模型 UI。它 review 你正在构建的 app 或 agent 周围的本地证据。 |

## Runwise 和 Langfuse

Langfuse 是一个开源 AI engineering 和 observability 平台，用于 LLM 应用的 tracing、debugging、analysis 和 iteration，也支持 prompt management、datasets、evaluations 等工作流。

Runwise 聚焦更小的上线前节点：

- 检查本地项目
- 生成 readiness 报告
- 验证本地 trace 文件
- 静态复盘一次运行
- 把 review 过的失败转成 eval case 草稿

当你还没准备接入完整观测平台，或者想先有一份本地 review artifact 时，可以先用 Runwise。后续也可以和 Langfuse 一起使用。

## Runwise 和 Promptfoo

Promptfoo 是一个开源 CLI 和 library，用于 LLM app 的 evaluation 和 red teaming。它适合结构化 eval、模型比较、prompt 测试和红队检查。

Runwise 不替代这些能力。当前 Runwise 不执行 eval，也不调用模型。

Runwise 适合用来：

- 检查项目是否有基本 readiness 证据
- 验证 trace 文件结构是否正确
- 在不重新运行 agent 的情况下复盘一次执行
- 把值得跟踪的失败整理成 eval case 草稿

当你知道哪些失败或行为应该变成可执行 eval 后，Promptfoo 可能是下一步。

## Runwise 和 Dify / Open WebUI

Dify 是 LLM app development platform，用于 workflow、RAG pipeline、agent、model management 等应用构建流程。

Open WebUI 是 self-hosted AI interface，可以连接本地或云端模型 provider。

Runwise 不是 app builder、workflow builder、模型 UI 或 hosted control plane。它不会运行你的 agent，也不会调用你的模型。

如果你已经有 AI app、agent、MCP server、RAG 项目或 workflow 项目，并想在 review 或 handoff 前做一次本地检查，可以使用 Runwise。

## 什么时候适合用 Runwise

适合使用 Runwise 的情况：

- demo 已经能跑，但分享前需要 review 证据
- 你想生成本地报告，不上传项目数据
- 你需要检查 trace、复盘一次运行，或生成 eval case 草稿
- 你想看 MCP、RAG、browser-agent 或 provider 配置信号
- 你需要一个能在 CI 中作为 readiness gate 的小工具

## 什么时候不适合用 Runwise

不要把 Runwise 当作：

- hosted observability platform
- prompt 或 model eval runner
- workflow builder
- chat interface
- agent runtime
- security review 的替代品
- 当前可从 npm 安装的 package
- plugin runtime，因为插件能力尚未实现

## 参考链接

- [Langfuse documentation](https://langfuse.com/docs)
- [Promptfoo documentation](https://www.promptfoo.dev/docs/intro/)
- [Dify website](https://dify.ai/)
- [Open WebUI documentation](https://docs.openwebui.com/)
