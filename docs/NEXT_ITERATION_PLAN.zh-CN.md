# 下一轮迭代计划

## 定位

Runwise 帮你在 AI Agent 项目上线前先做一次本地检查。

它会在本地检查项目结构、生成报告、验证 trace、静态复盘运行过程，并把失败记录转成 eval 用例。

## 下一版 Preview 的目标

在增加更大产品能力之前，先让 Runwise 更容易理解、更容易从源码试用、更容易 review。

下一轮仍然保持本地优先、源码安装友好，并诚实说明 public preview 状态。

## Phase 11 结构

### 11B - First 5-Minute Experience

状态：本轮已完成。

重点：

- README 第一印象更清楚
- 5 分钟源码试用流程
- 首次运行 walkthrough
- 示例 Gallery
- 简单视觉说明
- 文档入口整理

### 11C - Example Gallery Polish and Visual Report Samples

状态：本轮已完成。

重点：

- 为 MCP、RAG、replay、eval 和生态检测添加 SVG 示例卡片
- 添加整理过的 Doctor 报告、Trace Replay、Failure-to-Eval 和生态检测 sample
- 改进示例说明，补充运行命令、重点看什么和相关 sample output
- 保持示例轻量、本地化，并与生成的 `.runwise/` artifact 分开

### 11D - Visual Report Polish

状态：本轮已完成。

重点：

- 改进 Markdown 和 HTML 报告可读性
- 让 finding 更容易扫描
- 解释清楚 score、severity、blocking 和 ecosystem 区块
- 添加 report preview SVG 和报告阅读指南
- 改进报告 empty state
- 改进 category score 解释
- 不添加 hosted dashboard 或复杂产品界面

### 11E - Plugin Architecture Exploration

状态：本轮已完成。

重点：

- 梳理插件目标和非目标
- 起草 plugin manifest
- 起草 JSON rule pack 格式
- 添加 documentation-only 插件示例
- 决定是否在 Phase 12 实现
- 不加入 runtime plugin execution

### 11F - Self-review and v0.1.1-preview.0 Planning

状态：本轮已完成。

重点：

- 从整体上 review Phase 11 文档和示例
- 判断插件实现应该继续等待，还是进入 Phase 12
- 如有必要，准备一个小的 v0.1.1-preview.0 计划
- 除非明确批准，继续暂缓 npm 发布、tag 和新 release

### 11G - First v0.1.1 Usability Fixes

状态：本轮已完成。

重点：

- 收紧 README 扫描路径
- 改进源码安装和 Corepack 指引
- 添加“在自己的 AI 项目上测试 Runwise”指南
- 改进 Doctor 反馈流程
- 不实现 runtime plugin

### 11H - Clean-machine Install Review

状态：本轮已完成。

重点：

- 在干净环境中测试源码安装
- 记录常见安装摩擦
- 验证 report generation 和本地 viewer 行为
- 除非明确批准，继续暂缓 npm 发布

### 11I - v0.1.1 Release Candidate

状态：本轮已完成。

重点：

- 只有在 usability fix 完成后才准备 release notes
- 运行完整本地和 GitHub 检查
- 验证 `.runwise/` artifact 仍然被忽略
- 未明确批准 release candidate loop 前，不创建 tag

### 11J - Approve and Create v0.1.1-preview.0 Tag

状态：本轮已完成。

重点：

- 创建 tag 前需要用户明确批准
- 运行最终状态和检查命令
- 只有在批准后才创建并推送 `v0.1.1-preview.0`
- 除非下一轮明确包含 GitHub Release 创建，否则不创建 GitHub Release

### 11K - Create GitHub Prerelease v0.1.1-preview.0

状态：本轮已完成。

重点：

- 基于已有 tag 创建 GitHub prerelease
- 验证 prerelease、not draft 和 not latest 状态
- 继续暂缓 npm 发布和 Marketplace 发布
- 在文档中记录 release

### 11L - Post-release Verification and v0.1.1 Sharing Pack

状态：本轮已完成。

重点：

- 发布后验证已公开的 prerelease
- 必要时更新 README release 链接
- 准备中英文轻量分享文案
- 准备反馈监控说明
- 不对外发布内容
- 将 v0.1.1 表达为首次开发者体验优化，而不是重大功能发布

## 下一步选项

选择一个：

- Phase 11M - Monitor v0.1.1 Feedback and Small Follow-up Fixes
- Phase 12A - Local JSON Rule Pack MVP
- New Project Research - Next AI Open-source Direction

plugin runtime 仍然是未来工作，只有在明确批准后才推进。

## 反馈来源

- 用户打开的 GitHub Issues 和 Discussions。
- 可见的公开发布帖子评论。
- 真实源码试用者的手动反馈。
- 用 Runwise 检查示例项目时发现的问题。
- v0.1.1 分享和反馈监控文档。

## 非目标

- 发布 npm。
- 发布 GitHub Marketplace。
- hosted service、登录、计费、数据库或 cloud sync。
- agent runtime orchestration。
- 模型调用、模型评审或 eval 执行。
- 声明官方生态合作。

## 成功标准

- 新访客能在 README 第一屏理解 Runwise 做什么。
- 开发者能在大约 5 分钟内跑完源码试用流程并看到报告。
- 示例说明不只是文件列表，而是告诉用户应该看什么。
- 报告和 replay 反馈可以转成小而明确的后续任务。
