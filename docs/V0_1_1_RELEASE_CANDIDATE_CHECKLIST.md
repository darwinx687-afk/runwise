# v0.1.1 Release Candidate Checklist

This checklist records the `v0.1.1-preview.0` prerelease approval state. It does not publish npm or create a GitHub Marketplace listing.

## Release Target

- Target version: `v0.1.1-preview.0`
- Release type: GitHub prerelease
- Tag: `v0.1.1-preview.0`
- Current release: `v0.1.1-preview.0`
- Previous release: `v0.1.0-preview.0`
- Distribution path: source install only
- npm publish: not included
- GitHub Marketplace publish: not included
- Plugin runtime: not included

## Readiness

| Item | Status | Notes |
|---|---:|---|
| Source install | Ready | Verified from clean clone |
| npm package | Not included | Deferred |
| npm publish | Not included | Deferred |
| Marketplace publish | Not included | Deferred |
| Plugin runtime | Not included | Docs only |
| GitHub Action | Ready | Existing workflow passes |
| Clean-machine review | Ready | Passed |
| Release notes | Ready | Drafted |
| Tag | Created and pushed | `v0.1.1-preview.0` |
| GitHub prerelease | Created | https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0 |

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

## Post-release Status

- Tag: Created and pushed
- GitHub prerelease: Created
- npm publish: Not included
- Marketplace publish: Not included

## Approval Gate

Before the next post-release loop:

- user approval is required
- `main` should be clean
- local checks should pass
- GitHub Actions should pass
- `.runwise/` should remain ignored and untracked
- npm publish, GitHub Marketplace publish, and additional release commands remain out of scope unless explicitly approved
