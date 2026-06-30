# Failure-to-Eval / 失败转评测

Failure-to-Eval 会把验证过的 trace 转化为可复用的本地评测用例文件。

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

生成文件：

```text
.runwise/evals/<runId>-eval.json
.runwise/evals/<runId>-eval.yaml
.runwise/evals/<runId>-eval.md
```

Runwise 只生成评测用例。它不会执行评测、调用模型裁判、训练模型、上传数据集或重新运行 Agent。
