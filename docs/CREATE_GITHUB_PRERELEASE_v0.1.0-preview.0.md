# Create GitHub Prerelease v0.1.0-preview.0

These commands were prepared for Loop 10H and are retained as historical release-operation notes.

Do not rerun release creation for `v0.1.0-preview.0`; the GitHub prerelease already exists.

## Preconditions

- Tag `v0.1.0-preview.0` exists locally and on origin.
- `main` is green in GitHub Actions.
- `docs/GITHUB_RELEASE_NOTES_v0.1.0-preview.0.md` has been reviewed for the live release body.
- npm publishing remains deferred.
- GitHub Marketplace release remains deferred.

## Create Prerelease

```bash
gh release create v0.1.0-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.0-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md \
  --prerelease \
  --verify-tag \
  --latest=false
```

For body corrections after creation, use `gh release edit` with `docs/GITHUB_RELEASE_NOTES_v0.1.0-preview.0.md`.

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
