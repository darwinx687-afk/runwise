# v0.1.1 Release Candidate 检查清单

这份清单记录 `v0.1.1-preview.0` prerelease 的审批状态。它不会发布 npm，也不会创建 GitHub Marketplace listing。

## Release 目标

- 目标版本：`v0.1.1-preview.0`
- Release 类型：GitHub prerelease
- Tag：`v0.1.1-preview.0`
- 当前 release：`v0.1.1-preview.0`
- 上一个 release：`v0.1.0-preview.0`
- 分发方式：仅源码安装
- npm 发布：不包含
- GitHub Marketplace 发布：不包含
- Plugin runtime：不包含

## 就绪度

| Item | Status | Notes |
|---|---:|---|
| Source install | Ready | 已通过 clean clone 验证 |
| npm package | Not included | 暂缓 |
| npm publish | Not included | 暂缓 |
| Marketplace publish | Not included | 暂缓 |
| Plugin runtime | Not included | 只有文档探索 |
| GitHub Action | Ready | 现有 workflow 通过 |
| Clean-machine review | Ready | 已通过 |
| Release notes | Ready | 已起草 |
| Tag | Created and pushed | `v0.1.1-preview.0` |
| GitHub prerelease | Created | https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0 |

## 本地验证

审批前需要运行：

```bash
CI=true npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 check:types
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
npx -y pnpm@9.15.4 exec runwise trace validate examples/traces/valid-agent-run.json
npx -y pnpm@9.15.4 exec runwise trace replay examples/traces/mcp-risk-agent-run.json
npx -y pnpm@9.15.4 exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

同时确认：

```bash
git check-ignore -v .runwise/runwise-report.json .runwise/runwise-report.md .runwise/runwise-report.html .runwise/replays .runwise/evals .runwise
git ls-files .runwise
```

## Release Blockers

release-candidate 准备时没有发现阻塞项。

已知非阻塞 follow-up：

- npm package 发布继续暂缓。
- Plugin runtime support 尚未实现。
- GitHub Actions 仍会因为引用的 upstream actions 报告 Node.js 20 deprecation annotation。
- `.runwise/` 之外的自定义输出目录，后续可能需要更明确的 ignore 指引。

## Release 后状态

- Tag: Created and pushed
- GitHub prerelease: Created
- npm publish: Not included
- Marketplace publish: Not included

## 审批门槛

下一轮 post-release loop 前：

- 需要用户明确批准
- `main` 应保持干净
- 本地检查应通过
- GitHub Actions 应通过
- `.runwise/` 应继续被忽略且未被跟踪
- npm publish、GitHub Marketplace publish 和额外 release 命令除非明确批准，否则仍然不在范围内
