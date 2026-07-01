# Trace Replay Sample

This is a curated sample, not a generated `.runwise/` artifact.

## Run

- Run ID: `mcp-risk-run-001`
- Status: `partial`
- Steps: 3
- Errors: 0

## Timeline

1. `[mcp_tool_call]` `filesystem.scan` read project files through an MCP tool.
2. `[mcp_tool_call]` `filesystem.delete` appeared as a high-risk file operation.
3. `[final_output]` The agent returned a cleanup recommendation.

## Risk Summary

- Critical: 0
- High: 1
- Medium: 0
- Low: 1

## Approval Summary

- Approval requests: 0
- Approval responses: 0
- Review note: high-risk tool use should have an approval trail.

## Recommendations

1. Add an approval request step before high-risk MCP tool calls.
2. Record enough context to explain why the tool call was needed.
3. Convert the risky run into an eval case so the missing approval does not regress silently.

## Why This Matters

Replay lets a team read what happened without re-running the agent, executing tools, or calling a model.
