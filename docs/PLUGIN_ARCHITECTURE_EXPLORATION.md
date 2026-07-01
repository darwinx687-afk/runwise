# Plugin Architecture Exploration

Plugin support is not implemented yet. This document explores a possible design.

Runwise currently keeps Doctor rules in `@runwise/core` and ecosystem detection in `@runwise/integrations`. That is a good starting point for a public preview because the behavior is easy to inspect, test, and explain.

Over time, not every readiness check should live in core. MCP teams, RAG teams, China-ready LLM users, and internal platform teams may need checks that are useful to them but too specific for the main repository.

## Why Plugins May Be Useful

Plugins could let Runwise grow without making core harder to understand.

Useful cases:

- MCP server safety checks that look for risky tool names or missing approval policies.
- RAG checks that look for source references, retrieval evidence, and eval coverage.
- China-ready provider checks for DashScope, Qwen, DeepSeek, GLM, Moonshot/Kimi, MiniMax, and other provider assumptions.
- Team policy checks for internal review requirements.
- Trace and eval checks that match a team's release process.

## Problems Plugin Support Should Solve

- Let teams add project-specific checks without changing Runwise core.
- Let ecosystem checks grow outside the main repository.
- Keep Runwise core small and understandable.
- Allow community rule packs for MCP, RAG, browser-use, local models, China-ready LLM providers, and similar stacks.
- Make custom checks easy to review and test.

## What Should Stay In Runwise Core

Core should stay responsible for the stable local workflow:

- project scanning basics
- built-in Doctor rules
- rule execution and scoring
- shared schemas
- report generation
- trace validation
- static replay
- Failure-to-Eval generation
- local integration detection primitives
- GitHub Action behavior

Core should also define the plugin contract if plugin support is implemented later.

## What Should Live In Plugins

Plugins should be narrow and reviewable.

Good plugin candidates:

- ecosystem-specific rule packs
- company policy checks
- provider-specific readiness checks
- optional trace validation extensions
- optional report sections
- optional eval exporter definitions

Plugins should not become hidden runtime owners of the project.

## Goals

- Let teams add project-specific checks without changing Runwise core.
- Let ecosystem checks grow outside the main repository.
- Keep Runwise core small and understandable.
- Allow community rule packs for MCP, RAG, browser-use, local models, China-ready LLM providers, etc.
- Make custom checks easy to review and test.

## Plugin Non-Goals

- No remote plugin execution.
- No hosted plugin marketplace in the near term.
- No automatic installation from unknown URLs.
- No arbitrary network access by default.
- No secrets collection.
- No cloud sync.
- No plugin-based model calls in the first version.
- No replacing the core doctor engine.

## Safety And Local-First Constraints

Any future plugin design should preserve Runwise's current boundaries:

- local files are inspected locally
- generated reports remain local artifacts
- no hidden model calls
- no hidden network calls
- no secret collection
- no automatic plugin install from a URL
- no remote execution system
- no hosted plugin registry required for normal use

The first plugin design should prefer deterministic JSON rule packs over executable plugins.

## Draft Plugin Types

### readiness-rule-pack

Adds additional Doctor rules.

Examples:

- company-specific approval policy checks
- MCP server permission checks
- RAG source citation checks

### ecosystem-detector

Adds local detection signals for a specific project stack.

Examples:

- a provider-specific `.env.example` pattern
- a framework-specific config file
- package metadata signals

### trace-validator-extension

Adds extra validation hints for trace files.

Examples:

- require source IDs on RAG retrieval steps
- require approval steps before high-risk MCP calls

### report-section

Adds a small optional report section based on findings already produced by local checks.

Examples:

- team review checklist
- provider assumptions summary

### eval-exporter

Defines a future local export shape for eval cases.

Examples:

- a team-specific YAML shape
- a compatibility format for an internal eval harness

### policy-pack

Groups checks around a team or organization policy.

Examples:

- approval boundaries
- trace retention notes
- required documentation files

## Draft Plugin Manifest

See [Plugin Manifest Draft](./PLUGIN_MANIFEST_DRAFT.md).

The manifest should describe what a plugin is, what files it contributes, and what permissions it asks for. The current Runwise public preview does not load this manifest.

## Draft Rule Pack Shape

See [Plugin Rule Pack Draft](./PLUGIN_RULE_PACK_DRAFT.md).

The first safe version should focus on deterministic static checks such as file patterns and text includes. Arbitrary JavaScript execution should not be part of the first plugin MVP.

## Loading Strategy Options

### Option A: Explicit local path

Example future shape:

```bash
runwise doctor --rule-pack ./runwise-rules/mcp-safety/rules.json
```

Pros:

- simple
- easy to review in a repository
- no install flow

Cons:

- less convenient for reusable community packs

### Option B: Declared in project config

Example future shape:

```json
{
  "runwise": {
    "rulePacks": ["./runwise-rules/mcp-safety/rules.json"]
  }
}
```

Pros:

- repeatable in CI
- easy for teams

Cons:

- needs clear config validation

### Option C: Package-based plugins

Example future shape:

```json
{
  "devDependencies": {
    "runwise-plugin-mcp-safety": "0.1.0"
  }
}
```

Pros:

- reusable
- versioned through the package manager

Cons:

- raises supply-chain and executable-code questions
- should wait until JSON rule packs are proven

## Security Model

The safest first version is data-only:

- JSON manifests
- JSON rule packs
- no JavaScript execution
- no network access
- no filesystem writes from plugins
- no model calls
- no secret reads beyond matching local file text already scanned by Runwise

If executable plugins are ever considered, they should require a separate design review and explicit user approval. They should not be introduced as a side effect of JSON rule packs.

## Testing Strategy

Future plugin tests should include:

- manifest schema validation
- rule pack schema validation
- fixture projects for each rule pack
- deterministic finding snapshots
- negative tests for unsupported permissions
- checks that generated `.runwise/` artifacts remain ignored

Rule packs should be small enough to review in code review.

## Versioning Strategy

The draft manifest uses:

- `schemaVersion`: version of the plugin manifest shape
- `version`: version of the plugin itself
- `runwise.minVersion`: minimum compatible Runwise version

Runwise should reject unsupported schema versions clearly if plugin support is implemented later.

## Example Plugin Ideas

- `runwise-plugin-mcp`: MCP server and tool approval checks
- `runwise-plugin-rag`: RAG retrieval, source, and eval coverage checks
- `runwise-plugin-qwen`: DashScope/Qwen provider assumptions
- `runwise-plugin-deepseek`: DeepSeek provider assumptions
- `runwise-plugin-browser-use`: browser automation trace and approval checks
- `runwise-plugin-company-policy`: local team policy checks

## Implementation Phases

### Phase A: Documentation and review

Current loop. Create draft docs, examples, and open questions.

### Phase B: Schema-only validation

Add schema validation for plugin manifests and rule packs, but do not execute rule packs yet.

### Phase C: Local JSON rule pack MVP

Allow explicit local JSON rule packs to add deterministic Doctor findings.

### Phase D: Project config support

Allow a project to declare local rule packs if the MVP is useful.

### Phase E: Package-based rule packs

Consider package-based distribution only after local JSON packs are safe and useful.

Executable plugins are outside the first implementation path.

## Open Questions

- Should the first MVP support only `readiness-rule-pack`?
- Should plugin findings affect the readiness score immediately, or start as advisory?
- Should rule pack categories be limited to current `RunwiseCategory` values?
- How should rule IDs avoid collisions?
- Should local rule packs be allowed in GitHub Actions by default?
- Should rule packs be allowed to add report sections, or should that wait?
- How should Runwise explain plugin findings in bilingual reports?
- What is the smallest safe rule matching language?
