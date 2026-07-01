# v0.1.1 Release Candidate Checklist

This checklist prepares `v0.1.1-preview.0` for approval. It does not create a tag, publish npm, or create a GitHub Release.

## Release Target

- Target version: `v0.1.1-preview.0`
- Release type: GitHub prerelease
- Tag to create later: `v0.1.1-preview.0`
- Current release: `v0.1.0-preview.0`
- Distribution path: source install only
- npm publish: not included
- GitHub Marketplace publish: not included
- Plugin runtime: not included

## Readiness

| Item | Status | Notes |
|---|---:|---|
| Source install | Ready | Verified from clean clone |
| npm package | Not included | Deferred |
| Plugin runtime | Not included | Docs only |
| GitHub Action | Ready | Existing workflow passes |
| Clean-machine review | Ready | Passed |
| Release notes | Ready | Drafted |
| Tag | Pending approval | Do not create in this loop |

## Local Verification

Required checks before approval:

```bash
CI=true npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 check:types
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
npx -y pnpm@9.15.4 exec runwise trace validate examples/traces/valid-agent-run.json
npx -y pnpm@9.15.4 exec runwise trace replay examples/traces/mcp-risk-agent-run.json
npx -y pnpm@9.15.4 exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

Also confirm:

```bash
git check-ignore -v .runwise/runwise-report.json .runwise/runwise-report.md .runwise/runwise-report.html .runwise/replays .runwise/evals .runwise
git ls-files .runwise
```

## Release Blockers

No release blockers are known at release-candidate preparation time.

Known non-blocking follow-ups:

- npm package publishing remains deferred.
- Plugin runtime support is not implemented.
- GitHub Actions still reports a Node.js 20 deprecation annotation from referenced upstream actions.
- Custom output directories outside `.runwise/` may need explicit ignore guidance in future docs.

## Approval Gate

Before the next loop creates the tag:

- user approval is required
- `main` should be clean
- local checks should pass
- GitHub Actions should pass on the release-candidate commit
- `.runwise/` should remain ignored and untracked
- tag and release commands should be run only in the approved release loop
