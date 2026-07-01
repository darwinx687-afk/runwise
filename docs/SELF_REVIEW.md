# Self-review

This review looks at Runwise from the perspective of a first-time GitHub visitor after Phase 11A-11E.

Runwise helps you check AI agent projects before they go live. It runs locally, reviews project setup, generates reports, validates traces, replays runs, and turns failures into eval cases.

## Current Strengths

- The local-first positioning is clear: Runwise does not upload project data, call models, require login, or depend on a hosted service.
- The first 5-minute flow is visible in the README and shows exactly what commands to run from source.
- The core chain is coherent: Doctor, report, view, trace validation, static replay, and Failure-to-Eval.
- The GitHub Action exists and uses the same local report artifacts as the CLI.
- English and Simplified Chinese docs are mirrored across the main surfaces.
- The Example Gallery explains what each fixture represents and what to look for.
- Visual report polish makes the HTML report and local viewer easier to scan.
- Plugin architecture exploration is documented without implying plugin support exists.
- A public prerelease exists at `v0.1.0-preview.0`.

## Current Weaknesses

- Runwise is still source-install only, which adds friction for people who expect `npm install`.
- There is no npm package yet.
- The README is clearer than before, but still long for a first visit.
- The examples are curated fixtures, not real-world user examples yet.
- There is little external feedback captured so far.
- Plugin docs exist, but runtime plugin support is not implemented.
- The GitHub Actions Node.js 20 annotation remains even though CI passes.
- Some users may not understand trace, replay, eval, or Failure-to-Eval terminology yet.
- There are SVG previews and sample docs, but no real browser screenshots or GIF walkthrough yet.
- Public URLs were not captured for Xiaohongshu and LinkedIn launch posts.

## First-time User Risks

Visitors may leave if:

- install friction feels too high
- there are too many docs before they know which command to run
- they expect an npm package and do not notice source-install guidance
- they do not understand how Runwise differs from Langfuse, Promptfoo, Dify, or Open WebUI
- they are unsure whether Runwise works on their own project
- Node.js, pnpm, or Corepack version guidance feels unclear
- trace and eval terms feel too abstract before they see output
- the project looks more mature than it is, then they discover preview boundaries later

## What v0.1.1 Should Fix First

v0.1.1-preview.0 should focus on usability and trust polish, not feature expansion.

Priorities:

1. Tighten README scanning without removing important public-preview boundaries.
2. Check the source-install flow on a clean machine or clean environment.
3. Add a clearer comparison page and link it from README.
4. Improve package manager and Corepack guidance.
5. Add a guide for testing Runwise on a user's own AI project.
6. Add a simple feedback workflow for Doctor false positives and false negatives.
7. Investigate the GitHub Actions Node.js 20 annotation if it can be fixed safely.
8. Add screenshots or GIF placeholders only if they are real and easy to keep current.
9. Keep plugin implementation deferred until after self-review and explicit approval.
10. Keep npm publishing deferred until package metadata and install experience are reviewed.

## Release Readiness Questions

- Can a new visitor run the source-install path without guessing?
- Does the README make the first command obvious enough?
- Are the generated reports understandable without reading the whole docs folder?
- Are trace and eval examples clear enough for someone new to those terms?
- Are public-preview limits repeated where they matter?
- Does the comparison doc reduce confusion instead of creating rivalry?
- Is CI green on `main` before any future tag?
- Are generated `.runwise/` artifacts still ignored and untracked?
