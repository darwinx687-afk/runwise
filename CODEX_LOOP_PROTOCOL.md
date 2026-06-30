# Codex Loop Protocol

Runwise development proceeds in explicit loops.

## Loop Rules

1. Name the loop and phase before implementing.
2. Keep changes inside the current phase boundary.
3. Update `RUN_STATE.md` at the end of each loop.
4. Record structural decisions in `DECISION_LOG.md`.
5. Run `pnpm check` and `pnpm test` before handoff when dependencies are installed.

## Current Loop

Loop 2 is Phase 2 - Risk Rule Engine and Scoring Refinement. It refactors Doctor findings to come from structured local rules, blocking finding metadata, refined scoring, and report rule summaries only.
