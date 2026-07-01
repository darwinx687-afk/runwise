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
- [x] 第一个 preview tag 已存在。
- [x] GitHub prerelease 已创建。
- [x] Release body 已在创建后修正。
- [x] 已添加英文和中文 finalized release notes 文件。
- [x] 已添加 launch sharing pack。
- [x] 已添加 project one-pager。
- [x] Node.js 20 annotation 仍为非阻塞事项。

## Preview Tag

```bash
v0.1.0-preview.0
```

该 tag 已在 Loop 10F 创建，不应移动或重新创建。

## GitHub Prerelease

https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0

该 prerelease 已从现有 tag 创建。npm 发布和 GitHub Marketplace release 继续暂缓。

## 已知非阻塞后续事项

- GitHub Actions 会因引用的 actions 报告 Node.js 20 deprecation annotation。CI 通过。请在 stable release 前审查 action runtime 升级。
