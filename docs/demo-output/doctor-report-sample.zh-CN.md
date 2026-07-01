# Doctor 报告示例

这是整理过的示例，不是生成的 `.runwise/` artifact。

## 摘要

Score: 97/100

Rules:

- 14 passed
- 1 failed
- 0 blocking

Findings:

- 0 critical
- 0 high
- 1 low
- 2 info

## 检测到的生态线索

- MCP
- Codex
- OpenAI-compatible API
- China-ready LLM

## 报告文件

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

## 优先修什么

1. 给关键 workflow 补充 eval 覆盖。
2. 让 trace 示例尽量贴近真实 agent 运行。
3. 记录 provider-specific base URL 假设。

## 为什么重要

Doctor 报告能让 reviewer 在 AI Agent 项目上线前有一个共同起点。分数有参考价值，但 finding 和下一步建议才是真正用于 review 的部分。
