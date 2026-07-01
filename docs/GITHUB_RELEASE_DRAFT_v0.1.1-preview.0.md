# Runwise v0.1.1-preview.0

This preview focuses on first-time developer experience, report readability, and release trust.

Runwise is still source-install only. It is not published to npm yet.

## What Changed

### Easier First Run

- Clean install checklist
- First-run walkthrough
- Test-on-your-project guide
- Clearer pnpm/Corepack guidance
- Clean-machine install review notes

### Better Examples

- Example Gallery
- Visual example cards
- Curated Doctor, Trace Replay, Failure-to-Eval, and ecosystem detection samples

### Better Reports

- Improved static HTML report hierarchy
- Improved Markdown report readability
- Improved local dashboard readability
- Report reading guide

### Clearer Positioning

- Simpler README opening
- Comparison docs
- Less buzzword-heavy GitHub presentation
- Clearer public-preview and source-install boundaries

### Future Architecture

- Plugin architecture exploration
- Draft plugin manifest and rule-pack docs
- Documentation-only plugin examples

Plugin support is not implemented yet. These docs explore a possible future direction.

## Verified

- Clean clone install passed
- `runwise doctor` passed
- local viewer smoke test passed
- trace validate / replay / eval generate passed
- GitHub Actions passed
- `.runwise/` generated outputs remain ignored and untracked

## Still Not Included

- npm package
- plugin runtime
- hosted service
- telemetry
- database
- login
- GitHub Marketplace listing
- stable release guarantee

## Try From Source

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
```
