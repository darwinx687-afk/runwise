# Changelog

All notable changes to Runwise will be documented here.

## Unreleased

No unreleased changes are currently listed after the v0.1.1 release-candidate preparation.

## v0.1.1-preview.0 - Release candidate

### Added

- Clean install checklist for source-install users.
- First-run walkthrough and test-on-your-project guidance.
- Finding feedback guide for false positives and false negatives.
- Example Gallery and curated demo-output samples.
- Visual report sample and report reading guide.
- Comparison docs for Langfuse, Promptfoo, Dify, and Open WebUI.
- Plugin architecture exploration docs and documentation-only plugin examples.
- Clean-machine install review notes.

### Changed

- README opening and repository presentation simplified.
- First 5-minute developer experience improved.
- Static HTML report visual hierarchy improved.
- Local dashboard readability improved.
- README link structure improved for first-time users.
- Docs landing pages now surface install, feedback, comparison, example, and report-reading guides.
- CLI help text clarified for source-install public preview users.
- Source-install and first-run documentation refined based on clean clone testing.

### Verified

- Clean clone install path passed with repo-declared `pnpm@9.15.4`.
- `doctor`, `view`, trace validation, trace replay, and Failure-to-Eval commands passed.
- `.runwise/` outputs remain ignored and untracked.

### Known Follow-ups

- npm package is not published yet.
- Plugin support is documented as future architecture only and is not implemented.
- GitHub Actions still shows a non-blocking Node.js 20 deprecation annotation from upstream actions.

## 0.1.0-preview.0 - Public preview prerelease

Initial open-source preview foundation.

### Added

- Local-first Runwise Doctor readiness scanner.
- Rule-based readiness engine.
- JSON, Markdown, and static HTML reports.
- Local Dashboard Viewer.
- Composite GitHub Action readiness gate.
- Trace schema validation.
- Static trace replay.
- Failure-to-Eval generation.
- Ecosystem compatibility detection.
- Lightweight examples and trace fixtures.
- Bilingual English / Chinese documentation.

### Not Yet Included

- npm package publishing.
- GitHub Marketplace listing.
- Hosted service, login, billing, database, or cloud sync.
- Agent runtime, model calls, eval runner, or training pipeline.
