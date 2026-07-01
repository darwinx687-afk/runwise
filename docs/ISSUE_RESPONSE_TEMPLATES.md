# Issue Response Templates

Use these as starting points for GitHub Issue replies. Adjust them to the specific issue and keep all security-sensitive details out of public comments.

## Bug Report Acknowledged

Thanks for the clear report. I will try to reproduce this with the command and environment you shared.

Could you also confirm the Runwise commit or release tag, and whether a small redacted `.runwise` report excerpt can be shared safely? Please avoid secrets, private customer data, or proprietary traces.

## False Positive Report

Thanks, this looks like a possible Doctor false positive.

To review it properly, could you share the rule or finding name, the expected behavior, and the local signal that should make this case acceptable? A small redacted report excerpt is helpful if safe.

## False Negative Report

Thanks, this sounds like a possible Doctor false negative.

Could you share the local file names, package names, config names, or safe snippets that should have triggered a finding? Please keep examples minimal and redacted.

## Integration Request

Thanks for the integration request. This fits the local ecosystem compatibility area.

Could you provide the ecosystem name, safe local detection signals, recommended checks, and whether this is a global, China-ready, both, internal, or private ecosystem? Please do not include API keys, private endpoints, customer data, or proprietary traces.

## China-Ready Provider Detection Request

Thanks for the China-ready provider feedback.

Could you share generic, redacted local signals such as environment variable names, docs strings, package names, or config file names? It is also useful to know whether the provider pattern is OpenAI-compatible and which deployment notes should be checked, such as base URL, model name, data boundary, rate limit, or fallback behavior.

## Trace Schema Feedback

Thanks for the trace schema feedback.

Could you describe the event shape that is hard to represent today? A small sanitized JSON example is welcome if safe, but a plain-language event description is enough.

## Failure-to-Eval Feedback

Thanks for reviewing the Failure-to-Eval output.

Could you share which part is most or least useful: expected behavior, prohibited behavior, assertions, risk tags, JSON, YAML, or Markdown? If this came from a trace, please keep any trace details redacted.

## Security-Sensitive Report Redirection

Thanks for flagging this. Please do not share exploit details, secrets, private customer data, or proprietary traces in this public issue.

Please follow `SECURITY.md` and share only the minimum safe context needed to coordinate disclosure.

## Not In Scope

Thanks for the suggestion. This is outside the current Runwise preview scope.

Runwise is currently local-first and source-install only. Hosted SaaS, cloud sync, telemetry, login, billing, databases, agent runtime orchestration, model calls, npm publishing, stable release claims, and official integration claims remain out of scope for this phase.

I will leave this closed or deferred unless the project scope changes in a future loop.

## Thank You

Thanks for testing Runwise and sharing this feedback. It helps prioritize the next local-first improvements without adding hosted infrastructure or hidden runtime behavior.
