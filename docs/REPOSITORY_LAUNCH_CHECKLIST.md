# Repository Launch Checklist

- [x] Create GitHub repository.
- [x] Confirm repository name.
- [x] Confirm remote repository URL.
- [x] Confirm repository URL placeholders were replaced where appropriate.
- [x] Confirm MIT license.
- [x] Confirm security policy.
- [x] Confirm README links.
- [x] Confirm README banner and visual assets render on GitHub.
- [x] Run `pnpm check`.
- [x] Run `pnpm check:types`.
- [x] Run `pnpm test`.
- [x] Run `pnpm exec runwise doctor`.
- [x] Run `pnpm exec runwise trace validate examples/traces/valid-agent-run.json`.
- [x] Run `pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json`.
- [x] Run `pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json`.
- [x] Confirm `.runwise/` is ignored.
- [x] Push initial branch after the confirmed remote URL is added.
- [x] Confirm GitHub Actions start after the first push.
- [x] Confirm GitHub Actions passes.
- [x] Confirm `action.yml` is visible at the repository root.
- [x] Confirm issue templates and PR template appear in GitHub.
- [x] Confirm repository description is set.
- [x] Confirm repository topics are set.
- [x] Confirm `.runwise/` was not pushed.
- [x] First preview tag exists.
- [x] GitHub prerelease created.
- [x] Release body corrected after creation.
- [x] Final release notes file added.
- [x] Launch sharing pack added.
- [x] Defer npm publishing until package metadata is reviewed.
- [x] GitHub Marketplace release deferred.
- [x] Node.js 20 annotation remains non-blocking.

## Known Non-blocking Follow-up

- GitHub Actions reports a Node.js 20 deprecation annotation from referenced actions, but CI passes. Review action runtime upgrades before stable release.
