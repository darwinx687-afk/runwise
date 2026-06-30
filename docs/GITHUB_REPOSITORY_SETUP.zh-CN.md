# GitHub 仓库设置

本文档用于准备 Runwise 的公开仓库设置。在最终仓库 URL 确认之前，它不要求远程仓库已经存在，也不应被视为立即推送指令。

## Loop 10A 状态

- Loop 10A 未提供远程仓库 URL。
- 在 GitHub 仓库创建且 URL 确认之前，不要运行 `git remote add` 或 `git push`。
- 当前分发方式仍然是从源码安装。
- 在公开仓库正确渲染且 CI 通过之前，暂缓 npm 发布、GitHub Marketplace 声明和 release tag。

## 推荐仓库元数据

- 仓库名称：`runwise`
- 可见性：public
- 描述：`Local-first readiness, trace replay, and eval generation toolkit for AI agents, MCP servers, RAG, and LLM apps.`
- 默认分支：`main`
- License：MIT

## 建议 Topics

```text
ai-agents
agentops
mcp
llmops
rag
evals
trace
developer-tools
github-action
local-first
typescript
bilingual
```

## 仓库创建检查清单

- 创建名为 `runwise` 的新 GitHub 仓库。
- 不要让 GitHub 初始化 README、license 或 `.gitignore`；这些文件已经在本地存在。
- 在添加 `origin` 前，请维护者确认仓库 URL。
- 首次推送后确认默认分支是 `main`。
- 保持 `.runwise/` 生成报告被忽略且可复现。

## GitHub Actions

仓库包含 `.github/workflows/runwise.yml`，并在 `action.yml` 中提供本地 composite action。

当前用法仅限本仓库内部：

```yaml
- uses: ./
```

公开版本化用法属于后续工作，需要先创建 release tag：

```yaml
# 仅限未来，在公开 release tag 存在后使用：
- uses: <owner>/<repo>@v0
```

在 GitHub Marketplace listing 存在之前，不要声明 Marketplace 可用。

## 后续发布步骤

首次公开推送后：

- 检查 README 渲染和 SVG 资源显示。
- 检查 GitHub Actions 成功运行。
- 在任何 npm 发布前审查 package metadata。
- 只在 release review 之后创建第一个 tag。
- 在合适位置替换仓库 URL 占位，同时让未来版本示例保持清晰的 future-only 标记。
