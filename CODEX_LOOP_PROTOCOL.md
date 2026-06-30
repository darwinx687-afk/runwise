# Codex Loop Protocol

Runwise development proceeds in explicit loops.

## Loop Rules

1. Name the loop and phase before implementing.
2. Keep changes inside the current phase boundary.
3. Update `RUN_STATE.md` at the end of each loop.
4. Record structural decisions in `DECISION_LOG.md`.
5. Run `pnpm check` and `pnpm test` before handoff when dependencies are installed.

## Current Loop

Loop 3 is Phase 3 - Report System Refinement and HTML Report. It adds a self-contained static HTML report and improves report readability without building the dashboard.
