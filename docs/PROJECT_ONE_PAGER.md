# Runwise Project One-Pager

## What It Is

Runwise helps you check AI agent projects before they go live.

It runs locally, reviews project setup, generates reports, validates traces, replays runs, and turns failures into eval case files.

## Current Release

- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.0-preview.0`
- Status: public preview prerelease
- Distribution: source install only

## Why It Exists

AI agent projects often need a second look before demos, CI gates, or early release reviews. Runwise focuses on local, reviewable files instead of hosted storage, hidden model calls, or taking over the agent runtime.

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
- Teams that want local checks and reports before deciding whether they need heavier tooling.

## Feedback Needed

- Readiness rules and scoring expectations.
- Trace replay readability.
- Failure-to-Eval artifact shape.
- MCP, RAG, browser-agent, OpenAI-compatible API, and China-ready LLM detection.
- Documentation and example gaps before the next preview.
