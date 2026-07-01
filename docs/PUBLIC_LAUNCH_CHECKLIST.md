# Public Launch Checklist

Use this checklist before manually sharing Runwise `v0.1.0-preview.0` in public channels.

## Repository Readiness

- [x] GitHub repository is public.
- [x] GitHub prerelease exists.
- [x] CI is passing on `main`.
- [x] README visual assets were checked.
- [x] Release notes were checked.
- [x] Feedback guide exists.
- [x] Early user testing guide exists.
- [x] Issue templates were checked.
- [x] Repository labels were checked.
- [x] Launch posts are prepared as drafts.

## Boundary Checks

- [x] Do not publish npm yet.
- [x] Do not claim stable release.
- [x] Do not claim official integrations or partnerships.
- [x] Do not claim GitHub Marketplace availability.
- [x] Do not imply hosted SaaS, cloud sync, login, telemetry, or database behavior.
- [x] Keep public messaging source-install only.

## After Manual Launch

- [ ] Monitor issues after launch.
- [ ] Collect Doctor false positives and false negatives.
- [ ] Collect ecosystem detection gaps.
- [ ] Collect trace schema feedback.
- [ ] Collect replay report feedback.
- [ ] Collect Failure-to-Eval feedback.
- [ ] Collect China-ready provider feedback.
- [ ] Track confusing docs or setup friction.

## Known Non-blocking Follow-up

- GitHub Actions reports a Node.js 20 deprecation annotation from referenced actions. CI passes. Review action runtime upgrades before stable release.
