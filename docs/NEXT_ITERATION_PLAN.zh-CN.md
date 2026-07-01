# 下一轮迭代计划

本文档用于规划 `v0.1.0-preview.0` 之后的下一轮 Runwise preview。

它只是计划说明，不是发布公告。不要仅凭本文档发布 npm package、创建 tag、创建 release，或修改 `ROADMAP.md`。

## 定位

Runwise 帮你在 AI Agent 项目上线前做检查和复盘。

它应该像一个本地开发工具：运行检查、阅读报告、查看 trace、复盘发生了什么，并把失败沉淀成 eval case 文件。

## 下一版 Preview 的目标

让 Runwise 在前五分钟里更容易试用、更容易解释，也更容易建立信任。

## 计划工作

- 改进 README 和文档里的首次运行说明。
- 让 Doctor finding 更容易看懂。
- 根据早期反馈检查误报、漏报和评分问题。
- 增加更清楚的报告示例，但不引入 hosted service。
- 保持 trace replay 和 Failure-to-Eval 示例小而实用。
- 在未来是否发布 npm 前，先审查 package metadata。

## 反馈来源

- GitHub Issues。
- 可访问的公开发布评论。
- `docs/LAUNCH_POSTING_TRACKER.zh-CN.md`。
- `docs/FEEDBACK_TO_ROADMAP_REVIEW.zh-CN.md`。
- 早期用户提供的安全、已脱敏示例。

## 候选 Loop

| Loop | 重点 | 输出 |
| --- | --- | --- |
| Phase 11B | 首次运行更清楚 | README/docs 清理、命令 walkthrough、更清楚的源码安装说明 |
| Phase 11C | Doctor 实用性复盘 | 误报、漏报和评分调整草案 |
| Phase 11D | 报告和 replay 示例 | 更清楚的示例输出，必要时补充截图或静态产物 |
| Phase 11E | Package metadata 审查 | 仅 npm-readiness checklist，不发布 |

## 非目标

- 本计划不发布 npm。
- 不创建新 release 或 tag。
- 不添加 hosted dashboard、cloud sync、登录、计费或数据库。
- 不添加 telemetry 或 analytics。
- 不做 agent runtime orchestration。
- 不添加隐藏模型调用、模型评审或 eval 执行。
- 不声明官方集成或官方合作。

## 成功标准

- 新访客能在一两分钟内理解 Runwise。
- 开发者能按源码安装路径运行，不需要猜下一条命令。
- Doctor、trace replay 和 Failure-to-Eval 都有清楚的白话说明。
- 反馈能被归类为文档修复、Doctor 规则修复、integration signal 或暂缓的非目标。
- 任何未来 package 或 release 步骤发生前，都先有 checklist。
