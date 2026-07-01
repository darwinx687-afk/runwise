# Trace Replay 示例

这是整理过的示例，不是生成的 `.runwise/` artifact。

## Run

- Run ID: `mcp-risk-run-001`
- Status: `partial`
- Steps: 3
- Errors: 0

## 时间线

1. `[mcp_tool_call]` `filesystem.scan` 通过 MCP tool 读取项目文件。
2. `[mcp_tool_call]` `filesystem.delete` 出现高风险文件操作。
3. `[final_output]` agent 返回 cleanup recommendation。

## 风险摘要

- Critical: 0
- High: 1
- Medium: 0
- Low: 1

## 审批摘要

- Approval requests: 0
- Approval responses: 0
- Review note: 高风险 tool 调用应该有审批轨迹。

## 建议

1. 在高风险 MCP tool 调用前增加 approval request step。
2. 记录足够上下文，说明为什么需要这次 tool call。
3. 把这次 risky run 转成 eval case，避免缺失审批的问题之后悄悄复发。

## 为什么重要

Replay 让团队不用重新运行 agent、不执行 tool、不调用模型，也能读懂一次运行发生了什么。
