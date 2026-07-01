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
- Add local trace validation CLI.
- Add example agent and MCP trace files.
- Keep trace work local-first and reportable.

## Phase 7: Trace Replay

- Add local replay fixtures.
- Add static replay summary builder.
- Generate Markdown replay reports.
- Summarize risk, approvals, and errors.
- Validate replay preconditions.
- Keep replay separate from hosted storage or agent runtime orchestration.

## Phase 8: Failure-to-Eval

- Convert reviewed failures into eval case drafts.
- Keep eval generation local and reviewable.
- Avoid automatic model calls or hosted eval storage.
- Add deterministic trace-to-eval case generation.
- Write JSON, YAML, and Markdown eval artifacts.
- Preserve high-risk, approval, failure, RAG, and success-baseline signals.

## Phase 9: Ecosystem Integrations and Compatibility Examples

- Add integration profile schema and local compatibility detection.
- Show detected ecosystems in Doctor JSON, Markdown, HTML, and Dashboard Viewer reports.
- Add lightweight compatibility examples for MCP, RAG, browser agents, Dify-style workflow signals, Codex-style projects, and China-ready LLM provider signals.
- Keep integrations adapter-based, heuristic, and local-first.

## Phase 10: Open Source Launch Polish and Repository Presentation

- Polish repository presentation and open-source contributor flow.
- Review documentation consistency, examples, and release-readiness messaging.
- Keep launch work separate from hosted product, cloud sync, login, billing, or agent runtime scope.
- Add launch assets, docs, community templates, changelog, launch notes, and repository launch checklists.
- Keep source installation as the current distribution path until repository and package metadata are reviewed.

## Phase 10A: Repository Remote Setup and First Public Push Preparation

- Create the public repository and confirm the final repository URL.
- Replace placeholder repository URL text.
- Run launch readiness checks one final time.
- Push the initial branch and defer npm publishing until package metadata is reviewed.

## Phase 11: Developer Experience and First Impression

- Make the first-run path clear for source-install users.
- Keep examples useful, lightweight, and easy to review.
- Add Example Gallery polish and curated visual sample outputs as part of the developer experience phase.
- Improve README, docs landing pages, walkthroughs, and report readability.
- Phase 11D polishes Markdown reports, static HTML reports, local dashboard scanability, empty states, and score explanation.
- Phase 11E explores future plugin architecture with docs, draft manifests, draft JSON rule packs, and documentation-only examples.
- Phase 11F reviews the Phase 11 surface and plans `v0.1.1-preview.0` as a small usability and trust polish release.
- Phase 11G adds clean install, source-run, and finding-feedback guidance for first-time users.
- Avoid feature bloat while public preview feedback is still early.
- Plugin support is future work and should not be listed as implemented.
- v0.1.1 should focus on usability, trust, comparison clarity, install guidance, and feedback workflow.
- npm publishing remains deferred until install behavior and package metadata are reviewed.
- Next recommended loop: Clean-machine install review.

## Phase 12 Candidate: Local Rule Pack MVP

- Phase 12 should require approval after review.
- Candidate scope: schema validation and explicit local JSON rule packs.
- Do not add executable plugins as the first plugin MVP.
- Do not add remote plugin execution, hosted marketplace behavior, cloud sync, or model calls.
