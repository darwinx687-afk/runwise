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
- Do not add login, cloud, billing, database, or complex dashboard logic during Phase 0.
- Keep package boundaries typed and explicit.
- Update both README files when public-facing documentation changes.

## CLI Development

```bash
pnpm --filter @runwise/cli dev
pnpm exec runwise doctor
```
