# Plugin Rule Pack Draft

Plugin support is not implemented yet. This document describes a possible JSON rule pack shape for a future local-only plugin MVP.

The first version should favor deterministic static checks. JSON rule packs are easier to review than executable plugins and fit Runwise's local-first boundary.

## Example

```json
{
  "schema": "runwise.rule_pack",
  "schemaVersion": "0.1-draft",
  "rules": [
    {
      "id": "mcp.require_approval_for_shell_tools",
      "category": "mcp",
      "severity": "high",
      "title": "Shell-like MCP tools should require approval",
      "titleZh": "类似 shell 的 MCP 工具应要求审批",
      "description": "Detects MCP tool names that look like shell or filesystem write operations.",
      "descriptionZh": "检测看起来像 shell 或文件写入操作的 MCP 工具名称。",
      "recommendation": "Add an approval policy before allowing this tool to run.",
      "recommendationZh": "在允许该工具执行前增加审批策略。",
      "match": {
        "filePatterns": ["mcp.json", ".mcp.json"],
        "textIncludesAny": ["shell", "exec", "write", "delete"]
      }
    }
  ]
}
```

## Rule Fields

| Field | Meaning |
| --- | --- |
| `id` | Stable rule ID. Should include the plugin namespace. |
| `category` | Existing Runwise category such as `mcp`, `integrations`, `evals`, or `tracing`. |
| `severity` | `info`, `low`, `medium`, `high`, or `critical`. |
| `title` / `titleZh` | Bilingual finding title. |
| `description` / `descriptionZh` | What the rule checks. |
| `recommendation` / `recommendationZh` | What the user should do. |
| `match` | Deterministic matching instructions. |

## Draft Match Operators

The first MVP could support a small matching language:

- `filePatterns`: file names or relative paths to inspect
- `textIncludesAny`: match if any string appears
- `textIncludesAll`: match only if every string appears
- `packageJsonIncludesAny`: match dependency/script names in `package.json`
- `envExampleIncludesAny`: match provider names or env vars in `.env.example`

This should stay intentionally small.

## Design Notes

- Deterministic static checks should come first.
- No arbitrary JavaScript execution in the first plugin version.
- JSON rule packs may be safer than executable plugins.
- Executable plugins should be considered later, if ever.
- Rule packs should not call models.
- Rule packs should not access the network.
- Rule packs should not write files.
- Rule packs should not read secrets beyond local text already scanned by Runwise.

## Scoring Question

The first implementation could start with advisory findings that do not affect the score, then decide later whether plugin findings should affect readiness scoring.

If plugin findings affect the score, reports should clearly label them as plugin-provided findings.
