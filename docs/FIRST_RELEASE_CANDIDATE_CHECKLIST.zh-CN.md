# 第一个 Release Candidate 检查清单

目标候选版本：`v0.1.0-preview.0`

- [x] 公开仓库正确渲染。
- [x] `main` 上 CI 通过。
- [x] 英文 README 正确渲染。
- [x] 中文 README 正确渲染。
- [x] Banner 正确渲染。
- [x] Issue templates 存在。
- [x] PR template 存在。
- [x] `action.yml` 存在。
- [x] `.runwise/` 产物被忽略。
- [x] `runwise doctor` 可运行。
- [x] 静态 HTML 报告可用。
- [x] 本地 Dashboard Viewer 可用。
- [x] GitHub Action self-check 可用。
- [x] `runwise trace validate` 可运行。
- [x] `runwise trace replay` 可运行。
- [x] `runwise eval generate` 可运行。
- [x] 生态兼容性检测可用。
- [x] Package version 已审查。
- [x] Release notes 已审查。
- [x] Node.js 20 annotation 已审查。
- [x] npm 发布继续暂缓。
- [x] GitHub Marketplace release 继续暂缓。
- [x] 第一个 tag 命令已准备但未执行。

## 已准备的 Tag 命令

```bash
git tag -a v0.1.0-preview.0 -m "Runwise v0.1.0-preview.0"
git push origin v0.1.0-preview.0
```

在 release candidate review 获得批准前，不要创建或推送 tag。

## 已知非阻塞后续事项

- GitHub Actions 会因引用的 actions 报告 Node.js 20 deprecation annotation。CI 通过。请在 stable release 前审查 action runtime 升级。
