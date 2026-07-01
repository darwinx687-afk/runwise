# 手动发布流程

本流程帮助项目所有者手动分享 Runwise `v0.1.0-preview.0`，记录分享渠道，并把反馈收敛到 GitHub Issues。

不要从本仓库自动向外部平台发布内容。不要发布 npm package，不要创建 stable release，不要移动 tag，不要添加 telemetry，也不要暗示 hosted SaaS 可用。

## 发布目标

以 public preview 的方式分享 Runwise，邀请早期用户通过源码安装试用，并反馈本地优先 AI Agent 就绪度、trace replay、Failure-to-Eval 和生态兼容性检测。

## 目标受众

- 构建 AI Agent、MCP server、RAG workflow 或 LLM application 的开发者。
- 需要在 demo、CI 门禁或发布前获得就绪度证据的维护者。
- 正在评估本地优先 AgentOps 工作流的 AI/LLMOps 从业者。
- 需要可审阅本地报告的 FDE 和企业 AI 落地团队。
- 关注全球和国内大模型 provider pattern 的开发者。

## 推荐发布顺序

1. GitHub 仓库最终检查。
2. 个人 LinkedIn / X 或朋友圈 / 即刻。
3. 开发者社区。
4. AI/LLMOps 社区。
5. 面向中国开发者的技术社区。
6. 直接分享给可信任的 AI builder / FDE / developer。
7. 将反馈收敛到 GitHub Issues。

## 优先发布渠道

- GitHub。
- 朋友圈 / 即刻。
- V2EX。
- 掘金。
- 小红书技术向。
- AI 开发者社群。
- 国内企业 AI 落地相关社群。

避免重复刷屏。优先选择少量高信号渠道，并认真回复。

## 不要声明什么

- 不要声明 npm 可用。
- 不要声明 stable release。
- 不要声明 GitHub Marketplace 可用。
- 不要声明官方生态集成或官方合作。
- 不要声明 hosted SaaS、cloud sync、telemetry、登录、数据库或 agent runtime。
- 不要暗示 Runwise 可以替代完整 observability、evaluation 或 agent framework 平台。

## 如何按平台调整文案

- 朋友圈 / 即刻：强调本地优先、可审阅证据和欢迎反馈。
- V2EX / 掘金：说明当前能力、源码安装方式和明确边界。
- 小红书技术向：用更短的问题场景开头，避免夸张营销。
- AI 开发者社群：直接询问 Doctor finding、trace replay 和 eval 草稿是否有用。
- 企业 AI 落地社群：强调本地报告、数据边界和国内大模型 provider 检测反馈。
- 私下分享：根据对方场景提出一两个具体问题。

## 记录发布链接

使用 `docs/LAUNCH_POSTING_TRACKER.zh-CN.md` 记录每一次手动发布：

- 平台。
- 发布类型。
- 链接。
- 日期。
- 受众。
- 初始反馈。
- 反馈主题。
- 是否需要跟进。
- 相关 issue 链接。

不要添加 analytics script、tracking pixel、telemetry 或 hosted feedback form。

## 如何回复早期反馈

- 及时感谢。
- 请求安全的最小复现。
- 将可执行反馈转成 GitHub Issues。
- 按类型和领域打 label。
- 不要在公开 issue 中展开安全敏感细节。
- 对超出范围的请求清楚说明暂不支持。

可使用 `docs/ISSUE_RESPONSE_TEMPLATES.zh-CN.md` 保持回复一致。

## 发布后 24 小时

- 至少检查两次 GitHub Issues 和通知。
- 在 posting tracker 中记录所有公开链接。
- 分流 bug、误报、漏报和 integration request。
- 添加 type 和 area labels。
- 如果外部文案暗示 npm、hosted SaaS、stable release 或官方集成，请及时修正。
- 记录重复问题，供后续 feedback-to-roadmap review 使用。

## 发布后 7 天

- 每天复盘反馈主题。
- 找出最常见的 false positives 和 false negatives。
- 找出请求最多的 integrations。
- 记录令人困惑的文档和安装阻碍。
- 单独整理国内大模型服务商反馈。
- 将已验证反馈转成 GitHub Issues。
- 使用 `docs/FEEDBACK_TO_ROADMAP_REVIEW.zh-CN.md` 做每周复盘。
