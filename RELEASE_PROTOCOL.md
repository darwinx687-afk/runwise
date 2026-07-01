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

The first preview tag is `v0.1.0-preview.0`.

These were the prepared tag commands:

```bash
git status --short
pnpm check
pnpm check:types
pnpm test
pnpm exec runwise doctor
git tag -a v0.1.0-preview.0 -m "Runwise v0.1.0-preview.0"
git push origin v0.1.0-preview.0
```

Do not move, delete, or force-update the tag after it is pushed.

Before creating the tag, verify GitHub Actions is green on `main`, generated `.runwise/` artifacts are still ignored, and npm publishing plus GitHub Marketplace release remain deferred.

## Preview GitHub Release Creation

The tag `v0.1.0-preview.0` already exists. The GitHub Release should be created as a prerelease only after the prerelease creation loop is explicitly approved.

Release notes should come from `docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md`.

Prepared command, not yet executed:

```bash
gh release create v0.1.0-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.0-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md \
  --prerelease
```

Verification commands:

```bash
gh release view v0.1.0-preview.0 --repo darwinx687-afk/runwise
gh release list --repo darwinx687-afk/runwise --limit 5
```

npm publishing remains deferred. GitHub Marketplace release remains deferred. After release creation, verify the GitHub release page renders correctly.
