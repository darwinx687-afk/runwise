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

The first release candidate uses `0.1.0-preview.0`.

Package metadata remains private in this loop. npm publishing metadata should be finalized only in a later publishing loop.

## First Tag Preparation

The following commands are prepared for the first preview tag, but they have not been executed:

```bash
git status --short
pnpm check
pnpm check:types
pnpm test
pnpm exec runwise doctor
git tag -a v0.1.0-preview.0 -m "Runwise v0.1.0-preview.0"
git push origin v0.1.0-preview.0
```

Do not create or push the tag until release candidate review is approved.

Before creating the tag, verify GitHub Actions is green on `main`, generated `.runwise/` artifacts are still ignored, and npm publishing plus GitHub Marketplace release remain deferred.
