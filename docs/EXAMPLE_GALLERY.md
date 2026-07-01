# Example Gallery

Runwise examples are small local fixtures. They help you see what Doctor, trace validation, replay, and Failure-to-Eval can notice without installing real AI frameworks or calling external APIs.

Generated output goes under `.runwise/`, which is ignored by git.

## MCP demo

This example shows a lightweight MCP-style project with an MCP config and tool approval notes.

Try:

```bash
pnpm exec runwise doctor --cwd examples/mcp-demo --output .runwise/examples/mcp-demo
```

What Runwise can detect:

- MCP config signals
- high-risk tool documentation
- approval policy hints

Look for:

- whether the report surfaces MCP usage clearly
- whether tool-risk findings are useful rather than noisy
- whether approval guidance is visible enough for a reviewer

Why it is useful:

MCP projects often need a clear review of tools, approvals, and risk boundaries before they are shared with a team.

## RAG demo

This example represents a small retrieval-style project with prompt, trace, and eval placeholders.

Try:

```bash
pnpm exec runwise doctor --cwd examples/rag-demo --output .runwise/examples/rag-demo
```

What Runwise can detect:

- RAG project signals
- trace and eval placeholders
- documentation hints for grounded-answer workflows

Look for:

- whether retrieval-related project files are detected
- whether trace and eval coverage appear in the report
- whether the findings make the next review step obvious

Why it is useful:

RAG work is easier to review when retrieval evidence, trace records, and eval cases are visible before shipping.

## Browser agent demo

This example represents browser-agent style project signals without running a browser automation framework.

Try:

```bash
pnpm exec runwise doctor --cwd examples/browser-agent-demo --output .runwise/examples/browser-agent-demo
```

What Runwise can detect:

- browser agent compatibility notes
- browser-use style package signals
- tool-risk and review documentation hints

Look for:

- whether browser automation risk is visible in the report
- whether the project explains approval and review boundaries
- whether a reviewer can tell this is a fixture, not a live browser agent

Why it is useful:

Browser agents can touch real accounts, forms, and websites, so reviewers need clear local evidence before any live run.

## Enterprise workflow demo

This example represents Dify-style workflow platform signals and workflow documentation.

Try:

```bash
pnpm exec runwise doctor --cwd examples/enterprise-workflow-demo --output .runwise/examples/enterprise-workflow-demo
```

What Runwise can detect:

- workflow platform hints
- configuration placeholders
- review and handoff documentation signals

Look for:

- whether workflow-style files are detected
- whether deployment or handoff assumptions are visible
- whether findings help a team review the project before sharing it

Why it is useful:

Workflow projects often need clear readiness notes for teams and clients, even when the demo already runs.

## China-ready LLM demo

This example shows OpenAI-compatible API and China-ready LLM provider placeholders.

Try:

```bash
pnpm exec runwise doctor --cwd examples/china-ready-llm-demo --output .runwise/examples/china-ready-llm-demo
```

What Runwise can detect:

- `OPENAI_BASE_URL` style configuration
- OpenAI-compatible API hints
- provider placeholders such as DashScope/Qwen, DeepSeek, Moonshot/Kimi, Zhipu/GLM, Minimax, Baichuan, and SiliconFlow

Look for:

- whether provider signals appear clearly
- whether the report asks for data boundary and fallback documentation
- whether missing deployment assumptions are easy to spot

Why it is useful:

Many teams need global and China-ready deployment notes before a project can be reviewed seriously.

## Codex project demo

This example represents coding-agent project instruction files and editor-agent hints.

Try:

```bash
pnpm exec runwise doctor --cwd examples/codex-project-demo --output .runwise/examples/codex-project-demo
```

What Runwise can detect:

- `AGENTS.md` and `CLAUDE.md` style instruction files
- Cursor and Windsurf rule files
- local review and governance signals

Look for:

- whether coding-agent instructions are detected
- whether local review expectations are visible
- whether the report distinguishes project guidance from runtime behavior

Why it is useful:

Coding-agent projects benefit from visible instructions, guardrails, and local review artifacts before contributors start using them.

## Trace fixtures

The trace fixtures show valid, invalid, risky, and error-oriented `runwise.agent_trace` files.

Try:

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

What Runwise can detect:

- trace schema problems
- MCP/tool risk signals
- approvals, errors, and failure notes
- eval case fields generated from a reviewed failure

Look for:

- whether validation errors are understandable
- whether replay explains the run without re-running it
- whether generated eval case drafts are reviewable

Why it is useful:

Trace files turn one run into evidence that can be checked, replayed, and converted into future eval cases.
