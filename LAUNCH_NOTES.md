# Runwise Launch Notes

Runwise is an open-source local-first toolkit for checking AI agent readiness, generating reports, validating traces, replaying runs, and turning failures into eval cases.

This initial open-source preview is for developers and teams building AI Agents, MCP servers, RAG systems, and LLM applications who want reviewable local evidence before demos, CI gates, or releases.

## Current Release

- GitHub prerelease: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- Status: public preview prerelease
- Distribution: source install only

## What You Can Do Today

- Run local readiness checks with `runwise doctor`.
- Generate JSON, Markdown, and static HTML reports.
- Open a local Dashboard Viewer from generated report JSON.
- Validate local `runwise.agent_trace` files.
- Produce static trace replay reports.
- Generate reusable eval case files from validated traces.
- Detect local compatibility signals for ecosystems such as MCP, LangChain, OpenAI Agents, Dify, browser-use, Codex, Cursor, Windsurf, Ollama, OpenAI-compatible APIs, and China-ready LLM providers.

## What Runwise Is Not

Runwise is not an agent framework, chatbot platform, hosted SaaS, Dify/OpenWebUI clone, Langfuse/Promptfoo replacement, or model training framework.

## Current Distribution

Runwise currently runs from source. The preview tag `v0.1.0-preview.0` exists, and the GitHub prerelease has been created.

npm publishing and GitHub Marketplace release remain deferred. Feedback is welcome on AI Agent readiness, trace replay, Failure-to-Eval, and China-ready LLM detection.
