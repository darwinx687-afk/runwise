# 插件规则包草案

插件能力目前还没有实现。本文档描述一种未来本地插件 MVP 可能使用的 JSON 规则包格式。

第一版应优先支持确定性的静态检查。JSON 规则包比可执行插件更容易 review，也更符合 Runwise 本地优先的边界。

## 示例

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

## 规则字段

| 字段 | 含义 |
| --- | --- |
| `id` | 稳定规则 ID，应包含插件命名空间。 |
| `category` | 现有 Runwise category，例如 `mcp`、`integrations`、`evals` 或 `tracing`。 |
| `severity` | `info`、`low`、`medium`、`high` 或 `critical`。 |
| `title` / `titleZh` | 双语 finding 标题。 |
| `description` / `descriptionZh` | 说明规则检查什么。 |
| `recommendation` / `recommendationZh` | 用户应该怎么处理。 |
| `match` | 确定性的匹配指令。 |

## 匹配操作草案

第一版 MVP 可以支持一个很小的匹配语言：

- `filePatterns`：要检查的文件名或相对路径
- `textIncludesAny`：任意一个字符串出现即匹配
- `textIncludesAll`：所有字符串都出现才匹配
- `packageJsonIncludesAny`：匹配 `package.json` 中的 dependency 或 script 名称
- `envExampleIncludesAny`：匹配 `.env.example` 中的 provider 名称或 env 变量

这个能力应该保持克制。

## 设计说明

- 先做确定性静态检查。
- 第一版插件不执行任意 JavaScript。
- JSON 规则包可能比可执行插件更安全。
- 可执行插件应放到更后面讨论，甚至可以永远不做。
- 规则包不调用模型。
- 规则包不访问网络。
- 规则包不写文件。
- 除 Runwise 已扫描的本地文本外，规则包不读取 secret。

## 评分问题

第一版实现可以先把 plugin finding 作为 advisory，不影响分数。之后再决定是否让插件 finding 影响 readiness score。

如果插件 finding 会影响分数，报告里应该清楚标注这是插件提供的 finding。
