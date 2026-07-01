# MCP 安全规则包

这是一个文档示例插件。

Runwise 目前还不会加载这个插件。它在当前 Runwise 中不可执行。

## 它展示什么

这个规则包草案展示未来本地 JSON 规则包可以怎样描述：

- 类似 shell 的工具检测
- 文件系统写入工具检测
- delete / send / payment 等命名风险
- 审批建议

## 文件

- `runwise.plugin.json`：插件 manifest 草案
- `rules.json`：JSON 规则包草案

## 安全说明

- 不包含 secrets。
- 不包含真实 API key。
- 不发起网络调用。
- 不需要依赖。
- 不包含可执行插件代码。
