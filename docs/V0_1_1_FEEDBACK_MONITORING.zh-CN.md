# v0.1.1 反馈监控

本文档定义 `v0.1.1-preview.0` 发布后需要观察的反馈。

不要根据本文档自动创建 GitHub Issues。

## Release 链接

- GitHub: https://github.com/darwinx687-afk/runwise
- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

## 需要观察什么

### 首次运行是否清楚

- 用户能不能很快找到该运行哪条命令？
- 用户是否注意到目前只支持源码安装？
- 用户是否理解为什么推荐 `pnpm@9.15.4`？
- Corepack 或全局 pnpm 差异是否带来摩擦？

### 安装问题

关注：

- Node.js 版本不匹配
- 缺少 pnpm
- 缺少 Corepack
- lockfile 或安装警告
- 用户混淆 `pnpm install` 和 `npx -y pnpm@9.15.4 install --frozen-lockfile`

### Doctor Findings

关注：

- 误报
- 漏报
- rule ID 不清楚
- recommendation 不清楚
- low/info finding 过于嘈杂

### 报告可读性

关注：

- 用户没有注意到 “What to fix first”
- 对 score 理解不清
- severity 区块不容易扫描
- dashboard empty state 不够清楚
- 报告不方便分享给团队

### Trace / Replay / Eval 术语

关注：

- 不理解 trace schema
- 混淆 static replay 和重新运行 agent
- 混淆 Failure-to-Eval 和执行 eval
- 希望导出到 Promptfoo 等工具

### 对比问题

关注：

- “这是不是像 Langfuse？”
- “这是不是像 Promptfoo？”
- “这和 Dify / Open WebUI 是什么关系？”
- “什么时候应该先用 Runwise？”

### 插件兴趣

关注：

- MCP rule pack 需求
- RAG rule pack 需求
- 国内大模型 provider 检测需求
- 团队 policy checks 需求
- 误以为 plugin support 已经实现

### npm 请求

关注：

- 希望使用 `npm install -g runwise`
- 不理解为什么目前 source-install only
- 对 package name 的期待
- 询问何时发布 npm

## 建议 GitHub Labels

```text
type: feedback
type: docs
type: feature
area: doctor
area: report
area: trace
area: eval
area: ecosystem
area: docs
area: install
area: release
```

## 反馈分拣方式

对每条有价值的反馈记录：

- 来源
- 公开链接，如果有
- 摘要
- 是否可执行
- 可能的 area label
- 是否需要 GitHub Issue
- 是否需要移除 secrets 或私密信息

## 推荐下一步

根据 `v0.1.1-preview.0` 反馈，在下面方向中做选择：

- Phase 11M - 监控反馈并做小的 follow-up fixes
- Phase 12A - local JSON rule pack MVP
- New Project Research - 下一个 AI 开源方向研究
