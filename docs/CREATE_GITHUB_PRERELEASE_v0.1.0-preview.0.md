# Create GitHub Prerelease v0.1.0-preview.0

These commands are prepared for the next approved loop. They have not been executed.

Do not run these commands until Loop 10H is explicitly approved.

## Preconditions

- Tag `v0.1.0-preview.0` exists locally and on origin.
- `main` is green in GitHub Actions.
- `docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md` has been reviewed.
- npm publishing remains deferred.
- GitHub Marketplace release remains deferred.

## Create Prerelease

```bash
gh release create v0.1.0-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.0-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md \
  --prerelease
```

## Verify

```bash
gh release view v0.1.0-preview.0 --repo darwinx687-afk/runwise
gh release list --repo darwinx687-afk/runwise --limit 5
```

## Boundaries

- Do not publish npm packages in the prerelease creation loop.
- Do not create a GitHub Marketplace release.
- Do not move or recreate the existing tag.
- Do not add hosted service, login, database, or agent runtime claims.
