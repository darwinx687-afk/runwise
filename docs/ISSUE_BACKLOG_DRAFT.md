# Issue Backlog Draft

This is a local planning draft. Do not create GitHub Issues automatically from this document.

## Documentation

### Tighten README first screen

- Type label: `type:docs`
- Area label: `area:readme`
- Priority: high
- Why it matters: first-time visitors need the shortest path from "what is this" to "try it".
- Acceptance criteria:
  - README keeps public-preview boundaries.
  - first command is obvious.
  - comparison and examples are linked without crowding the first screen.

### Add comparison section

- Type label: `type:docs`
- Area label: `area:positioning`
- Priority: high
- Why it matters: users may compare Runwise with Langfuse, Promptfoo, Dify, or Open WebUI.
- Acceptance criteria:
  - comparison is respectful.
  - Runwise is described as a local pre-ship review layer.
  - no competitor is described as worse.

### Add clean-machine install walkthrough

- Type label: `type:docs`
- Area label: `area:quick-start`
- Priority: high
- Status: addressed locally in Phase 11G by `docs/CLEAN_INSTALL_CHECKLIST.md`.
- Why it matters: source-install only is the biggest current adoption friction.
- Acceptance criteria:
  - covers Node.js and pnpm/Corepack.
  - includes expected outputs.
  - includes common failure recovery notes.

### Add "test Runwise on your own project" guide

- Type label: `type:docs`
- Area label: `area:doctor`
- Priority: medium
- Status: addressed locally in Phase 11G by `docs/TEST_ON_YOUR_PROJECT.md`.
- Why it matters: users need to know whether Runwise applies to their own repo.
- Acceptance criteria:
  - shows safe commands with `--cwd`.
  - explains generated `.runwise/` files.
  - explains how to share feedback without secrets.

## Developer Experience

### Improve source install guidance

- Type label: `type:dx`
- Area label: `area:install`
- Priority: high
- Status: moved forward in Phase 11G with clean install and source-run guidance.
- Why it matters: no npm package exists yet.
- Acceptance criteria:
  - documented source install works from a clean environment.
  - pnpm version guidance is clear.
  - Corepack path is documented.

### Clarify pnpm and Corepack behavior

- Type label: `type:dx`
- Area label: `area:package-manager`
- Priority: medium
- Status: moved forward in Phase 11G by documenting Corepack and `npx -y pnpm@9.15.4`.
- Why it matters: global pnpm version differences can confuse users.
- Acceptance criteria:
  - README or Quick Start points to the declared package manager version.
  - clean fallback command is documented.

### Polish `runwise --help`

- Type label: `type:dx`
- Area label: `area:cli`
- Priority: medium
- Status: addressed locally in Phase 11G with source-preview and local-output wording.
- Why it matters: users may inspect CLI help before reading docs.
- Acceptance criteria:
  - help text says source preview.
  - commands are grouped clearly.
  - no plugin or npm availability is implied.

### Improve Doctor terminal wording

- Type label: `type:dx`
- Area label: `area:doctor`
- Priority: medium
- Why it matters: terminal output is the first result many users see.
- Acceptance criteria:
  - score and report paths are clear.
  - next action is obvious.
  - no noisy detail overwhelms the output.

## Report UX

### Improve HTML report copy

- Type label: `type:docs`
- Area label: `area:report`
- Priority: medium
- Why it matters: the static report may be shared with teammates.
- Acceptance criteria:
  - "What to fix first" is concise.
  - severity sections are easy to scan.
  - local-first footer remains visible.

### Improve dashboard empty states

- Type label: `type:ux`
- Area label: `area:dashboard`
- Priority: low
- Why it matters: small projects may have few findings or no detected ecosystems.
- Acceptance criteria:
  - empty states explain what happened.
  - no blank sections.
  - no hosted dashboard implication.

### Add copy-to-issue snippets later

- Type label: `type:ux`
- Area label: `area:report`
- Priority: low
- Why it matters: users may want to turn findings into tasks.
- Acceptance criteria:
  - snippets are local and static.
  - no automatic issue creation.
  - finding content stays concise.

## Trace / Eval

### Clarify trace schema examples

- Type label: `type:docs`
- Area label: `area:trace`
- Priority: medium
- Why it matters: trace terminology may be new to first-time users.
- Acceptance criteria:
  - examples explain each step type.
  - validation errors are easy to interpret.
  - risky MCP trace is clearly labeled as a fixture.

### Improve Failure-to-Eval examples

- Type label: `type:docs`
- Area label: `area:eval`
- Priority: medium
- Why it matters: users need to see why turning a failure into an eval case is useful.
- Acceptance criteria:
  - example shows source trace and generated case side by side.
  - expected behavior and must-not behavior are explained.
  - no eval execution or model judging is implied.

### Review promptfoo-compatible export

- Type label: `type:research`
- Area label: `area:eval`
- Priority: low
- Why it matters: Promptfoo users may want an export path later.
- Acceptance criteria:
  - research only.
  - no exporter implementation without approval.
  - document whether it belongs in core or a later plugin/rule-pack phase.

## Ecosystem Detection

### Refine China-ready provider detection

- Type label: `type:rules`
- Area label: `area:integrations`
- Priority: medium
- Why it matters: provider config signals are useful for real deployment review.
- Acceptance criteria:
  - add false positive and false negative fixtures.
  - keep detection local and heuristic.
  - avoid partnership claims.

### Add more MCP risky tool name examples

- Type label: `type:rules`
- Area label: `area:mcp`
- Priority: medium
- Why it matters: MCP users need clear tool-risk guidance.
- Acceptance criteria:
  - examples cover shell, filesystem write, delete, send, and payment-like names.
  - recommendations stay practical.
  - no tool execution is added.

### Add false positive / false negative fixtures

- Type label: `type:test`
- Area label: `area:doctor`
- Priority: medium
- Status: still open; Phase 11G added the feedback guide, but not fixtures.
- Why it matters: feedback-driven rule tuning needs reproducible examples.
- Acceptance criteria:
  - fixtures are small.
  - no external APIs.
  - expected findings are documented.

## CI / Release

### Investigate GitHub Actions Node.js 20 annotation

- Type label: `type:ci`
- Area label: `area:github-action`
- Priority: medium
- Status: reviewed in Phase 11G and deferred; current workflow/action references `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/upload-artifact@v4`, and there is no low-risk local-only fix without an action major-version review.
- Why it matters: CI passes, but the annotation can reduce trust.
- Acceptance criteria:
  - identify which actions trigger the annotation.
  - fix only if safe.
  - keep existing readiness behavior unchanged.

### Prepare npm publish review later

- Type label: `type:release`
- Area label: `area:package`
- Priority: low
- Why it matters: users expect npm eventually, but package metadata should be reviewed first.
- Acceptance criteria:
  - package names and entrypoints are reviewed.
  - publish boundaries are documented.
  - no publish occurs in planning loops.

### Tag v0.1.1 only after changes

- Type label: `type:release`
- Area label: `area:release`
- Priority: high
- Why it matters: `v0.1.1-preview.0` should represent actual completed improvements.
- Acceptance criteria:
  - local checks pass.
  - GitHub Actions pass.
  - changelog and release notes are current.
  - no generated `.runwise/` artifacts are tracked.
