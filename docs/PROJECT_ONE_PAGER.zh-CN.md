# Runwise 项目一页纸

## 它是什么

Runwise 帮你在 AI Agent 项目上线前做检查和复盘。

它在本地运行，检查项目设置，生成报告，验证 trace，复盘运行过程，并把失败转成 eval case 文件。

## 前 30 秒怎么理解它

Runwise 适合用在一个 AI Agent demo 已经能跑，但你还不确定它能不能交付或上线的时候。

它帮你检查项目、生成报告、验证 trace、复盘运行过程，并把失败记录转成 eval 用例。

## 当前版本

- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- 状态：public preview prerelease
- 分发方式：仅支持源码安装

## 为什么需要它

AI Agent 项目经常需要在 demo、CI 门禁或早期发布审查前再检查一遍。Runwise 聚焦生成本地、可审阅的文件，而不是依赖 hosted storage、隐藏模型调用或接管 agent runtime。

## 当前能做什么

- 通过 `runwise doctor` 运行本地就绪度检查。
- 生成 JSON、Markdown 和静态 HTML 报告。
- 从生成的 report JSON 启动本地 Dashboard Viewer。
- 验证本地 `runwise.agent_trace` 文件。
- 生成静态 trace replay 报告。
- 将审查过的失败转换为确定性的 eval case 草稿。
- 检测本地生态兼容性信号。

## 当前不做什么

- 不发布 npm package。
- 不上架 GitHub Marketplace。
- 不提供 hosted service、cloud sync、登录、计费或数据库。
- 不做 agent runtime orchestration。
- 不做模型调用、模型评审、评测执行或模型训练。
- 不声明官方生态合作或官方集成。

## 适合谁

- 构建本地 AI Agent 原型的开发者。
- 交付 MCP server、RAG workflow 或 LLM application 的团队。
- 希望在 CI 门禁或公开预览前获得就绪度证据的维护者。
- 希望先用本地检查和报告判断是否需要更重工具链的团队。

## 希望获得的反馈

- 就绪度规则和评分预期。
- trace replay 的可读性。
- Failure-to-Eval 产物结构。
- MCP、RAG、browser agent、OpenAI-compatible API 和国内大模型服务商检测。
- 下一次 preview 前需要补充的文档和示例。
