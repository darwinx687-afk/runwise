# 早期用户测试指南

本指南为 Runwise `v0.1.0-preview.0` 提供一个约 10 分钟的源码安装测试流程。

Runwise 目前处于公开预览阶段。请不要把密钥、客户隐私数据、专有 trace 或完整内部报告粘贴到公开 issue 中。

## 10 分钟测试流程

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
pnpm check
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

如果 `runwise view` 启动了本地查看器，请打开命令行中打印的 localhost URL，测试完成后用 `Ctrl+C` 停止。

## 重点观察什么

- clone、install 或命令执行过程中是否有阻碍。
- 文档是否让人困惑，是否缺少设置说明。
- Doctor finding 是否有噪音。
- Doctor finding 是否有漏报。
- 是否缺少生态检测。
- 报告文案是否清楚。
- 中文文档是否自然。
- 生成的报告是否适合内部 AI 项目审查。
- replay 报告是否让高风险运行更容易复盘。
- Failure-to-Eval 输出是否适合作为 eval case 草稿。

## 应该反馈什么

提交 GitHub issue 时请包含：

- 你执行的命令。
- OS、Node.js version 和 pnpm version。
- 预期结果。
- 实际结果。
- 如有必要，提供安全且已脱敏的片段。
- 项目是否包含 AI Agent、MCP、RAG 或 LLM application trace。

请根据反馈类型选择 Bug Report、Feature Request 或 Integration Request template。

## 好的最小反馈示例

- “Doctor 提示缺少 eval coverage，但该仓库把 eval 放在 `tests/evals/`，这里是已脱敏文件名。”
- “Trace replay 可读，但 approval request 和 approval response 应该放在一起。”
- “Failure-to-Eval 输出有用，但 Markdown 应该更早展示 prohibited behavior。”
- “国内可用检测漏掉了一个基于已脱敏 `OPENAI_BASE_URL` 文档的 provider pattern。”
