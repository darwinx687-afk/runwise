# 可视化报告示例

静态 HTML 报告适合分享给不想运行 CLI 的人看，是理解 Runwise 结果最快的方式。

它由 `runwise doctor` 在本地生成，是自包含文件，可以直接用浏览器打开，也可以作为 GitHub Actions artifact 上传。

建议先看：

1. Overall score
2. What to fix first
3. Detected ecosystems
4. Medium / high findings
5. Report files

## 静态 HTML 报告和本地 Dashboard 的区别

| 表面 | 适合什么时候用 | 说明 |
| --- | --- | --- |
| 静态 HTML 报告 | 想分享一个生成后的单文件报告。 | 不需要 dev server，适合 GitHub Actions artifact 或团队 review。 |
| 本地 dashboard viewer | 想在本地仔细查看报告。 | 读取 `.runwise/runwise-report.json`，提供轻量筛选。 |

两者都是本地优先，不上传项目数据。

## 什么样的 Finding 更重要

建议按这个顺序看：

1. Blocking
2. Critical
3. High
4. 与 trace、eval、approval 或 provider 假设相关的 medium finding
5. 有时间再看 low 和 info finding

## 怎么分享

- 运行 `pnpm exec runwise doctor`。
- 把 `.runwise/runwise-report.html` 分享给团队成员。
- 除非明确需要归档报告 artifact，否则不要把 `.runwise/` 提交到 git。
- 如果某类失败会反复出现，可以把它转成 eval case。

![Runwise 报告预览](../../assets/report-preview.svg)
