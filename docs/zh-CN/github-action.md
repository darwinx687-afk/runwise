# GitHub Action

Runwise 在本仓库中包含一个本地优先的 composite action。

## 当前本地用法

```yaml
- uses: ./
  with:
    min-score: "70"
    fail-on-blocking: "true"
    fail-on-severity: "critical"
```

该 action 会运行 `runwise doctor`，写入 GitHub Step Summary，暴露报告输出，并可根据 blocking finding、严重级别阈值或最低分数失败。

## 未来公开用法

```yaml
# After the public repository and release tag are created:
- uses: <owner>/<repo>@v0
```

在公开仓库和 release tag 创建前，不要把上面的 public tag 示例当作已发布能力。
