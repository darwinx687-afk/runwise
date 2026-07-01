# 创建 Tag v0.1.1-preview.0

在 release candidate 被批准前，不要运行这些命令。

本文档只供下一轮批准后的 tag loop 使用。

## 前置条件

- `main` 干净。
- 本地检查通过。
- release-candidate commit 上的 GitHub Actions 通过。
- `.runwise/` artifact 被忽略且未被跟踪。
- npm 发布继续暂缓。
- 除非明确批准，tag loop 中不创建 GitHub Release。

## 批准后的 Tag Loop 命令

```bash
git status --short
git tag -a v0.1.1-preview.0 -m "Runwise v0.1.1-preview.0"
git push origin v0.1.1-preview.0
```

tag 推送后不要移动、删除或 force-update。
