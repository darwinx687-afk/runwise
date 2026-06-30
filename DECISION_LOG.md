# Decision Log

## D001: Use pnpm workspaces

Runwise starts as a pnpm monorepo so packages, apps, examples, and docs can evolve together while keeping package boundaries explicit.

## D002: Use TypeScript-first package shells

All runtime package entrypoints are TypeScript files in Phase 0. This keeps contracts typed before real scanning logic is introduced.

## D003: Keep Phase 0 free of hosted product behavior

Phase 0 does not include login, cloud services, billing, databases, or complex dashboard behavior. These are outside the foundation loop.
