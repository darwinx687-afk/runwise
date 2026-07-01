# 创建 GitHub Prerelease v0.1.0-preview.0

以下命令为下一轮已批准 loop 准备。本 loop 尚未执行这些命令。

在 Loop 10H 明确批准之前，不要运行这些命令。

## 前置条件

- Tag `v0.1.0-preview.0` 已存在于本地和 origin。
- `main` 的 GitHub Actions 为绿色。
- `docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md` 已完成审查。
- npm 发布继续暂缓。
- GitHub Marketplace release 继续暂缓。

## 创建 Prerelease

```bash
gh release create v0.1.0-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.0-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.0-preview.0.md \
  --prerelease
```

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
