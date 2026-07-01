# First Release Candidate Checklist

Target candidate: `v0.1.0-preview.0`

- [x] Public repository renders correctly.
- [x] CI passes on `main`.
- [x] English README renders correctly.
- [x] Chinese README renders correctly.
- [x] Banner renders.
- [x] Issue templates exist.
- [x] PR template exists.
- [x] `action.yml` exists.
- [x] `.runwise/` artifacts are ignored.
- [x] `runwise doctor` works.
- [x] Static HTML report works.
- [x] Local Dashboard Viewer works.
- [x] GitHub Action self-check works.
- [x] `runwise trace validate` works.
- [x] `runwise trace replay` works.
- [x] `runwise eval generate` works.
- [x] Ecosystem detection works.
- [x] Package version reviewed.
- [x] Release notes reviewed.
- [x] Node.js 20 annotation reviewed.
- [x] npm publishing deferred.
- [x] GitHub Marketplace release deferred.
- [x] First preview tag exists.
- [x] GitHub prerelease created.
- [x] Release body corrected after creation.
- [x] Final English and Chinese release notes files added.
- [x] Launch sharing pack added.
- [x] Project one-pager added.
- [x] Node.js 20 annotation remains non-blocking.

## Preview Tag

```bash
v0.1.0-preview.0
```

The tag was created in Loop 10F and should not be moved or recreated.

## GitHub Prerelease

https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0

The prerelease was created from the existing tag. npm publishing and GitHub Marketplace release remain deferred.

## Known Non-blocking Follow-up

- GitHub Actions reports a Node.js 20 deprecation annotation from referenced actions. CI passes. Review action runtime upgrades before stable release.
