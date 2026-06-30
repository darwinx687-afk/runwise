# Release Protocol

Runwise is preparing an initial open-source preview. This protocol covers repository readiness before public push, release tags, or package publishing.

## Pre-release Checklist

- `pnpm install` completes.
- `pnpm check` passes.
- `pnpm test` passes.
- `RUN_STATE.md` is current.
- `DECISION_LOG.md` captures structural decisions.
- README files are mirrored in English and Simplified Chinese.
- `CHANGELOG.md` and launch notes are current.
- `.runwise/` generated artifacts are ignored and untracked.

## Versioning

Preview packages use `0.0.0`. Versioning policy and npm publishing metadata should be finalized before the first public package release.
