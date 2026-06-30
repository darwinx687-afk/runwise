# First Public Push Plan

This plan is prepared for the first public Runwise push. It must not be executed until the GitHub repository exists and the real repository URL is confirmed.

## Current Remote Status

- No remote URL was provided in Loop 10A.
- `git remote -v` is currently empty.
- First push is prepared but not executed.

## Preconditions

- GitHub repository `runwise` has been created.
- Maintainer has confirmed the real repository URL.
- Local checks pass.
- `.runwise/` generated artifacts remain ignored and untracked.
- The working tree contains only intentional source, docs, examples, package, and governance files.

## Commands To Run After URL Confirmation

```bash
git remote add origin <repo-url>
git branch -M main
git push -u origin main
```

Replace `<repo-url>` with the confirmed GitHub repository URL.

## Post-Push Checks

- README renders correctly on GitHub.
- SVG banner renders in the README.
- `.github/workflows/runwise.yml` starts on the first push.
- `action.yml` is visible at the repository root.
- Issue templates and PR template appear in GitHub.
- `.runwise/` generated reports were not pushed.
- Default branch is `main`.
- Public action examples still avoid claiming a release tag until one exists.
- npm publishing remains deferred until package metadata is reviewed.

## Stop Rules

- Stop if the remote URL is not confirmed.
- Stop if `git status --short` shows unexpected generated artifacts.
- Stop if `.runwise/` appears in `git ls-files`.
- Stop if checks fail.
- Do not create a release tag during the first push unless release review has explicitly approved it.
