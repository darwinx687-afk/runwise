# Test Runwise On Your Own Project

Runwise runs locally and does not upload your project data.

The current public preview runs from source. There is no npm package yet.

## Option A: Run From The Runwise Repo Against An Example

Start here if you want to see expected behavior first.

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise/examples/mcp-demo
```

Then open the generated report:

```text
.runwise/examples/mcp-demo/runwise-report.md
.runwise/examples/mcp-demo/runwise-report.html
```

## Option B: Run Against Your Own Project

From the Runwise repository, point Doctor at your project:

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd /path/to/your-ai-project --output .runwise
```

This writes reports inside your project:

```text
/path/to/your-ai-project/.runwise/runwise-report.json
/path/to/your-ai-project/.runwise/runwise-report.md
/path/to/your-ai-project/.runwise/runwise-report.html
```

If your shell path has spaces, quote it:

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd "/path/to/your AI project" --output .runwise
```

## What To Check First

1. Overall score.
2. Blocking, critical, and high findings.
3. What to fix first.
4. Detected ecosystems.
5. Report files.

## If A Finding Looks Wrong

A false positive means Runwise reports a problem that is not actually a problem for your project.

A false negative means Runwise misses a problem or signal you expected it to detect.

Record:

- project type
- finding ID
- expected result
- actual result
- relevant file pattern
- whether the project uses MCP, RAG, browser agents, OpenAI-compatible APIs, or China-ready providers

Do not share secrets, API keys, private URLs, customer data, proprietary prompts, or private trace contents.

For a full template, see the [Finding Feedback Guide](./FINDING_FEEDBACK_GUIDE.md).

## Safe Sharing

When asking for help, share only redacted context:

- file names or folder names
- package names
- generated finding IDs
- sanitized snippets
- whether the report was generated from an example or your own project

Generated `.runwise/` reports stay local and are ignored by git by default.
