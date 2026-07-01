# 干净环境安装复核

这份复核用于确认一个新开发者是否可以从零 clone Runwise，使用项目声明的 pnpm 版本安装依赖，运行检查，生成报告，打开本地 viewer，并尝试 trace / replay / eval 命令。

## 复核摘要

- 复核日期：2026-07-01
- 干净 clone 路径：`/tmp/runwise-clean-install-review/runwise`
- 测试的远程仓库：`https://github.com/darwinx687-afk/runwise`
- 测试的 commit：`401f871 docs: improve v0.1.1 usability guidance`
- 结果：通过，并做了少量文档修正

## 环境

```text
node: v25.8.2
npm: 11.11.1
pnpm: 9.15.4
corepack: 当前 shell 中不可用
git: 2.50.1 (Apple Git-155)
packageManager: pnpm@9.15.4
```

全局 pnpm 与仓库声明的版本一致。当前 shell 没有 `corepack`，所以 `npx -y pnpm@9.15.4 ...` 是更可靠的 fallback。

## 安装结果

命令：

```bash
CI=true npx -y pnpm@9.15.4 install --frozen-lockfile
```

结果：通过。

没有出现需要处理的安装警告。

## 检查和测试结果

命令：

```bash
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 check:types
npx -y pnpm@9.15.4 test
```

结果：通过。

测试输出：

```text
Runwise CLI, trace, eval, viewer, and action tests passed.
```

## Doctor 结果

命令：

```bash
npx -y pnpm@9.15.4 exec runwise doctor
```

结果：通过。

摘要：

- Score：`97/100`
- Rules：`12 passed, 3 failed, 2 not applicable, 0 blocking`
- Findings：`3 total, 0 critical, 0 high, 0 medium, 1 low, 2 info`
- 检测到的 ecosystem：`10`

生成文件：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

`.runwise/` 被 git 忽略。

## Viewer Smoke 结果

命令形状：

```bash
npx -y pnpm@9.15.4 exec runwise view --port 43118
```

Smoke check：

- `http://127.0.0.1:43118/health` 返回 `ok: true`。
- `http://127.0.0.1:43118/` 返回 dashboard HTML。
- smoke test 结束后没有残留 `runwise view` 进程。

结果：通过。

## Trace / Replay / Eval 结果

命令：

```bash
npx -y pnpm@9.15.4 exec runwise trace validate examples/traces/valid-agent-run.json
npx -y pnpm@9.15.4 exec runwise trace replay examples/traces/mcp-risk-agent-run.json
npx -y pnpm@9.15.4 exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

结果：通过。

生成文件写入 `.runwise/replays/` 和 `.runwise/evals/`。

## `--cwd` 结果

要求复核的 smoke command：

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise-mcp-demo
```

结果：通过。

观察：相对 `--output` 路径会相对于被扫描的 `--cwd` 项目解析。上面的命令会生成到：

```text
examples/mcp-demo/.runwise-mcp-demo/
```

由于 `.runwise-mcp-demo/` 是自定义输出目录，当前 `.gitignore` 不会默认忽略它。首次使用文档中更安全的推荐命令是：

```bash
npx -y pnpm@9.15.4 exec runwise doctor --cwd examples/mcp-demo --output .runwise
```

它会写入：

```text
examples/mcp-demo/.runwise/
```

并且会被 git 忽略。

## 已做的文档修正

- 说明当 `corepack` 不可用时，可以使用 `npx -y pnpm@9.15.4 ...` 作为 fallback。
- 修正 own-project guide 中 example project 的 `--cwd` 输出路径。
- 补充说明相对 `--output` 路径会相对于被扫描的 `--cwd` 项目解析。

## 剩余摩擦

- 有些 shell 即使安装了 Node.js，也可能没有 `corepack`。
- `.runwise-mcp-demo/` 这类自定义输出目录不会被默认忽略。
- README quick start 默认用户已有 `pnpm`；干净安装清单提供了更严格的 `npx -y pnpm@9.15.4` 路径。
- GitHub Actions 仍有来自引用 actions 的非阻塞 Node.js 20 deprecation annotation。

## 推荐下一步

只有在主仓库检查和 GitHub Actions 都为绿色后，再进入 Phase 11I。npm 发布和 release tag 仍应等明确的 release-candidate loop 再处理。
