# Create GitHub Prerelease v0.1.1-preview.0

Do not run this command until the tag exists and the GitHub prerelease loop is approved.

This document is for the next approval loop after tag creation.

## Preconditions

- Tag `v0.1.1-preview.0` exists on GitHub.
- The tag points to the approved release-candidate commit.
- GitHub Actions passes.
- Release notes have been reviewed.
- npm publishing remains deferred.
- GitHub Marketplace release remains deferred.

## Command For The Approved Prerelease Loop

```bash
gh release create v0.1.1-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.1-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.1-preview.0.md \
  --prerelease \
  --verify-tag \
  --latest=false
```

## Verification

```bash
gh release view v0.1.1-preview.0 --repo darwinx687-afk/runwise
gh release list --repo darwinx687-afk/runwise --limit 5
```
