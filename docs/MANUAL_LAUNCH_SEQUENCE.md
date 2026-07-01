# Manual Launch Sequence

This sequence helps the project owner manually share Runwise `v0.1.0-preview.0`, track where it was shared, and route feedback back into GitHub Issues.

Do not automate external posting from this repository. Do not publish npm packages, create a stable release, move tags, add telemetry, or imply hosted SaaS availability.

## Launch Goal

Share Runwise as a public preview for early source-based testing and feedback on local-first AI Agent readiness, trace replay, Failure-to-Eval, and ecosystem compatibility detection.

## Target Audience

- Developers building AI agents, MCP servers, RAG workflows, or LLM applications.
- Maintainers who need readiness evidence before demos, CI gates, or releases.
- AI/LLMOps practitioners evaluating local-first workflows.
- FDEs and enterprise AI builders who need reviewable local reports.
- Developers working with global and China-ready LLM provider patterns.

## Recommended Launch Order

1. GitHub repository final check.
2. Personal LinkedIn / X post.
3. Developer communities.
4. AI/LLMOps communities.
5. China-facing technical communities.
6. Direct sharing to trusted AI builders / FDE / developers.
7. Collect feedback into GitHub Issues.

## Where To Post First

- Personal LinkedIn or X account, if you already have relevant technical followers.
- Trusted developer groups where feedback is likely to be specific and constructive.
- GitHub repository discussions through issues, not a hosted feedback system.

Avoid broad, repetitive posting. Prefer a few high-signal channels and thoughtful replies.

## What Not To Claim

- Do not claim npm availability.
- Do not claim a stable release.
- Do not claim GitHub Marketplace availability.
- Do not claim official ecosystem integrations or partnerships.
- Do not claim hosted SaaS, cloud sync, telemetry, login, database, or agent runtime behavior.
- Do not imply Runwise replaces full observability, evaluation, or agent framework platforms.

## How To Adapt By Platform

- LinkedIn: emphasize team workflow, local evidence, and early feedback.
- X: keep it short; link the release and name the feedback areas.
- Hacker News: explain what is built, what is not included, and why local-first matters.
- Reddit: ask specific workflow questions and avoid marketing language.
- Dev.to: use a short technical walkthrough and source-install commands.
- Direct sharing: ask one or two specific questions based on the recipient's work.

## Track Posted Links

Use `docs/LAUNCH_POSTING_TRACKER.md` for every manual post. Record:

- Platform.
- Post type.
- Link.
- Date.
- Audience.
- Initial reaction.
- Feedback themes.
- Follow-up needed.
- Related issue links.

Do not add analytics scripts, tracking pixels, telemetry, or hosted feedback forms.

## Responding To Early Feedback

- Thank people quickly.
- Ask for safe minimal repros.
- Move actionable reports into GitHub Issues.
- Apply labels consistently.
- Keep security-sensitive details out of public issues.
- Say no clearly when feedback is out of scope.

Use `docs/ISSUE_RESPONSE_TEMPLATES.md` for consistent responses.

## First 24 Hours

- Check GitHub Issues and notifications at least twice.
- Record all public links in the posting tracker.
- Triage bugs, false positives, false negatives, and integration requests.
- Add labels for area and type.
- Watch for wording that suggests npm, hosted SaaS, stable release, or official integrations and correct it.
- Capture recurring questions for the feedback-to-roadmap review.

## First 7 Days

- Review feedback themes daily.
- Identify top false positives and false negatives.
- Identify most requested integrations.
- Note confusing docs and setup friction.
- Summarize China-ready provider feedback separately.
- Convert validated feedback into GitHub Issues.
- Use `docs/FEEDBACK_TO_ROADMAP_REVIEW.md` for the weekly review.
