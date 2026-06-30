# Decision Log

## D001: Use pnpm workspaces

Runwise starts as a pnpm monorepo so packages, apps, examples, and docs can evolve together while keeping package boundaries explicit.

## D002: Use TypeScript-first package shells

All runtime package entrypoints are TypeScript files in Phase 0. This keeps contracts typed before real scanning logic is introduced.

## D003: Keep Phase 0 free of hosted product behavior

Phase 0 does not include login, cloud services, billing, databases, or complex dashboard behavior. These are outside the foundation loop.

## D004: Use static HTML as the bridge report artifact

The static HTML report is the local-first bridge between CLI-generated evidence and the future Dashboard. It must remain self-contained, dependency-free, and openable without a dev server.

## D005: Use deterministic workspace check before root-wide TypeScript compilation

Until the TypeScript workspace strategy is revisited, the root quality gate uses `scripts/check-workspace.mjs` plus explicit package-level check scripts instead of relying on root-wide `tsc --noEmit`. The deterministic gate validates workspace shape, governance files, package entry files, package JSON parsing, TypeScript syntax/transpile health, and untracked `.runwise/` generated reports.

## D006: Keep the first Dashboard Viewer local and report-file based

The first Dashboard Viewer is a local HTTP viewer for `.runwise/runwise-report.json`, not a hosted app or dashboard backend. It must avoid login, cloud sync, databases, external API calls, and SaaS assumptions while keeping the static HTML report as a separate shareable artifact.
