# Next Iteration Plan

## Positioning

Runwise helps you check AI agent projects before they go live.

It runs locally, reviews project setup, generates reports, validates traces, replays runs, and turns failures into eval cases.

## Goal For The Next Preview

Make Runwise easier to understand, try, and review from source before adding larger product capabilities.

The next iteration should keep the product local-first, source-install friendly, and honest about public preview status.

## Phase 11 Structure

### 11B - First 5-Minute Experience

Status: completed in this loop.

Focus:

- clearer README first impression
- 5-minute source-install flow
- first-run walkthrough
- example gallery
- simple visual explanation
- docs landing page cleanup

### 11C - Example Gallery Polish and Visual Report Samples

Status: completed in this loop.

Focus:

- add SVG example cards for MCP, RAG, replay, eval, and ecosystem detection
- add curated demo-output samples for Doctor reports, trace replay, Failure-to-Eval, and ecosystem detection
- improve example descriptions with commands, what to look for, and related sample outputs
- keep examples lightweight, local, and separate from generated `.runwise/` artifacts

### 11D - Visual Report Polish

Status: completed in this loop.

Focus:

- improve Markdown and HTML report readability
- make findings easier to scan
- clarify score, severity, blocking, and ecosystem sections
- add a report preview SVG and report reading guide
- improve report empty states
- improve category score explanation
- avoid adding hosted dashboard or complex product surface

### 11E - Plugin Architecture Exploration

Status: completed in this loop.

Focus:

- draft plugin goals and non-goals
- draft a plugin manifest
- draft a JSON rule pack format
- add documentation-only plugin examples
- decide whether implementation should happen in Phase 12
- do not add runtime plugin execution

### 11F - Self-review and v0.1.1-preview.0 Planning

Status: completed in this loop.

Focus:

- review Phase 11 docs and examples as a whole
- check whether plugin implementation should wait or move into Phase 12
- prepare a small v0.1.1-preview.0 plan if useful
- keep npm publishing, tags, and new releases deferred unless explicitly approved

### 11G - First v0.1.1 Usability Fixes

Status: completed in this loop.

Focus:

- tighten README scanning path
- improve source-install and Corepack guidance
- add "test Runwise on your own AI project" guidance
- improve Doctor feedback workflow
- avoid runtime plugin implementation

### 11H - Clean-machine Install Review

Status: completed in this loop.

Focus:

- test source install from a clean environment
- document common install friction
- verify report generation and local viewer behavior
- keep npm publishing deferred unless explicitly approved

### 11I - v0.1.1 Release Candidate

Status: completed in this loop.

Focus:

- prepare release notes only after usability fixes land
- run full local and GitHub checks
- verify `.runwise/` artifacts remain ignored
- create no tag until a release candidate loop is explicitly approved

### 11J - Approve and Create v0.1.1-preview.0 Tag

Status: completed in this loop.

Focus:

- require explicit user approval before tag creation
- run final status and check commands
- create and push `v0.1.1-preview.0` only if approved
- do not create a GitHub Release unless the next loop explicitly includes it

### 11K - Create GitHub Prerelease v0.1.1-preview.0

Status: completed in this loop.

Focus:

- create the GitHub prerelease from the existing tag
- verify prerelease, not draft, and not latest status
- keep npm publishing and Marketplace publishing deferred
- record the release in docs

### 11L - Post-release Verification and v0.1.1 Sharing Pack

Status: completed in this loop.

Focus:

- verify the published prerelease after creation
- update README release links where needed
- prepare lightweight English and Chinese sharing copy
- prepare feedback monitoring guidance
- do not post externally
- frame v0.1.1 as first-time developer experience polish, not a major feature launch

## Next Options

Choose one:

- Phase 11M - Monitor v0.1.1 Feedback and Small Follow-up Fixes
- Phase 12A - Local JSON Rule Pack MVP
- New Project Research - Next AI Open-source Direction

Plugin runtime remains future work and should only move forward after explicit approval.

## Feedback Inputs

- GitHub Issues and Discussions if users open them.
- Public launch post comments when visible.
- Manual feedback from people trying source install.
- Local findings from running Runwise against example projects.
- v0.1.1 sharing and feedback monitoring docs.

## Non-Goals

- npm publishing.
- GitHub Marketplace publishing.
- hosted services, login, billing, database, or cloud sync.
- agent runtime orchestration.
- model calls, model judging, or eval execution.
- official ecosystem partnership claims.

## Success Criteria

- A new visitor can understand what Runwise does in the first screen of the README.
- A developer can run the source-install flow and see a report in about 5 minutes.
- Examples explain what to look for, not just where files live.
- Report and replay feedback can be turned into small, concrete follow-up tasks.
