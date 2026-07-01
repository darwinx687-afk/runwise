# Finding Feedback Guide

Use this guide when a Runwise Doctor finding looks wrong or incomplete.

Runwise is in public preview. Good false positive and false negative reports are one of the most useful ways to improve it.

## What Is A False Positive?

A false positive means Runwise reports a finding that should not apply to your project.

Example:

- Runwise says eval coverage is missing, but your project stores evals in a folder Runwise does not recognize yet.

## What Is A False Negative?

A false negative means Runwise misses something you expected it to detect.

Example:

- Your project has MCP config in a non-standard file, but Runwise does not detect MCP usage.

## What To Include

Include:

- project type
- finding ID, if one was produced
- expected result
- actual result
- relevant file pattern or folder name
- whether the project uses MCP, RAG, browser agents, OpenAI-compatible APIs, or China-ready providers
- whether the issue is about Doctor, report output, trace validation, replay, eval generation, or ecosystem detection

Do not include:

- API keys
- tokens
- private customer data
- private URLs
- proprietary prompts
- full private traces
- secrets from `.env`

## Likely Labels

These labels may be useful when creating a future GitHub issue:

- `type:feedback`
- `type:bug`
- `type:docs`
- `area:doctor`
- `area:integrations`
- `area:trace`
- `area:eval`
- `priority:triage`

## Sample Issue Format

```markdown
## Project type

MCP / RAG / agent workflow / browser agent / China-ready LLM / other

## Finding ID

...

## Expected result

...

## Actual result

...

## Why it matters

...

## Safe context

File or folder pattern:

Redacted snippet, if safe:

Do not paste secrets. Redact tokens, API keys, private URLs, and customer data.
```

## Good Feedback Is Small

The best feedback is usually a small, redacted fixture:

- a file name
- a folder shape
- a package name
- a sanitized config key
- the exact finding ID

That is enough to help improve the rule without exposing private project data.
