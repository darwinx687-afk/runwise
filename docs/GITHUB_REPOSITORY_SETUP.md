# GitHub Repository Setup

This document prepares the public repository setup for Runwise. It does not require a remote to exist yet and should not be treated as a push instruction until the final repository URL is confirmed.

## Loop 10A Status

- No remote URL was provided in Loop 10A.
- Do not run `git remote add` or `git push` until the GitHub repository exists and the URL is confirmed.
- Keep source installation as the current distribution path.
- Defer npm publishing, GitHub Marketplace claims, and release tags until after the public repository renders correctly and CI passes.

## Recommended Repository Metadata

- Repository name: `runwise`
- Visibility: public
- Description: `Local-first readiness, trace replay, and eval generation toolkit for AI agents, MCP servers, RAG, and LLM apps.`
- Default branch: `main`
- License: MIT

## Suggested Topics

```text
ai-agents
agentops
mcp
llmops
rag
evals
trace
developer-tools
github-action
local-first
typescript
bilingual
```

## Repository Creation Checklist

- Create a new GitHub repository named `runwise`.
- Do not initialize the GitHub repository with a README, license, or `.gitignore`; these files already exist locally.
- Confirm the repository URL with the maintainer before adding `origin`.
- Confirm the default branch is `main` after the first push.
- Keep `.runwise/` generated reports ignored and reproducible.

## GitHub Actions

The repository includes `.github/workflows/runwise.yml` and a local composite action at `action.yml`.

Current usage is local to this repository:

```yaml
- uses: ./
```

Public versioned usage is future work and requires a release tag:

```yaml
# Future only, after a public release tag exists:
- uses: <owner>/<repo>@v0
```

Do not claim GitHub Marketplace availability before a marketplace listing exists.

## Later Release Steps

After the first public push:

- Verify README rendering and SVG assets.
- Verify GitHub Actions run successfully.
- Review package metadata before any npm publishing.
- Create the first tag only after release review.
- Replace repository URL placeholders where appropriate, while keeping future-version examples clearly marked as future-only.
