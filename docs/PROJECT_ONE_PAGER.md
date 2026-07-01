# Runwise Project One-Pager

## What It Is

Runwise is an open-source, local-first readiness, trace replay, and eval generation toolkit for AI agents, MCP servers, RAG systems, and LLM applications.

## Current Release

- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- Status: public preview prerelease
- Distribution: source install only

## Why It Exists

AI agent projects often need evidence before demos, CI gates, or early release reviews. Runwise focuses on producing local, reviewable artifacts instead of relying on hosted storage, hidden model calls, or runtime ownership.

## What It Does Today

- Runs local readiness checks through `runwise doctor`.
- Produces JSON, Markdown, and static HTML reports.
- Opens a local Dashboard Viewer for generated report JSON.
- Validates local `runwise.agent_trace` files.
- Generates static trace replay reports.
- Converts reviewed failures into deterministic eval case drafts.
- Detects local ecosystem compatibility signals.

## What It Does Not Do Yet

- No npm package publishing.
- No GitHub Marketplace listing.
- No hosted service, cloud sync, login, billing, or database.
- No agent runtime orchestration.
- No model calls, model judging, eval execution, or model training.
- No official ecosystem partnership or official integration claims.

## Who It Is For

- Developers building local AI agent prototypes.
- Teams shipping MCP servers, RAG workflows, or LLM applications.
- Maintainers who want readiness evidence before CI gates or public previews.
- Teams comparing local AgentOps workflows before adopting hosted infrastructure.

## Feedback Needed

- Readiness rules and scoring expectations.
- Trace replay readability.
- Failure-to-Eval artifact shape.
- MCP, RAG, browser-agent, OpenAI-compatible API, and China-ready LLM detection.
- Documentation and example gaps before the next preview.
