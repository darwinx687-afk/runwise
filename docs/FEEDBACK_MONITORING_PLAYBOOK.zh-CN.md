# 反馈监控手册

手动分享 Runwise `v0.1.0-preview.0` 后，请使用本手册处理反馈。

Runwise 的反馈入口保持为 GitHub Issues 和文档化 tracker。不要添加 telemetry、analytics、hosted feedback portal、数据库、登录或 cloud sync。

## 每日监控流程

1. 检查新的 GitHub Issues。
2. 检查手动发布链接下的回复。
3. 将链接记录到 `docs/LAUNCH_POSTING_TRACKER.zh-CN.md`。
4. 适当时将可执行公开评论转成 GitHub Issues。
5. 添加 type 和 area labels。
6. 请求安全的最小复现。
7. 将重复主题记录到每周 roadmap review。

## 反馈分类

- Bug：可复现的错误行为。
- False positive：Doctor 报告了不应报告的问题。
- False negative：Doctor 漏掉了应报告的问题。
- Integration request：新增或改进本地生态检测。
- Docs issue：文案不清、示例缺失或安装说明不清。
- Question：用法澄清或范围问题。
- Security-sensitive：潜在漏洞或私有数据风险。

## Issue 标签

使用当前仓库 labels：

- `type: bug`
- `type: feature`
- `type: integration`
- `type: docs`
- `type: feedback`
- `area: doctor`
- `area: report`
- `area: dashboard`
- `area: github-action`
- `area: trace`
- `area: replay`
- `area: eval`
- `area: ecosystem`
- `area: china-ready`
- `security`
- `question`
- `good first issue`
- `help wanted`

通常使用一个 type label，加一到两个 area labels。只有范围明确且风险较低时使用 `good first issue`。需要真实用户上下文时使用 `help wanted`。

## 识别 False Positives / False Negatives

对于 Doctor 反馈，请记录：

- Rule 或 finding 名称。
- 如安全，可记录已脱敏报告片段。
- 预期行为。
- 实际行为。
- 项目类型：AI Agent、MCP、RAG、LLM app 或混合项目。
- 导致 finding 或应触发 finding 的本地信号。

重复出现的 false positives 或 false negatives 应进入每周 review。

## 处理 Integration Requests

请询问：

- 生态名称。
- 安全的本地检测信号。
- 样例文件名或已脱敏片段。
- 推荐检查项。
- 该生态属于全球生态、国内可用生态、两者都有、内部生态还是私有生态。
- 可能的误报风险。

不要索要 API keys、私有 endpoints、客户数据或专有 traces。

## 处理国内大模型 Provider 反馈

如果反馈涉及以下内容，请单独记录：

- OpenAI-compatible API base URL patterns。
- DashScope/Qwen、DeepSeek、Moonshot/Kimi、Zhipu/GLM、Minimax、Baichuan、SiliconFlow、Ollama 或其他 provider signals。
- Provider base URL、model name、data boundary、rate limit 和 fallback behavior 的文档需求。

示例应保持通用且已脱敏。

## 处理安全敏感报告

- 不要在公开 issue 中索要漏洞细节。
- 引导报告者阅读 `SECURITY.md`。
- 只有在安全时，才给公开占位 issue 加 `security` label。
- 只请求协调披露所需的最小安全上下文。
- 不要把私有安全细节复制到公开 tracker。

## 何时进入 Roadmap Review

当出现以下情况时，将反馈写入 `docs/FEEDBACK_TO_ROADMAP_REVIEW.zh-CN.md`：

- 同一主题重复出现。
- false positive 或 false negative 影响核心就绪度评分。
- integration request 已有清晰且安全的本地信号。
- 文档问题阻碍安装或试用。
- 反馈可能改变下一轮开发优先级。

## 何时拒绝或暂缓

当反馈要求以下内容时，应清楚拒绝或暂缓：

- Hosted SaaS 或 cloud sync。
- Telemetry 或 analytics。
- 登录、计费或数据库功能。
- Agent runtime orchestration。
- 模型调用、模型评审或训练。
- 在发布计划允许前进行 npm 发布或 stable release 声明。
- 官方集成或官方合作声明。
