# Next Iteration Plan

## Positioning

Runwise helps you check AI agent projects before they go live.

It runs locally, reviews project setup, generates reports, validates traces, replays runs, and turns failures into eval cases.

## Goal For The Next Preview

Make Runwise easier to understand, try, and review from source before adding larger product capabilities.

The next iteration should keep the product local-first, source-install friendly, and honest about public preview status.

## Phase 11 Structure

### 11B - First 5-Minute Experience

Status: completed in this loop.

Focus:

- clearer README first impression
- 5-minute source-install flow
- first-run walkthrough
- example gallery
- simple visual explanation
- docs landing page cleanup

### 11C - Example Gallery Polish and Visual Report Samples

Status: completed in this loop.

Focus:

- add SVG example cards for MCP, RAG, replay, eval, and ecosystem detection
- add curated demo-output samples for Doctor reports, trace replay, Failure-to-Eval, and ecosystem detection
- improve example descriptions with commands, what to look for, and related sample outputs
- keep examples lightweight, local, and separate from generated `.runwise/` artifacts

### 11D - Visual Report Polish

Focus:

- improve Markdown and HTML report readability
- make findings easier to scan
- clarify score, severity, blocking, and ecosystem sections
- add copy-to-issue snippets if they help manual feedback
- improve report empty states
- improve category score explanation
- avoid adding hosted dashboard or complex product surface

### 11E - Plugin Architecture Exploration

Focus:

- explore how future checks could be grouped or extended
- keep the current rule engine stable
- document extension boundaries before implementation
- keep plugin architecture later, after visual report polish has improved the current experience

## Feedback Inputs

- GitHub Issues and Discussions if users open them.
- Public launch post comments when visible.
- Manual feedback from people trying source install.
- Local findings from running Runwise against example projects.

## Non-Goals

- npm publishing.
- GitHub Marketplace publishing.
- hosted services, login, billing, database, or cloud sync.
- agent runtime orchestration.
- model calls, model judging, or eval execution.
- official ecosystem partnership claims.

## Success Criteria

- A new visitor can understand what Runwise does in the first screen of the README.
- A developer can run the source-install flow and see a report in about 5 minutes.
- Examples explain what to look for, not just where files live.
- Report and replay feedback can be turned into small, concrete follow-up tasks.
