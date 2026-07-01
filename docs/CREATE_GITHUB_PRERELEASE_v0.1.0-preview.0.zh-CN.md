# 创建 GitHub Prerelease v0.1.0-preview.0

以下命令为 Loop 10H 准备，当前作为历史发布操作记录保留。

不要为 `v0.1.0-preview.0` 重复执行 release creation；GitHub prerelease 已存在。

## 前置条件

- Tag `v0.1.0-preview.0` 已存在于本地和 origin。
- `main` 的 GitHub Actions 为绿色。
- `docs/GITHUB_RELEASE_NOTES_v0.1.0-preview.0.md` 已作为 live release body 完成审查。
- npm 发布继续暂缓。
- GitHub Marketplace release 继续暂缓。

## 创建 Prerelease

```bash
gh release create v0.1.0-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.0-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md \
  --prerelease \
  --verify-tag \
  --latest=false
```

创建后如需修正文案，应使用 `gh release edit` 和 `docs/GITHUB_RELEASE_NOTES_v0.1.0-preview.0.md`。

## 验证

```bash
gh release view v0.1.0-preview.0 --repo darwinx687-afk/runwise
gh release list --repo darwinx687-afk/runwise --limit 5
```

## 边界

- 在 prerelease 创建 loop 中不要发布 npm package。
- 不要创建 GitHub Marketplace release。
- 不要移动或重新创建现有 tag。
- 不要添加 hosted service、login、database 或 agent runtime 声明。
