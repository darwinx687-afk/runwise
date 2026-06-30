# Roadmap

## Phase 0: Project Foundation

- Create pnpm monorepo.
- Create TypeScript-first package shells.
- Add governance files.
- Add bilingual README files.
- Add CLI doctor placeholder.

## Phase 1: Runwise Doctor CLI

- Implement real local readiness checks.
- Define check result schema.
- Add human-readable and machine-readable output modes.
- Add fixture-based CLI tests.

## Phase 2: Risk Rule Engine and Scoring Refinement

- Define structured Doctor rules.
- Add rule execution summaries.
- Add blocking finding support.
- Refine readiness scoring.

## Phase 3: Report System Refinement and HTML Report

- Improve report layout and prioritization.
- Add HTML report output.
- Keep JSON and Markdown reports stable.

## Phase 4: Dashboard and Documentation

- Build local dashboard workflows.
- Add a lightweight local report-file Dashboard Viewer.
- Expand English and Chinese documentation.
- Publish release-ready examples.

## Phase 5: GitHub Action Readiness Check

- Add GitHub Action entrypoint.
- Run Runwise Doctor in CI.
- Write GitHub Step Summary and action outputs.
- Support score, blocking, and severity thresholds.
- Upload reproducible report artifacts.

## Phase 6: Trace Schema and Validation

- Define trace schema contracts.
- Add trace fixture validation.
- Keep trace work local-first and reportable.
