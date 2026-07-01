# 在你自己的项目上试用 Runwise

Runwise 在本地运行，不会上传你的项目数据。

当前 public preview 从源码运行，还没有 npm package。

## 方式 A：先在 Runwise 仓库里跑一个示例

如果你想先看看预期行为，可以从示例开始。

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise
```

然后打开生成的报告：

```text
examples/mcp-demo/.runwise/runwise-report.md
examples/mcp-demo/.runwise/runwise-report.html
```

## 方式 B：检查你自己的项目

在 Runwise 仓库中，把 Doctor 指向你的项目：

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd /path/to/your-ai-project --output .runwise
```

这会在你的项目里写入报告：

```text
/path/to/your-ai-project/.runwise/runwise-report.json
/path/to/your-ai-project/.runwise/runwise-report.md
/path/to/your-ai-project/.runwise/runwise-report.html
```

当你传入相对路径时，`--output` 会相对于被扫描的 `--cwd` 项目解析。

如果路径里有空格，请加引号：

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd "/path/to/your AI project" --output .runwise
```

## 先看什么

1. Overall score。
2. Blocking、critical 和 high finding。
3. What to fix first。
4. Detected ecosystems。
5. Report files。

## 如果 finding 看起来不对

False positive 指 Runwise 报了一个问题，但它对你的项目来说并不是真问题。

False negative 指 Runwise 漏掉了你期待它识别的问题或线索。

建议记录：

- 项目类型
- finding ID
- 预期结果
- 实际结果
- 相关文件模式
- 项目是否使用 MCP、RAG、browser agent、OpenAI-compatible API 或国内大模型服务商

不要分享 secret、API key、私有 URL、客户数据、专有 prompt 或私有 trace 内容。

完整模板见 [检查结果反馈指南](./FINDING_FEEDBACK_GUIDE.zh-CN.md)。

## 安全分享

寻求帮助时，只分享脱敏后的上下文：

- 文件名或目录名
- package 名称
- 生成的 finding ID
- 脱敏后的片段
- 报告来自示例项目，还是你自己的项目

生成的 `.runwise/` 报告默认留在本地，并且会被 git 忽略。
