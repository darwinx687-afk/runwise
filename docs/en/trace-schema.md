# Trace Schema

Runwise trace validation uses a local JSON contract named `runwise.agent_trace`.

The schema records:

- run metadata such as `runId`, `status`, `startedAt`, and optional model/environment hints
- ordered steps such as `llm_call`, `tool_call`, `mcp_tool_call`, `rag_retrieval`, `approval_request`, `approval_response`, `error`, and `final_output`
- optional risk, input, output, error, and metadata fields

Validate a trace:

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

Validation is local. It does not upload traces, call models, execute tools, replay the run, or generate eval cases.
