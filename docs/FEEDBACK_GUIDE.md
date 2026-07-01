# Feedback Guide

Runwise is in public preview. Feedback is most useful when it includes the command you ran, the result you expected, the result you saw, and a safe minimal example.

Do not share secrets, private customer data, proprietary traces, private API endpoints, or full internal reports in public issues.

## What Feedback We Want

- Noisy or missing `runwise doctor` findings.
- False positives or false negatives in readiness rules.
- Ecosystem detection requests and missing local signals.
- Trace schema usability for AI Agent, MCP, RAG, and LLM application runs.
- Replay report clarity and usefulness for post-run review.
- Failure-to-Eval output structure and usefulness.
- China-ready LLM provider detection coverage and naming.
- Documentation gaps in English or Simplified Chinese.

## Bug Reports

Please include:

- Runwise version or commit.
- Command run.
- Expected behavior.
- Actual behavior.
- OS, Node.js version, and pnpm version.
- Whether a safe `.runwise` report excerpt can be shared.
- Whether the project includes AI, MCP, or RAG traces.

Use the Bug Report issue template when possible.

## Doctor False Positives / False Negatives

For a noisy or missing Doctor finding, include:

- The rule or finding name if visible.
- A redacted report excerpt.
- The relevant local file names or package names.
- Why the finding is wrong or missing.
- Whether the project is an AI Agent, MCP server, RAG workflow, LLM application, or mixed stack.

## Ecosystem Detection Requests

For a new ecosystem profile or detection improvement, include:

- Ecosystem name.
- Safe local detection signals, such as package names, config file names, docs strings, or environment example names.
- Recommended checks.
- Whether the ecosystem is global, China-ready, both, internal, or private.
- Sanitized sample config snippets if safe.

Do not include API keys, access tokens, private endpoints, or customer data.

## Trace Schema Feedback

Tell us whether the current `runwise.agent_trace` format captures the events you need to review:

- LLM calls.
- Tool calls.
- MCP tool calls.
- RAG retrieval.
- Approval requests and responses.
- Errors and partial runs.
- Final output.

If something is missing, describe the event shape in plain language or with a sanitized minimal JSON snippet.

## Replay Report Feedback

Useful replay feedback includes:

- Whether the timeline is easy to scan.
- Whether risk and approval summaries are clear.
- Whether error and partial-run context is enough.
- What would help reviewers understand a run without rerunning an agent.

## Failure-to-Eval Feedback

Useful Failure-to-Eval feedback includes:

- Whether generated eval cases are reviewable.
- Whether expected and prohibited behaviors are clear.
- Whether assertions match the failure.
- Whether JSON, YAML, and Markdown outputs fit your workflow.

## China-Ready LLM Detection Feedback

Feedback is welcome on local signals for OpenAI-compatible APIs, Ollama, DashScope/Qwen, DeepSeek, Moonshot/Kimi, Zhipu/GLM, Minimax, Baichuan, SiliconFlow, and other provider patterns.

Please keep provider examples generic and redacted.

## Security-Sensitive Feedback

For security-sensitive reports, do not open a public issue with exploit details or private data. Follow `SECURITY.md` and share only the minimum safe context needed to coordinate disclosure.
