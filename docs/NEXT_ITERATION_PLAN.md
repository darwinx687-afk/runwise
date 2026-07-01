# Next Iteration Plan

This plan prepares the next Runwise preview iteration after `v0.1.0-preview.0`.

It is a planning note, not a release announcement. Do not publish npm packages, create tags, create releases, or change `ROADMAP.md` from this file alone.

## Positioning

Runwise helps you check AI agent projects before they go live.

It should feel like a local developer tool: run a check, read the report, review a trace, replay what happened, and turn failures into eval case files.

## Goal For The Next Preview

Make Runwise easier to try, easier to explain, and easier to trust from the first five minutes.

## Planned Work

- Improve first-run guidance in README and docs.
- Make Doctor findings easier to understand.
- Review early feedback for noisy or missing checks.
- Add clearer report examples without adding hosted services.
- Keep trace replay and Failure-to-Eval examples practical and small.
- Review package metadata before any future npm publishing decision.

## Feedback Inputs

- GitHub Issues.
- Public launch post comments where available.
- `docs/LAUNCH_POSTING_TRACKER.md`.
- `docs/FEEDBACK_TO_ROADMAP_REVIEW.md`.
- Safe, redacted examples from early users.

## Candidate Loops

| Loop | Focus | Output |
| --- | --- | --- |
| Phase 11B | First-run clarity | README/docs cleanup, command walkthrough, clearer source-install notes |
| Phase 11C | Doctor usefulness review | Draft list of noisy findings, missing checks, and scoring tweaks |
| Phase 11D | Report and replay examples | Better example outputs and screenshots or static artifacts where useful |
| Phase 11E | Package metadata review | npm-readiness checklist only, no publishing |

## Non-Goals

- No npm publishing in this plan.
- No new release or tag.
- No hosted dashboard, cloud sync, login, billing, or database.
- No telemetry or analytics.
- No agent runtime orchestration.
- No hidden model calls, model judging, or eval execution.
- No official integration or partnership claims.

## Success Criteria

- A new visitor can understand Runwise in one or two minutes.
- A developer can run the local source install path without guessing the next command.
- Doctor, trace replay, and Failure-to-Eval each have a plain-language explanation.
- Feedback can be sorted into docs fixes, Doctor rule fixes, integration signals, or deferred non-goals.
- Any future package or release step has a checklist before it happens.
