# Feedback Monitoring Playbook

Use this playbook after manually sharing Runwise `v0.1.0-preview.0`.

Runwise feedback intake remains GitHub Issues plus docs-based trackers. Do not add telemetry, analytics, hosted feedback portals, databases, login, or cloud sync.

## Daily Monitoring Routine

1. Check new GitHub Issues.
2. Check replies on manually posted launch links.
3. Add links to `docs/LAUNCH_POSTING_TRACKER.md`.
4. Convert actionable public comments into GitHub Issues when appropriate.
5. Apply type and area labels.
6. Ask for safe minimal reproductions.
7. Record recurring themes for the weekly roadmap review.

## Classify Feedback

- Bug: reproducible incorrect behavior.
- False positive: Doctor reports a problem that should not be a problem.
- False negative: Doctor misses a problem that should be reported.
- Integration request: new or improved local ecosystem detection.
- Docs issue: confusing wording, missing examples, or unclear setup.
- Question: usage clarification or scope question.
- Security-sensitive: potential vulnerability or private-data concern.

## Label Issues

Use current repository labels:

- `type: bug`
- `type: feature`
- `type: integration`
- `type: docs`
- `type: feedback`
- `area: doctor`
- `area: report`
- `area: dashboard`
- `area: github-action`
- `area: trace`
- `area: replay`
- `area: eval`
- `area: ecosystem`
- `area: china-ready`
- `security`
- `question`
- `good first issue`
- `help wanted`

Prefer one type label plus one or two area labels. Add `good first issue` only when the scope is clear and low risk. Add `help wanted` when outside context from real users would help.

## Identify False Positives / False Negatives

For Doctor feedback, capture:

- Rule or finding name.
- Report excerpt, if safely redacted.
- Expected behavior.
- Actual behavior.
- Project type: AI Agent, MCP, RAG, LLM app, or mixed.
- Local signals that caused or should have caused the finding.

Move repeated false positives or false negatives into the weekly review.

## Handle Integration Requests

Ask for:

- Ecosystem name.
- Safe local detection signals.
- Sample file names or sanitized snippets.
- Recommended checks.
- Whether the ecosystem is global, China-ready, both, internal, or private.
- Possible false positive risks.

Do not ask for API keys, private endpoints, customer data, or proprietary traces.

## Handle China-Ready Provider Feedback

Capture provider feedback separately when it involves:

- OpenAI-compatible API base URL patterns.
- DashScope/Qwen, DeepSeek, Moonshot/Kimi, Zhipu/GLM, Minimax, Baichuan, SiliconFlow, Ollama, or other provider signals.
- Documentation needs for provider base URLs, model names, data boundaries, rate limits, and fallback behavior.

Keep examples generic and redacted.

## Handle Security-Sensitive Reports

- Do not request exploit details in public.
- Redirect the reporter to `SECURITY.md`.
- Label public placeholder issues with `security` only if safe.
- Ask for the minimum safe context needed to coordinate disclosure.
- Do not copy private security details into public trackers.

## When To Move Feedback Into Roadmap Review

Move feedback into `docs/FEEDBACK_TO_ROADMAP_REVIEW.md` when:

- The same theme appears more than once.
- A false positive or false negative affects core readiness scoring.
- A requested integration has clear safe local signals.
- Documentation confusion blocks setup.
- Feedback changes the likely next loop.

## When To Say No

Say no or defer when feedback asks for:

- Hosted SaaS or cloud sync.
- Telemetry or analytics.
- Login, billing, or database features.
- Agent runtime orchestration.
- Model calls, model judging, or training.
- npm publishing or stable release claims before the release plan allows them.
- Official integration or partnership claims.
