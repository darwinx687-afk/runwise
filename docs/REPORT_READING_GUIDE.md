# Report Reading Guide

Use this guide when you open a Runwise Doctor report for the first time.

## 1. Start with score

The score gives you a quick readiness signal. It is not the whole story, but it helps you decide how much review is needed.

## 2. Check blocking, critical, and high findings

Look at blocking, critical, and high findings before anything else. These findings usually point to missing governance, risky tool use, or gaps that should be handled before sharing the project.

## 3. Review "What to fix first"

This section turns the most important findings into a short action list. Use it for a team handoff or issue draft.

## 4. Inspect detected ecosystems

Detected ecosystems explain which local AI stack signals Runwise found. Use this section to check MCP, RAG, browser-agent, Codex-style, OpenAI-compatible API, or China-ready provider assumptions.

## 5. Read medium and low findings

Medium findings often help improve review quality, trace coverage, eval coverage, and provider documentation. Low and info findings are useful for polish.

## 6. Decide the next action

After reading the report, choose one of these actions:

- create small issues for real fixes
- add missing trace examples
- add eval cases for repeated failures
- document provider assumptions
- share the static HTML report with a team

Generated reports stay local under `.runwise/` and are ignored by git by default.
