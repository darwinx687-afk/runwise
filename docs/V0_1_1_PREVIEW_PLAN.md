# v0.1.1-preview.0 Plan

`v0.1.1-preview.0` is planned as a usability and trust polish preview.

This plan does not create a tag, release, or npm package. It defines what the next small preview should include if approved.

## Release Theme

v0.1.1-preview.0 = usability and trust polish.

The release should make the existing source-install experience easier to trust, easier to try, and easier to explain.

## Proposed Scope

1. README tightening pass.
2. Quick Start friction check on a clean machine or clean environment.
3. Add screenshots or GIF placeholders if real, current assets are available.
4. Add clearer comparison docs:
   - Runwise vs Langfuse
   - Runwise vs Promptfoo
   - Runwise vs Dify / Open WebUI
5. Add Doctor false positive / false negative feedback workflow.
6. Improve GitHub Actions Node.js annotation if safe.
7. Improve package manager and Corepack instructions.
8. Add sample issue links or example issue templates.
9. Add "How to test Runwise on your own AI project" guide.
10. Review whether npm publishing should remain deferred.

## Out Of Scope For v0.1.1

- plugin runtime implementation
- npm publish
- hosted service
- model calls
- real integrations
- database
- login
- PR bot
- telemetry
- non-preview release

## Phase 11G Progress

Completed locally:

- Clean install checklist added.
- Test-on-your-own-project guide added.
- Finding feedback guide added.
- README link structure tightened.
- Docs landing pages now surface install, project-test, feedback, comparison, examples, and report-reading links.
- CLI help reviewed and improved with source-preview, local-only, `--cwd`, and report-output wording.
- GitHub Actions Node.js 20 annotation reviewed and deferred for a later CI/action-version review.

This does not make `v0.1.1-preview.0` released. It only moves the planned usability work forward.

## Review Before Any Tag

Before creating a future `v0.1.1-preview.0` tag:

- confirm `main` is clean
- confirm GitHub Actions is green
- run the full local check stack
- verify `.runwise/` artifacts are ignored and untracked
- update release notes
- confirm no npm publishing claim is present
- confirm plugin support is still described as not implemented unless it has been explicitly approved and implemented

## Suggested Release Notes Shape

```markdown
## v0.1.1-preview.0

This preview focuses on first-time user clarity and trust.

### Planned

- README and Quick Start refinements
- comparison docs
- cleaner source-install guidance
- improved feedback workflow for Doctor findings
- report and example readability refinements

### Still deferred

- npm package publishing
- plugin runtime support
- hosted services
- model calls
- non-preview release
```

## Exit Criteria

- A new visitor can explain what Runwise does after reading the first README screen.
- A developer can run the source-install path without extra guidance.
- The comparison doc answers the most likely "how is this different" questions.
- The project still clearly says public preview, source-install only, no npm package yet, and no plugin runtime support.
