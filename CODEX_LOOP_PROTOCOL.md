# Codex Loop Protocol

Runwise development proceeds in explicit loops.

## Loop Rules

1. Name the loop and phase before implementing.
2. Keep changes inside the current phase boundary.
3. Update `RUN_STATE.md` at the end of each loop.
4. Record structural decisions in `DECISION_LOG.md`.
5. Run `pnpm check`, `pnpm check:types`, and `pnpm test` before handoff when dependencies are installed.
6. Run `pnpm exec runwise doctor` when the loop touches Doctor, reports, scoring, or quality-gate behavior.

## Current Loop

Loop 10 is Phase 10 - Open Source Launch Polish and Repository Presentation. It polishes README files, docs, examples, community templates, launch notes, repository checklists, and safe package metadata without adding new core product capabilities, publishing packages, pushing to GitHub, or claiming hosted availability.

## Check Strategy

`pnpm check` is the deterministic root workspace gate. It validates required folders, governance files, package entry files, package JSON parsing, TypeScript syntax/transpile health, and that generated `.runwise/` report artifacts are not tracked.

`pnpm check:types` runs the TypeScript syntax/transpile portion directly. Package-level `tsc --noEmit -p tsconfig.json` scripts remain available in package workspaces, but root-wide `tsc --noEmit` is not the required handoff gate until the workspace TypeScript strategy is revisited.
