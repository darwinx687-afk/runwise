# Trace Schema

Runwise trace 验证使用名为 `runwise.agent_trace` 的本地 JSON 契约。

该 schema 记录：

- `runId`、`status`、`startedAt` 以及可选 model/environment 提示等运行元数据
- `llm_call`、`tool_call`、`mcp_tool_call`、`rag_retrieval`、`approval_request`、`approval_response`、`error`、`final_output` 等有序步骤
- 可选的 risk、input、output、error 和 metadata 字段

验证 trace：

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

验证过程完全本地执行。它不会上传 trace、调用模型、执行工具、回放运行或生成评测用例。
