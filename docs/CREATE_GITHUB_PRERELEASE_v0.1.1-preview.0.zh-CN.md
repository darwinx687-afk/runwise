# 创建 GitHub Prerelease v0.1.1-preview.0

在 tag 已存在且 GitHub prerelease loop 被批准前，不要运行这个命令。

本文档供创建 tag 后的下一轮批准流程使用。

## 前置条件

- GitHub 上已经存在 tag `v0.1.1-preview.0`。
- tag 指向已批准的 release-candidate commit。
- GitHub Actions 通过。
- release notes 已 review。
- npm 发布继续暂缓。
- GitHub Marketplace release 继续暂缓。

## 批准后的 Prerelease Loop 命令

```bash
gh release create v0.1.1-preview.0 \
  --repo darwinx687-afk/runwise \
  --title "Runwise v0.1.1-preview.0" \
  --notes-file docs/GITHUB_RELEASE_DRAFT_v0.1.1-preview.0.md \
  --prerelease \
  --verify-tag \
  --latest=false
```

## 验证

```bash
gh release view v0.1.1-preview.0 --repo darwinx687-afk/runwise
gh release list --repo darwinx687-afk/runwise --limit 5
```
