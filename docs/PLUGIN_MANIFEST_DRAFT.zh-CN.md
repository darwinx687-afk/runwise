# 插件 Manifest 草案

插件能力目前还没有实现。本文档只是为未来讨论定义一个 manifest 草案。

Manifest 目标是一个很小的 JSON 文件，用来描述本地 Runwise 插件或规则包。当前 Runwise 不会加载这个文件。

## 示例

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

## 字段说明

| 字段 | 含义 |
| --- | --- |
| `schema` | 表示这是 Runwise plugin manifest 草案。 |
| `schemaVersion` | manifest 结构版本。 |
| `id` | 稳定插件 ID，应唯一且使用小写。 |
| `name` / `nameZh` | 英文和中文可读名称。 |
| `version` | 插件或规则包版本。 |
| `description` / `descriptionZh` | 简短说明插件检查什么。 |
| `type` | 插件类别，例如 `readiness-rule-pack`。 |
| `entry` | 指向插件数据文件的本地路径，第一版通常是 `rules.json`。 |
| `capabilities` | 插件希望贡献的能力。 |
| `permissions` | 明确声明允许或禁止的行为。第一版应尽量严格。 |
| `runwise.minVersion` | 插件期望的最低 Runwise 版本。 |

## 插件类型草案

- `readiness-rule-pack`
- `ecosystem-detector`
- `trace-validator-extension`
- `report-section`
- `eval-exporter`
- `policy-pack`

如果未来批准实现，第一版最好只从 `readiness-rule-pack` 开始。

## 权限默认值

建议第一版默认：

```json
{
  "network": false,
  "filesystemWrite": false,
  "modelCalls": false
}
```

规则包不应该需要网络访问、文件写入或模型调用。

## 兼容说明

- 这个 manifest 只是草案。
- 当前 Runwise 不会加载它。
- 未来设计可能变化。
- 可执行插件不属于第一条建议实现路径。
