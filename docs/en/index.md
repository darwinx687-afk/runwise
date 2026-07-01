# Runwise Documentation

Runwise helps you check AI agent projects before they go live.

It runs locally, generates reports, validates traces, replays runs, and turns failures into eval cases. The current preview is source-install only and does not upload project data.

## Start Here

- [First Run Walkthrough](../FIRST_RUN_WALKTHROUGH.md)
- [Example Gallery](../EXAMPLE_GALLERY.md)
- [Quick Start](./quick-start.md)
- [Command Reference](./commands.md)
- [GitHub Action](./github-action.md)
- [Trace Schema](./trace-schema.md)
- [Failure-to-Eval](./failure-to-eval.md)
- [Ecosystem Compatibility](./ecosystem-compatibility.md)
- [Feedback Guide](../FEEDBACK_GUIDE.md)

## Good First Flow

1. Run `pnpm exec runwise doctor`.
2. Open the generated Markdown or HTML report.
3. Start the local viewer with `pnpm exec runwise view`.
4. Validate a trace fixture.
5. Replay the risky trace fixture.
6. Generate an eval case draft.

## Current Boundaries

Runwise works from source today. It is not a hosted service, database, login system, cloud sync tool, model runtime, agent framework, npm release, or marketplace listing.
