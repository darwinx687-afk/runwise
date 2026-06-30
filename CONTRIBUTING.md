# Contributing

Thank you for considering a contribution to Runwise.

## Local Setup

```bash
pnpm install
pnpm check
pnpm test
```

## Development Boundaries

- Keep changes aligned to the current phase in `RUN_STATE.md`.
- Do not add login, cloud, billing, database, hosted dashboard, or agent runtime behavior unless a future phase explicitly allows it.
- Keep package boundaries typed and explicit.
- Update both README files when public-facing documentation changes.
- Keep `.runwise/` generated artifacts untracked.

## CLI Development

```bash
pnpm --filter @runwise/cli dev
pnpm exec runwise doctor
```
