# v0.1.1 Post-release Verification

This document records the post-release verification for `v0.1.1-preview.0`.

## Release

- Release URL: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0
- Previous release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.1-preview.0`
- Tag target commit: `96b4864e61ad1c7bd990284b7ba7315c242d2dcc`
- Release name: `Runwise v0.1.1-preview.0`
- Created: `2026-07-01T14:27:47Z`
- Published: `2026-07-01T14:38:54Z`

## Status

| Item | Status | Notes |
| --- | ---: | --- |
| GitHub prerelease | Verified | Public release page is available |
| Draft | No | `isDraft: false` |
| Prerelease | Yes | `isPrerelease: true` |
| Latest | No | `isLatest: false` verified through GitHub GraphQL |
| npm package | Not published | Source install remains the supported path |
| GitHub Marketplace | Not published | No Marketplace claim |
| Plugin runtime | Not implemented | Plugin docs are future exploration only |
| Hosted service | Not included | No login, telemetry, database, or cloud sync |

## Repository First Impression

- Repository URL: https://github.com/darwinx687-afk/runwise
- Description: `Check AI agent projects before they go live: local reports, trace replay, and failure-to-eval for MCP/RAG/LLM apps.`
- Stars at verification time: `0`
- Forks at verification time: `0`
- Open issues at verification time: `0`
- Topics include `ai-agents`, `mcp`, `rag`, `trace`, `trace-replay`, `local-first`, and `typescript`.
- README preview release links were reviewed and should point to `v0.1.1-preview.0`.

## Release Notes Review

The release notes correctly state:

- this is a preview
- Runwise is source-install only
- npm is not published yet
- plugin runtime is not implemented
- hosted service, telemetry, database, login, and Marketplace listing are not included
- there is no stable release guarantee

No GitHub release edit was needed during this loop.

## Verification Summary

- GitHub release is public and correctly configured.
- The tag exists locally and remotely.
- The remote tag peels to the approved release-candidate commit.
- The release is a prerelease, not a draft, and not marked latest.
- GitHub Actions passed after the post-prerelease documentation commit.
- The known Node.js 20 deprecation annotation remains non-blocking.
- `.runwise/` generated artifacts remain ignored and untracked.

## Sharing Recommendation

This release is worth sharing as a small polish update, but it should be framed as a first-time developer experience improvement, not a major feature launch.

Recommended framing:

- clearer first-run path
- cleaner install guidance
- easier report reading
- more concrete examples
- public preview, source-install only

Avoid framing it as:

- a stable release
- an npm package release
- a plugin launch
- a major feature launch
- an official integration with any ecosystem

## Known Follow-ups

- Monitor install friction around Node.js, pnpm, and Corepack.
- Watch for Doctor false positives and false negatives.
- Watch whether users understand trace, replay, eval, and Failure-to-Eval.
- Decide whether the next Runwise loop should be feedback fixes, local JSON rule pack MVP, or a pause for new AI open-source project research.
