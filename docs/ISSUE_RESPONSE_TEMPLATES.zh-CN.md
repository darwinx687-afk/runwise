# Issue 回复模板

以下内容可作为 GitHub Issue 回复起点。请根据具体 issue 调整，并避免在公开评论中暴露安全敏感细节。

## Bug 报告已收到

感谢清晰的报告。我会尝试根据你提供的命令和环境复现。

也请确认 Runwise commit 或 release tag，以及是否可以安全分享一小段已脱敏的 `.runwise` 报告片段。请不要包含密钥、客户隐私数据或专有 trace。

## False Positive 报告

感谢反馈，这看起来可能是 Doctor false positive。

为了正确判断，请补充 rule 或 finding 名称、预期行为，以及为什么本地信号应被视为可接受。如果安全，一小段已脱敏报告片段会很有帮助。

## False Negative 报告

感谢反馈，这听起来可能是 Doctor false negative。

请分享应触发 finding 的本地文件名、package 名称、config 名称或安全片段。请保持示例最小化并完成脱敏。

## Integration Request

感谢 integration request。这属于本地生态兼容性检测范围。

请提供生态名称、安全的本地检测信号、推荐检查项，以及该生态属于全球生态、国内可用生态、两者都有、内部生态还是私有生态。请不要包含 API key、私有 endpoint、客户数据或专有 trace。

## 国内大模型 Provider 检测请求

感谢国内大模型 provider 反馈。

请分享通用且已脱敏的本地信号，例如环境变量名、docs 字符串、package 名称或 config 文件名。也请说明该 provider pattern 是否 OpenAI-compatible，以及需要检查哪些部署说明，例如 base URL、model name、data boundary、rate limit 或 fallback behavior。

## Trace Schema 反馈

感谢 trace schema 反馈。

请描述目前难以表达的事件结构。如果安全，可以提供一小段已脱敏 JSON 示例；如果不方便，用自然语言描述事件也可以。

## Failure-to-Eval 反馈

感谢你审查 Failure-to-Eval 输出。

请说明哪些部分最有用或最不清楚：expected behavior、prohibited behavior、assertions、risk tags、JSON、YAML 或 Markdown。如果反馈来自真实 trace，请保持细节脱敏。

## 安全敏感反馈引导

感谢提醒。请不要在公开 issue 中分享漏洞细节、密钥、客户隐私数据或专有 trace。

请按照 `SECURITY.md` 处理，并只分享协调披露所需的最小安全上下文。

## 不在当前范围内

感谢建议。这个请求超出当前 Runwise preview 范围。

Runwise 目前是本地优先、仅支持源码安装。Hosted SaaS、cloud sync、telemetry、登录、计费、数据库、agent runtime orchestration、模型调用、npm 发布、stable release 声明和官方集成声明在当前阶段都不包含。

除非后续 loop 调整项目范围，否则我会将此项关闭或暂缓。

## 感谢反馈

感谢你试用 Runwise 并提供反馈。这有助于在不添加 hosted infrastructure 或隐藏运行时行为的前提下，确定下一步本地优先改进方向。
