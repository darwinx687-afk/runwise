# 国内大模型 Provider 规则包

这是一个文档示例插件。

Runwise 目前还不会加载这个插件。它在当前 Runwise 中不可执行。

## 它展示什么

这个规则包草案展示未来本地 JSON 规则包可以怎样描述这些检查：

- Qwen / DashScope 环境变量名称
- DeepSeek 环境变量名称
- GLM / 智谱环境变量名称
- Moonshot / Kimi 环境变量名称
- MiniMax 环境变量名称
- OpenAI-compatible base URL provider 说明

## 文件

- `runwise.plugin.json`：插件 manifest 草案
- `rules.json`：JSON 规则包草案

## 安全说明

- 不包含 secrets。
- 不包含真实 API key。
- 不发起网络调用。
- 不需要依赖。
- 不包含可执行插件代码。
