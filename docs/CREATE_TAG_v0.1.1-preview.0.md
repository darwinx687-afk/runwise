# Create Tag v0.1.1-preview.0

Do not run these commands until the release candidate is approved.

This document is for the next approval loop only.

## Preconditions

- `main` is clean.
- Local checks pass.
- GitHub Actions passes on the release-candidate commit.
- `.runwise/` artifacts are ignored and untracked.
- npm publishing remains deferred.
- No GitHub Release is created in the tag loop unless explicitly approved.

## Commands For The Approved Tag Loop

```bash
git status --short
git tag -a v0.1.1-preview.0 -m "Runwise v0.1.1-preview.0"
git push origin v0.1.1-preview.0
```

Do not move, delete, or force-update the tag after it is pushed.
