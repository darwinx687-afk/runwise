# 报告阅读指南

第一次打开 Runwise Doctor 报告时，可以按这个顺序看。

## 1. 先看分数

分数给你一个快速的就绪度信号。它不是全部结论，但可以帮助你判断需要多认真地 review。

## 2. 先处理 blocking、critical 和 high

先看 blocking、critical 和 high finding。这些问题通常和治理文件缺失、高风险工具调用或上线前必须补齐的缺口有关。

## 3. 看 “What to fix first”

这个区块会把最重要的 finding 变成简短行动列表。它适合用于团队 handoff，也适合整理成 issue 草稿。

## 4. 检查 detected ecosystems

生态检测会说明 Runwise 在本地看到了哪些 AI 项目栈线索。你可以用它检查 MCP、RAG、browser-agent、Codex-style、OpenAI-compatible API 或国内大模型 provider 假设。

## 5. 再看 medium 和 low finding

Medium finding 常常能帮助你改进 review 质量、trace 覆盖、eval 覆盖和 provider 文档。Low 和 info finding 更适合做后续打磨。

## 6. 决定下一步

读完报告后，可以选择：

- 为真实问题创建小 issue
- 补充缺失的 trace 示例
- 把反复出现的失败转成 eval case
- 记录 provider 假设
- 把静态 HTML 报告分享给团队

生成的报告默认位于本地 `.runwise/`，并且会被 git 忽略。
