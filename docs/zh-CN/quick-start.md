# 快速开始

Runwise 当前从源码运行。

```bash
git clone <your-future-repo-url>
cd runwise
pnpm install
pnpm check
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
```

首次公开推送后，将 `<your-future-repo-url>` 替换为实际仓库地址。

## 生成报告

`runwise doctor` 会在 `.runwise/` 下写入本地 artifact：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

静态 HTML 报告 = doctor 生成的可分享审计交付物。

本地 Dashboard 查看器 = 读取 report JSON 的交互式本地查看器。

生成的 `.runwise/` 文件应保持被忽略状态，并作为可复现的本地输出。
