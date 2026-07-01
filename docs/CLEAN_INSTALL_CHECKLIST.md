# Clean Install Checklist

Runwise is currently source-install only. It is not published to npm yet.

Use this checklist when you want to try Runwise from a fresh clone.

## Prerequisites

- Node.js 20 or newer.
- pnpm using the version declared in `package.json`.
- Git.

## Recommended Setup

Use Corepack or the repo-declared pnpm version.

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

Alternative if `corepack` is not available or you do not want to change your global pnpm:

```bash
npx -y pnpm@9.15.4 install --frozen-lockfile
```

## Install And Verify

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
```

## Success Looks Like

- `check` passes.
- `test` passes.
- `runwise doctor` creates `.runwise/`.
- `.runwise/runwise-report.json` exists.
- `.runwise/runwise-report.md` exists.
- `.runwise/runwise-report.html` exists.
- `.runwise/` remains ignored by git.

You can confirm the generated files are ignored:

```bash
git check-ignore -v .runwise/runwise-report.json .runwise/runwise-report.md .runwise/runwise-report.html .runwise
git ls-files .runwise
```

`git ls-files .runwise` should print nothing.

## Common Issues

### Global pnpm behaves differently

Use the repo-declared version directly:

```bash
npx -y pnpm@9.15.4 check
```

### `corepack` is not available

Skip the Corepack setup and use the repo-declared pnpm version through `npx`:

```bash
npx -y pnpm@9.15.4 install --frozen-lockfile
```

### Newer pnpm asks about build approvals

Use the repo-declared pnpm version first. If you still see package-manager behavior you do not understand, stop and check the generated message before approving anything.

### Workspace packages are missing

Run install again from the repository root:

```bash
npx -y pnpm@9.15.4 install --frozen-lockfile
```

### You tried `npm install -g runwise`

That is not supported yet. Runwise is source-install only in the current public preview.

## What Not To Do Yet

- Do not publish npm packages.
- Do not create release tags.
- Do not commit `.runwise/` generated reports.
- Do not paste secrets or private customer traces into public issues.
- Do not expect plugin support; plugin support is not implemented yet.
