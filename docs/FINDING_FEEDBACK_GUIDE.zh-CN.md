# 检查结果反馈指南

当 Runwise Doctor finding 看起来不对或不完整时，可以用这份指南反馈。

Runwise 目前处于 public preview。高质量的误报和漏报反馈，对改进规则很有帮助。

## 什么是误报

误报指 Runwise 报了一个 finding，但它不应该适用于你的项目。

例子：

- Runwise 说缺少 eval coverage，但你的项目把 eval 放在 Runwise 还不认识的目录里。

## 什么是漏报

漏报指 Runwise 没有识别出你期待它检测到的问题或线索。

例子：

- 你的项目在非标准文件里有 MCP 配置，但 Runwise 没检测到 MCP 使用。

## 应该包含什么

建议包含：

- 项目类型
- finding ID，如果有的话
- 预期结果
- 实际结果
- 相关文件模式或目录名
- 项目是否使用 MCP、RAG、browser agent、OpenAI-compatible API 或国内大模型服务商
- 问题属于 Doctor、report output、trace validation、replay、eval generation 还是 ecosystem detection

不要包含：

- API key
- token
- 客户私有数据
- 私有 URL
- 专有 prompt
- 完整私有 trace
- `.env` 中的 secret

## 可能相关的 Label

未来创建 GitHub issue 时，这些 label 可能有用：

- `type:feedback`
- `type:bug`
- `type:docs`
- `area:doctor`
- `area:integrations`
- `area:trace`
- `area:eval`
- `priority:triage`

## Issue 模板示例

```markdown
## Project type

MCP / RAG / agent workflow / browser agent / China-ready LLM / other

## Finding ID

...

## Expected result

...

## Actual result

...

## Why it matters

...

## Safe context

File or folder pattern:

Redacted snippet, if safe:

Do not paste secrets. Redact tokens, API keys, private URLs, and customer data.
```

## 好反馈通常很小

最有用的反馈通常是一个很小、脱敏后的 fixture：

- 文件名
- 目录形状
- package 名称
- 脱敏后的 config key
- 具体 finding ID

这些通常已经足够帮助改进规则，同时不会暴露私有项目数据。
