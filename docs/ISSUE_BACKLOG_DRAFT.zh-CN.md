# Issue Backlog 草稿

这是本地规划草稿。本轮不要根据这个文档自动创建 GitHub Issues。

## Documentation

### 收紧 README 第一屏

- Type label: `type:docs`
- Area label: `area:readme`
- Priority: high
- 为什么重要：第一次访问的用户需要很快从“这是什么”走到“怎么试”。
- Acceptance criteria:
  - README 保留 public-preview 边界。
  - 第一条命令足够明显。
  - comparison 和 examples 有链接，但不挤占第一屏。

### 添加对比说明

- Type label: `type:docs`
- Area label: `area:positioning`
- Priority: high
- 为什么重要：用户可能会拿 Runwise 和 Langfuse、Promptfoo、Dify、Open WebUI 对比。
- Acceptance criteria:
  - 对比语气尊重。
  - Runwise 被描述为本地上线前检查和复盘层。
  - 不贬低其他项目。

### 添加干净环境安装 walkthrough

- Type label: `type:docs`
- Area label: `area:quick-start`
- Priority: high
- 为什么重要：当前只支持源码安装，这是最大的试用摩擦。
- Acceptance criteria:
  - 覆盖 Node.js 和 pnpm/Corepack。
  - 包含预期输出。
  - 包含常见失败恢复说明。

### 添加“在自己的项目上测试 Runwise”指南

- Type label: `type:docs`
- Area label: `area:doctor`
- Priority: medium
- 为什么重要：用户需要知道 Runwise 能不能用在自己的 repo 上。
- Acceptance criteria:
  - 展示带 `--cwd` 的安全命令。
  - 解释生成的 `.runwise/` 文件。
  - 说明如何在不包含 secrets 的情况下反馈。

## Developer Experience

### 改进源码安装说明

- Type label: `type:dx`
- Area label: `area:install`
- Priority: high
- 为什么重要：目前还没有 npm package。
- Acceptance criteria:
  - 文档中的源码安装能在干净环境跑通。
  - pnpm 版本说明清楚。
  - Corepack 路径有说明。

### 解释 pnpm 和 Corepack 行为

- Type label: `type:dx`
- Area label: `area:package-manager`
- Priority: medium
- 为什么重要：全局 pnpm 版本差异可能让用户困惑。
- Acceptance criteria:
  - README 或 Quick Start 指向声明的 package manager 版本。
  - 有清楚的 fallback command。

### 打磨 `runwise --help`

- Type label: `type:dx`
- Area label: `area:cli`
- Priority: medium
- 为什么重要：用户可能先看 CLI help，再看文档。
- Acceptance criteria:
  - help text 说明 source preview。
  - 命令分组清楚。
  - 不暗示 plugin 或 npm 已可用。

### 改进 Doctor 终端文案

- Type label: `type:dx`
- Area label: `area:doctor`
- Priority: medium
- 为什么重要：终端输出通常是用户看到的第一个结果。
- Acceptance criteria:
  - score 和 report path 清楚。
  - 下一步动作明显。
  - 不用太多细节淹没输出。

## Report UX

### 改进 HTML 报告文案

- Type label: `type:docs`
- Area label: `area:report`
- Priority: medium
- 为什么重要：静态报告可能会分享给团队成员。
- Acceptance criteria:
  - “What to fix first” 简洁。
  - severity sections 容易扫描。
  - local-first footer 保持可见。

### 改进 dashboard empty state

- Type label: `type:ux`
- Area label: `area:dashboard`
- Priority: low
- 为什么重要：小项目可能 finding 很少，或者没有检测到 ecosystem。
- Acceptance criteria:
  - empty state 解释发生了什么。
  - 没有空白区块。
  - 不暗示 hosted dashboard。

### 后续添加 copy-to-issue snippet

- Type label: `type:ux`
- Area label: `area:report`
- Priority: low
- 为什么重要：用户可能想把 finding 转成任务。
- Acceptance criteria:
  - snippet 是本地静态内容。
  - 不自动创建 issue。
  - finding 内容保持简洁。

## Trace / Eval

### 解释 trace schema 示例

- Type label: `type:docs`
- Area label: `area:trace`
- Priority: medium
- 为什么重要：第一次使用的用户可能还不熟悉 trace 术语。
- Acceptance criteria:
  - 示例解释每种 step type。
  - validation error 容易理解。
  - risky MCP trace 清楚标注为 fixture。

### 改进 Failure-to-Eval 示例

- Type label: `type:docs`
- Area label: `area:eval`
- Priority: medium
- 为什么重要：用户需要看到为什么把失败转成 eval case 有用。
- Acceptance criteria:
  - 示例并排展示 source trace 和生成 case。
  - expected behavior 和 must-not behavior 有解释。
  - 不暗示 eval execution 或 model judging。

### Review promptfoo-compatible export

- Type label: `type:research`
- Area label: `area:eval`
- Priority: low
- 为什么重要：Promptfoo 用户未来可能需要导出路径。
- Acceptance criteria:
  - 只做研究。
  - 未批准前不实现 exporter。
  - 记录它应该属于 core 还是后续 plugin/rule-pack 阶段。

## Ecosystem Detection

### 改进国内大模型 provider 检测

- Type label: `type:rules`
- Area label: `area:integrations`
- Priority: medium
- 为什么重要：provider 配置信号对真实交付 review 很有用。
- Acceptance criteria:
  - 增加 false positive 和 false negative fixture。
  - 保持本地启发式检测。
  - 不声明官方合作。

### 添加更多 MCP 高风险 tool 名称示例

- Type label: `type:rules`
- Area label: `area:mcp`
- Priority: medium
- 为什么重要：MCP 用户需要更清楚的 tool-risk 指引。
- Acceptance criteria:
  - 示例覆盖 shell、filesystem write、delete、send、payment-like 名称。
  - recommendation 保持实用。
  - 不加入 tool execution。

### 添加误报 / 漏报 fixture

- Type label: `type:test`
- Area label: `area:doctor`
- Priority: medium
- 为什么重要：基于反馈调规则需要可复现示例。
- Acceptance criteria:
  - fixture 很小。
  - 不调用外部 API。
  - 记录预期 finding。

## CI / Release

### 调查 GitHub Actions Node.js 20 annotation

- Type label: `type:ci`
- Area label: `area:github-action`
- Priority: medium
- 为什么重要：CI 通过，但 annotation 会影响信任感。
- Acceptance criteria:
  - 找到触发 annotation 的 action。
  - 只有安全时才修复。
  - 保持现有 readiness 行为不变。

### 后续准备 npm publish review

- Type label: `type:release`
- Area label: `area:package`
- Priority: low
- 为什么重要：用户最终会期待 npm，但 package metadata 应先 review。
- Acceptance criteria:
  - review package names 和 entrypoints。
  - 记录 publish 边界。
  - planning loop 不执行 publish。

### v0.1.1 只在完成改进后再打 tag

- Type label: `type:release`
- Area label: `area:release`
- Priority: high
- 为什么重要：`v0.1.1-preview.0` 应代表已经完成的实际改进。
- Acceptance criteria:
  - 本地检查通过。
  - GitHub Actions 通过。
  - changelog 和 release notes 已更新。
  - 没有跟踪生成的 `.runwise/` artifact。
