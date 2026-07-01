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

重点：

- 改进 Markdown 和 HTML 报告可读性
- 让 finding 更容易扫描
- 解释清楚 score、severity、blocking 和 ecosystem 区块
- 如有帮助，添加便于手动反馈的 copy-to-issue snippet
- 改进报告 empty state
- 改进 category score 解释
- 不添加 hosted dashboard 或复杂产品界面

### 11E - Plugin Architecture Exploration

重点：

- 探索未来 check 如何分组或扩展
- 保持当前 rule engine 稳定
- 先记录 extension boundary，再决定是否实现
- plugin architecture 放在后面，等 Visual Report Polish 改善当前体验后再推进

## 反馈来源

- 用户打开的 GitHub Issues 和 Discussions。
- 可见的公开发布帖子评论。
- 真实源码试用者的手动反馈。
- 用 Runwise 检查示例项目时发现的问题。

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
