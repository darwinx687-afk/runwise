# Comparison

Runwise is designed as a local pre-ship review layer. It helps you inspect an AI agent-style project, generate reports, validate traces, replay runs, and turn failures into eval cases before you adopt heavier observability or eval platforms.

This page is not a ranking. Langfuse, Promptfoo, Dify, and Open WebUI solve different problems and can be useful alongside Runwise.

## Quick Summary

| Tool | Strong fit | How Runwise differs |
| --- | --- | --- |
| Runwise | Local readiness review before shipping an AI agent-style project. | Runs from source today, checks local project evidence, generates reports, validates traces, replays runs, and drafts eval cases. |
| Langfuse | LLM observability, tracing, prompt management, evaluation, and experiment workflows. | Runwise is earlier and lighter: it reviews local project readiness before you instrument or operate a full observability workflow. |
| Promptfoo | LLM evaluation, red teaming, prompt/model comparison, and CI eval workflows. | Runwise is not an eval runner today. It can turn failure traces into eval case drafts and help decide what should become a future eval. |
| Dify / Open WebUI | Building, running, managing, or self-hosting AI apps and model interfaces. | Runwise does not run apps, host agents, or provide a chat/model UI. It reviews local project evidence around the app or agent you are building. |

## Runwise vs Langfuse

Langfuse is an open-source AI engineering and observability platform for tracing, debugging, analyzing, and iterating on LLM applications. It can support prompt management, datasets, evaluations, and observability workflows.

Runwise focuses on a smaller pre-ship moment:

- check the local project
- generate readiness reports
- validate local trace files
- replay a run statically
- turn reviewed failures into eval case drafts

Use Runwise before or alongside Langfuse when you need a local review artifact before adding instrumentation, dashboards, or a longer observability workflow.

## Runwise vs Promptfoo

Promptfoo is an open-source CLI and library for evaluating and red-teaming LLM apps. It is useful when you want structured evals, model comparisons, prompt tests, or red-team checks.

Runwise is not trying to replace that. Today it does not execute evals or call models.

Runwise is useful when you want to:

- inspect whether a project has basic readiness evidence
- validate whether a trace file is well formed
- replay a run without re-running the agent
- draft an eval case from a failure that should become a regression check

Promptfoo may be a good later step once you know which failures or behaviors should become executable evals.

## Runwise vs Dify / Open WebUI

Dify is an LLM app development platform for workflows, RAG pipelines, agents, model management, and related app-building flows.

Open WebUI is a self-hosted AI interface that can work with local and cloud model providers.

Runwise is not an app builder, workflow builder, model UI, or hosted control plane. It does not run your agent or call your model.

Use Runwise when you already have an AI app, agent, MCP server, RAG project, or workflow project and want a local check before review or handoff.

## When To Use Runwise

Use Runwise when:

- your demo works, but you need review evidence before sharing it
- you want a local report without uploading project data
- you need to check traces, replay a run, or draft eval cases
- you want to surface MCP, RAG, browser-agent, or provider configuration signals
- you need something small enough to run in CI as a readiness gate

## When Not To Use Runwise

Do not use Runwise as:

- a hosted observability platform
- a prompt or model eval runner
- a workflow builder
- a chat interface
- an agent runtime
- a replacement for security review
- a package you can install from npm today
- a plugin runtime, because plugin support is not implemented yet

## References

- [Langfuse documentation](https://langfuse.com/docs)
- [Promptfoo documentation](https://www.promptfoo.dev/docs/intro/)
- [Dify website](https://dify.ai/)
- [Open WebUI documentation](https://docs.openwebui.com/)
