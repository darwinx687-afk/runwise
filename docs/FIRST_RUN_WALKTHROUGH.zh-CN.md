# 首次运行 Walkthrough

这份 walkthrough 帮你从 fresh clone 走到一份本地 Runwise 报告。不需要 API key，也不会上传项目数据。

Runwise 目前处于 public preview，并且只支持源码方式试用。

## 1. 克隆仓库

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
```

## 2. 安装依赖

```bash
pnpm install
```

如果你的全局 pnpm 行为不一致，建议使用 `package.json` 中声明的 pnpm 版本，或启用 Corepack。

## 3. 运行检查

```bash
pnpm check
pnpm test
```

这些命令会先确认 workspace 和 CLI fixture 状态正常，再生成报告。

## 4. 运行 doctor

```bash
pnpm exec runwise doctor
```

它会检查当前项目，并把本地报告写到 `.runwise/`：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

`.runwise/` 是本地生成目录，会被 git 忽略。

## 5. 打开本地 viewer

```bash
pnpm exec runwise view
```

viewer 会读取你机器上的 `.runwise/runwise-report.json`，不会上传报告。

## 6. 试一下 trace 验证

```bash
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
```

这个命令会检查一个本地 `runwise.agent_trace` fixture，确认结构是否有效。

## 7. 试一下 trace replay

```bash
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
```

Replay 会生成一份静态 Markdown 复盘报告，解释时间线、风险、审批和错误，不会重新运行 agent，也不会调用模型。

## 8. 生成 eval case

```bash
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

这个命令会把已 review 的 trace 转成 eval case 草稿文件。Runwise 只生成文件，不执行 eval，也不调用模型。

## 9. 如果遇到问题

- 确认 Node.js 是 20 或更高版本。
- 确认 pnpm 与 `package.json` 里的 `packageManager` 字段一致。
- 如果 workspace package 缺失，可以重新运行 `pnpm install`。
- 只有在想重新生成本地报告时，才需要删除 `.runwise/`。
- 如果 trace validation 失败，先看错误信息。仓库里有意保留了一些 invalid fixture 用于测试。

下一步：打开 [示例 Gallery](./EXAMPLE_GALLERY.zh-CN.md)，用更小的示例项目试 Runwise。
