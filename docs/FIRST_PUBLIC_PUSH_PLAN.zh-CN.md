# 首次公开推送计划

本计划用于准备 Runwise 的首次公开推送。在 GitHub 仓库已经创建且真实仓库 URL 得到确认之前，不得执行。

## 当前远程状态

- Loop 10A 未提供远程仓库 URL。
- 当前 `git remote -v` 为空。
- 首次推送已准备，但未执行。

## 前置条件

- GitHub 仓库 `runwise` 已创建。
- 维护者已确认真实仓库 URL。
- 本地检查通过。
- `.runwise/` 生成产物仍然被忽略且未被跟踪。
- 工作区只包含有意纳入的源码、文档、示例、package 文件和治理文件。

## URL 确认后执行的命令

```bash
git remote add origin <repo-url>
git branch -M main
git push -u origin main
```

将 `<repo-url>` 替换为已确认的 GitHub 仓库 URL。

## 推送后检查

- README 在 GitHub 上正确渲染。
- README 中的 SVG banner 正确显示。
- `.github/workflows/runwise.yml` 在首次推送后启动。
- 仓库根目录可见 `action.yml`。
- Issue templates 和 PR template 在 GitHub 中可见。
- `.runwise/` 生成报告没有被推送。
- 默认分支是 `main`。
- 公开 action 示例在 release tag 存在前仍不声明可用 tag。
- 在 package metadata 审查前继续暂缓 npm 发布。

## 停止规则

- 如果远程仓库 URL 未确认，停止。
- 如果 `git status --short` 显示意外生成产物，停止。
- 如果 `.runwise/` 出现在 `git ls-files` 中，停止。
- 如果检查失败，停止。
- 除非 release review 明确批准，否则首次推送期间不要创建 release tag。
