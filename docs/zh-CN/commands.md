# 命令参考

执行 `pnpm install` 后，在仓库根目录运行命令。

```bash
pnpm exec runwise doctor
pnpm exec runwise doctor --cwd . --output .runwise
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace validate examples/traces
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

## 说明

- `doctor` 会写入 JSON、Markdown 和静态 HTML 报告。
- `view` 会基于 `.runwise/runwise-report.json` 启动本地 Dashboard 查看器。
- `trace validate` 可以验证单个 trace 文件，也可以验证 trace JSON 目录。
- 如果目录中包含无效 fixture，目录 trace 验证可能以退出码 `1` 结束。
- `trace replay` 会在 `.runwise/replays/` 下写入静态复盘 Markdown。
- `eval generate` 会在 `.runwise/evals/` 下写入 JSON、YAML 和 Markdown 评测用例。
- 这些命令不会调用模型、外部 API 或 hosted service。
