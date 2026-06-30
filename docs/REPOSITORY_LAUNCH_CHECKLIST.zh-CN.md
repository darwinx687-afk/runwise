# 仓库发布检查清单

- [ ] 创建 GitHub 仓库。
- [ ] 确认仓库名称。
- [ ] 更新 `<your-future-repo-url>` 占位。
- [ ] 确认 MIT License。
- [ ] 确认安全策略。
- [ ] 确认 README 链接。
- [ ] 运行 `pnpm check`。
- [ ] 运行 `pnpm test`。
- [ ] 运行 `pnpm exec runwise doctor`。
- [ ] 运行 `pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json`。
- [ ] 运行 `pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json`。
- [ ] 确认 `.runwise/` 被忽略。
- [ ] 推送初始分支。
- [ ] 后续再创建第一个 tag。
- [ ] 在 package metadata 审查完成前不要发布 npm。
