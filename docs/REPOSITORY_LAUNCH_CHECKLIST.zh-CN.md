# 仓库发布检查清单

- [x] 创建 GitHub 仓库。
- [x] 确认仓库名称。
- [x] 确认远程仓库 URL。
- [x] 确认仓库 URL 占位已在合适位置替换。
- [x] 确认 MIT License。
- [x] 确认安全策略。
- [x] 确认 README 链接。
- [x] 确认 README banner 和视觉资源在 GitHub 上正确渲染。
- [x] 运行 `pnpm check`。
- [x] 运行 `pnpm check:types`。
- [x] 运行 `pnpm test`。
- [x] 运行 `pnpm exec runwise doctor`。
- [x] 运行 `pnpm exec runwise trace validate examples/traces/valid-agent-run.json`。
- [x] 运行 `pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json`。
- [x] 运行 `pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json`。
- [x] 确认 `.runwise/` 被忽略。
- [x] 在添加已确认的远程仓库 URL 后推送初始分支。
- [x] 确认 GitHub Actions 在首次推送后启动。
- [x] 确认 GitHub Actions 通过。
- [x] 确认仓库根目录可见 `action.yml`。
- [x] 确认 issue templates 和 PR template 在 GitHub 中可见。
- [x] 确认仓库 description 已设置。
- [x] 确认仓库 topics 已设置。
- [x] 确认 `.runwise/` 未被推送。
- [x] 第一个 preview tag 已存在。
- [x] GitHub prerelease 已创建。
- [x] Release body 已在创建后修正。
- [x] 已添加 finalized release notes 文件。
- [x] 已添加 launch sharing pack。
- [x] 在 package metadata 审查完成前继续暂缓 npm 发布。
- [x] GitHub Marketplace release 继续暂缓。
- [x] Node.js 20 annotation 仍为非阻塞事项。

## 已知非阻塞后续事项

- GitHub Actions 会因引用的 actions 报告 Node.js 20 deprecation annotation，但 CI 通过。请在 stable release 前审查 action runtime 升级。
