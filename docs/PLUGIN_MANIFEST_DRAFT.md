# Plugin Manifest Draft

Plugin support is not implemented yet. This document defines a draft manifest for future discussion.

The manifest is intended to be a small JSON file that describes a local Runwise plugin or rule pack. Current Runwise does not load this file.

## Example

```json
{
  "schema": "runwise.plugin",
  "schemaVersion": "0.1-draft",
  "id": "runwise-plugin-mcp-safety",
  "name": "MCP Safety Rules",
  "nameZh": "MCP 安全规则",
  "version": "0.1.0",
  "description": "Additional local checks for MCP server/tool risk.",
  "descriptionZh": "面向 MCP server / tool 风险的本地检查规则。",
  "type": "readiness-rule-pack",
  "entry": "./rules.json",
  "capabilities": [
    "read-project-files",
    "add-findings"
  ],
  "permissions": {
    "network": false,
    "filesystemWrite": false,
    "modelCalls": false
  },
  "runwise": {
    "minVersion": "0.1.0-preview.0"
  }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `schema` | Identifies the file as a Runwise plugin manifest draft. |
| `schemaVersion` | Version of the manifest shape. |
| `id` | Stable plugin ID. Should be unique and lowercase. |
| `name` / `nameZh` | Human-readable English and Chinese names. |
| `version` | Plugin package or rule pack version. |
| `description` / `descriptionZh` | Short explanation of what the plugin checks. |
| `type` | Plugin category, such as `readiness-rule-pack`. |
| `entry` | Local path to the plugin data file, usually `rules.json` for the first MVP. |
| `capabilities` | What the plugin wants to contribute. |
| `permissions` | Explicit denied/allowed behavior. First versions should be restrictive. |
| `runwise.minVersion` | Minimum Runwise version expected by the plugin. |

## Draft Plugin Types

- `readiness-rule-pack`
- `ecosystem-detector`
- `trace-validator-extension`
- `report-section`
- `eval-exporter`
- `policy-pack`

The first implementation, if approved later, should probably start with `readiness-rule-pack` only.

## Permission Defaults

Suggested first defaults:

```json
{
  "network": false,
  "filesystemWrite": false,
  "modelCalls": false
}
```

Rule packs should not need network access, filesystem writes, or model calls.

## Compatibility Notes

- This manifest is a draft.
- It is not loaded by current Runwise.
- Future design may change.
- Executable plugins are not part of the first proposed path.
