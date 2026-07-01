<p align="center">
  <img src="./assets/runwise-banner.svg" alt="Runwise - AI Agent 上线前检查">
</p>

# Runwise

![License MIT](https://img.shields.io/badge/license-MIT-0f766e)
![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-2563eb)
![pnpm workspace](https://img.shields.io/badge/pnpm-workspace-f59e0b)
![Local-first](https://img.shields.io/badge/local--first-yes-14b8a6)
![Bilingual](https://img.shields.io/badge/docs-English%20%2F%20中文-8b5cf6)
![GitHub Action ready](https://img.shields.io/badge/GitHub%20Action-ready-111827)

[English](./README.md) | [中文](./README.zh-CN.md)

Runwise 帮你在 AI Agent 项目上线前先做一次本地检查。

它会在本地检查项目结构、生成报告、验证 trace、静态复盘运行过程，并把失败记录转成 eval 用例。

我做这个工具的原因很简单：很多 AI demo 能跑，但真正要交付、上线、给团队或客户看时，还需要回答一些更实际的问题：

- 这个项目现在适不适合 review？
- MCP / tool 调用里有没有明显风险？
- 有没有 trace 记录？
- 失败以后能不能复盘？
- 失败能不能沉淀成 eval case？
- 能不能生成一份团队或客户看得懂的报告？

**公开预览：** Runwise 目前只支持源码方式试用，还没有 npm package，没有 GitHub Marketplace release，也不声明任何官方生态集成或合作。它是本地优先工具，不上传项目数据，不调用模型，也不要求登录。

## 5 分钟试一下

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
pnpm install
pnpm check
pnpm test
pnpm exec runwise doctor
pnpm exec runwise view
```

生成的报告：

```text
.runwise/runwise-report.json
.runwise/runwise-report.md
.runwise/runwise-report.html
```

如果你的全局 pnpm 行为不一致，建议使用 `package.json` 中声明的 pnpm 版本，或启用 Corepack。

## 你会看到什么

运行 `runwise doctor` 后，你会得到：

- 一个 readiness 分数
- 一组项目检查结果
- 检测到的 AI 项目生态线索
- JSON / Markdown / HTML 报告
- 一个本地 dashboard 查看页面

<p align="center">
  <img src="./assets/runwise-5-minute-flow.svg" alt="Runwise 5 分钟流程">
</p>

想快速理解使用前后差异，可以看 [这张 before/after 图](./assets/runwise-before-after.svg)。

## 从这里开始

- [首次运行 walkthrough](./docs/FIRST_RUN_WALKTHROUGH.zh-CN.md)
- [示例 Gallery](./docs/EXAMPLE_GALLERY.zh-CN.md)
- [英文文档](./docs/en/index.md)
- [中文文档](./docs/zh-CN/index.md)
- [Preview Release](https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0)

## Runwise 当前能做什么

| 领域 | 当前能力 |
| --- | --- |
| Doctor | 检查 workspace 结构、包管理器状态、TypeScript 配置、治理文件、AI 线索、MCP 线索、trace 覆盖、eval 覆盖和生态信号。 |
| Reports | 在 `.runwise/` 下写入 JSON、Markdown 和静态 HTML artifact。 |
| View | 从 `.runwise/runwise-report.json` 打开本地 dashboard 查看页面。 |
| Trace validation | 验证本地 `runwise.agent_trace` 文件和目录。 |
| Trace replay | 为验证过的 trace 生成一份静态 Markdown 复盘报告。 |
| Failure-to-Eval | 从验证过的 trace 确定性生成 JSON/YAML/Markdown eval case 草稿。 |
| 生态检测 | 识别 MCP、RAG、browser agent、Dify-style workflow、Codex-style project、OpenAI-compatible API 和国内大模型服务商的本地线索。 |

## 命令

```bash
pnpm exec runwise doctor
pnpm exec runwise doctor --cwd . --output .runwise
pnpm exec runwise view
pnpm exec runwise trace validate examples/traces/valid-agent-run.json
pnpm exec runwise trace validate examples/traces
pnpm exec runwise trace replay examples/traces/mcp-risk-agent-run.json
pnpm exec runwise eval generate examples/traces/mcp-risk-agent-run.json
```

如果目录里包含无效 fixture，目录 trace 验证可能以退出码 `1` 结束。

## 示例项目

如果想知道每个示例在展示什么，先看 [示例 Gallery](./docs/EXAMPLE_GALLERY.zh-CN.md)。

- `examples/mcp-demo`
- `examples/rag-demo`
- `examples/browser-agent-demo`
- `examples/enterprise-workflow-demo`
- `examples/china-ready-llm-demo`
- `examples/codex-project-demo`
- `examples/traces`

这些示例都是轻量 fixture。它们不会安装真实 AI framework，不会调用外部 API，不会运行模型，也不会执行工具。

## 架构概览

```text
apps/
  dashboard/                 本地 report-file dashboard viewer。
  docs/                      文档应用外壳。
packages/
  cli/                       Runwise 命令行界面。
  core/                      本地扫描、规则引擎、评分、trace、replay 和 eval 生成逻辑。
  schemas/                   共享 TypeScript schema 契约。
  reporter/                  JSON、YAML、Markdown 和 HTML artifact 生成。
  integrations/              本地生态 profile 和检测边界。
  github-action/             GitHub Action summary 和 threshold helper。
docs/
  en/                        英文 Markdown 文档。
  zh-CN/                     简体中文 Markdown 文档。
```

Runwise 不会运行你的 agent、执行工具、上传 trace、训练模型，也不会把项目数据存到 hosted service。

## 路线图

- Phase 0-2：项目基础、Doctor CLI、规则引擎和评分。
- Phase 3-5：报告、本地 dashboard viewer 和 GitHub Action 就绪度检查。
- Phase 6-8：Trace 验证、静态复盘和 Failure-to-Eval 生成。
- Phase 9：生态兼容性检测和示例。
- Phase 10：开源发布展示打磨。
- Phase 11：首次开发者体验、示例和报告可读性。

见 [ROADMAP.md](./ROADMAP.md) 和 [下一轮迭代计划](./docs/NEXT_ITERATION_PLAN.zh-CN.md)。

## 欢迎反馈

Runwise 目前处于 public preview。最有帮助的反馈包括：

- Doctor finding 是否误报或漏报
- AI 生态检测线索是否缺失
- trace schema 是否好用
- replay 报告是否清楚
- Failure-to-Eval 是否有实际价值
- 国内大模型服务商检测还缺什么

请不要在公开 issue 中包含密钥、客户隐私数据或专有 trace。

参见 [反馈指南](./docs/FEEDBACK_GUIDE.zh-CN.md)、[早期用户测试指南](./docs/EARLY_USER_TESTING_GUIDE.zh-CN.md) 和 [反馈到路线图 Review](./docs/FEEDBACK_TO_ROADMAP_REVIEW.zh-CN.md)。

## 贡献

提交变更前，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)、[PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) 和 [CODEX_LOOP_PROTOCOL.md](./CODEX_LOOP_PROTOCOL.md)。

## 安全

Runwise 采用本地优先设计，运行时代码避免隐藏网络调用。报告安全问题前请阅读 [SECURITY.md](./SECURITY.md)。

## 许可证

Runwise 使用 [MIT License](./LICENSE) 发布。
