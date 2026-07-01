# v0.1.1 发布后验证

本文档记录 `v0.1.1-preview.0` 发布后的验证结果。

## Release

- Release URL: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0
- 上一个 release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0
- Tag: `v0.1.1-preview.0`
- Tag 指向的 commit: `96b4864e61ad1c7bd990284b7ba7315c242d2dcc`
- Release 名称: `Runwise v0.1.1-preview.0`
- 创建时间: `2026-07-01T14:27:47Z`
- 发布时间: `2026-07-01T14:38:54Z`

## 状态

| 项目 | 状态 | 说明 |
| --- | ---: | --- |
| GitHub prerelease | 已验证 | 公开 release 页面可访问 |
| Draft | 否 | `isDraft: false` |
| Prerelease | 是 | `isPrerelease: true` |
| Latest | 否 | 通过 GitHub GraphQL 验证 `isLatest: false` |
| npm package | 未发布 | 目前仍然只支持源码安装 |
| GitHub Marketplace | 未发布 | 没有 Marketplace 声明 |
| Plugin runtime | 未实现 | 插件文档只是未来探索 |
| Hosted service | 不包含 | 没有登录、telemetry、数据库或 cloud sync |

## 仓库第一印象

- 仓库 URL: https://github.com/darwinx687-afk/runwise
- 描述: `Check AI agent projects before they go live: local reports, trace replay, and failure-to-eval for MCP/RAG/LLM apps.`
- 验证时 stars: `0`
- 验证时 forks: `0`
- 验证时 open issues: `0`
- Topics 包含 `ai-agents`、`mcp`、`rag`、`trace`、`trace-replay`、`local-first` 和 `typescript`。
- README 中的 preview release 链接已检查，应指向 `v0.1.1-preview.0`。

## Release Notes Review

release notes 已正确说明：

- 这是 preview
- Runwise 目前只支持源码安装
- npm 尚未发布
- plugin runtime 尚未实现
- 不包含 hosted service、telemetry、database、login 和 Marketplace listing
- 不提供 stable release 保证

本轮没有编辑 GitHub release。

## 验证摘要

- GitHub release 已公开，配置正确。
- tag 在本地和远程都存在。
- 远程 tag peel 后指向已批准的 release-candidate commit。
- release 是 prerelease，不是 draft，也没有标记为 latest。
- post-prerelease 文档 commit 后 GitHub Actions 通过。
- 已知 Node.js 20 deprecation annotation 仍然存在，但不阻塞。
- `.runwise/` 生成 artifact 仍然被忽略且未被跟踪。

## 分享建议

这次可以作为一次小版本优化分享，但应该表达为“首次使用体验和文档/报告可读性优化”，不要包装成重大功能发布。

推荐表达重点：

- 首次运行路径更清楚
- 安装说明更稳
- 报告更容易读
- 示例更具体
- 仍是 public preview，只支持源码安装

避免表达成：

- stable release
- npm package release
- plugin 发布
- 重大功能发布
- 与任何生态的官方集成

## 已知后续事项

- 继续观察 Node.js、pnpm 和 Corepack 相关安装摩擦。
- 关注 Doctor 误报和漏报。
- 观察用户是否理解 trace、replay、eval 和 Failure-to-Eval。
- 下一步需要决定：继续做反馈小修、进入 local JSON rule pack MVP，还是暂停 Runwise，研究下一个 AI 开源方向。
