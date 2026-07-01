# v0.1.1 分享文案包

这里是 `v0.1.1-preview.0` 的分享文案草稿。

未经用户确认，不要发布到外部平台。

## 链接

- GitHub: https://github.com/darwinx687-afk/runwise
- Release: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

## 推荐表达

这是一次小的 public preview polish 更新。

推荐表达重点：

- 首次开发者体验
- 源码安装更清楚
- 报告更容易读
- 示例更具体
- 希望收到真实反馈

避免表达成：

- 重大功能发布
- stable release
- npm package 已可用
- plugin support 已实现
- 官方生态集成

## 中文短帖

```text
Runwise 做了一个 v0.1.1 preview 小更新。

这次没有急着加新功能，主要是在优化第一次打开项目的人能不能更快看懂、更快跑起来：

- README 更清楚了
- 加了 5 分钟试用路径
- 加了干净环境安装复核
- 示例展示更完整
- HTML report 和本地 dashboard 更容易看
- 加了和 Langfuse / Promptfoo / Dify / Open WebUI 的对比说明
- 也整理了未来插件规则包的设计，但目前还没有实现插件运行

项目还是 source-install only，没有 npm 包。

GitHub：
https://github.com/darwinx687-afk/runwise

v0.1.1-preview.0：
https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

如果你正在做 AI Agent / MCP / RAG / LLM app，欢迎帮我看看这个方向有没有实际价值。
```

## 中文长帖

```text
Runwise 更新到 v0.1.1-preview.0 了。

这次不是一个“加很多功能”的版本，更像是一次把项目对外体验重新收拾干净的小版本。

我发现一个开源项目刚发出去以后，真正影响别人愿不愿意试的，往往不是功能列表有多长，而是几个更直接的问题：

- 第一次打开 README 能不能马上知道它是干什么的？
- 能不能在几分钟内从源码跑起来？
- 跑完以后看到的报告是否清楚？
- 示例是不是足够具体？
- 如果结果有误报或漏报，用户知不知道怎么反馈？

所以 v0.1.1 主要做了这些：

- 收紧 README 和首次运行路径
- 添加 clean install checklist
- 记录 clean-machine install review
- 改进 Example Gallery 和 sample output
- 优化静态 HTML report 和本地 dashboard 的可读性
- 添加 report reading guide
- 添加与 Langfuse / Promptfoo / Dify / Open WebUI 的对比说明
- 整理未来 plugin / rule-pack 架构探索

需要说明的是，Runwise 现在仍然是 public preview。

目前：

- 只支持源码方式试用
- 没有 npm package
- 没有 hosted service
- 没有 telemetry
- 没有 login / database / cloud sync
- 插件运行能力还没有实现，只是先写了设计探索

GitHub：
https://github.com/darwinx687-afk/runwise

v0.1.1-preview.0：
https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

如果你在做 AI Agent、MCP、RAG 或 LLM app，我现在最想听到的反馈是：

1. 源码安装路径是否清楚？
2. Doctor report 是否容易看懂？
3. finding 有没有明显误报或漏报？
4. trace / replay / eval 这些概念是否需要更简单的解释？
5. 未来本地规则包是否有实际价值？
```

## LinkedIn 英文帖

```text
I just published Runwise v0.1.1-preview.0.

This update is not about adding more features. It focuses on making the project easier to understand, install, review, and trust as a first-time developer.

What changed:

- simpler README and first 5-minute flow
- clean install checklist
- clean-machine install review
- improved Example Gallery and curated output samples
- better static HTML report and local dashboard readability
- comparison docs for Langfuse, Promptfoo, Dify, and Open WebUI
- draft plugin/rule-pack architecture docs

Runwise is still source-install only and not published to npm yet.

GitHub:
https://github.com/darwinx687-afk/runwise

Release:
https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

I’d especially love feedback on whether the first-run experience is clear enough and whether the report output feels useful for AI Agent / MCP / RAG projects.
```

## X / Twitter 英文帖

```text
Runwise v0.1.1-preview.0 is out.

This preview focuses on first-time developer experience: clearer README, clean install checklist, example gallery, better reports, dashboard readability, and comparison docs.

Source-install only, no npm yet.

https://github.com/darwinx687-afk/runwise
```

## V2EX 文案

```text
做了一个 Runwise v0.1.1-preview.0 小更新。

Runwise 是一个本地优先的 AI Agent / MCP / RAG 项目上线前检查工具，主要做 Doctor 检查、报告生成、trace 验证、静态 replay 和 Failure-to-Eval。

这次更新没有加大功能，主要是把第一次使用体验整理了一遍：

- README 更短、更容易扫
- 加了 5 分钟试用路径
- 加了 clean install checklist
- 做了一次 clean-machine install review
- 示例 Gallery 和 sample output 更具体
- HTML report 和本地 dashboard 更容易看
- 加了和 Langfuse / Promptfoo / Dify / Open WebUI 的对比说明

目前仍然是 public preview，只支持源码安装，还没有 npm 包。

GitHub：
https://github.com/darwinx687-afk/runwise

Release：
https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

想请大家帮忙看几个点：

1. 源码安装路径是否清楚？
2. Doctor 报告是否有用？
3. finding 有没有明显误报或漏报？
4. trace / replay / eval 这条链路是否好理解？
5. 未来本地 JSON rule pack 是否值得做？
```

## GitHub Discussion 草稿

```markdown
# Runwise v0.1.1-preview.0 feedback thread

Runwise v0.1.1-preview.0 is a small preview polish update focused on first-time developer experience.

Release:
https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

Feedback that would help most:

- Was the source-install path clear?
- Did `runwise doctor` produce a useful report?
- Were any findings noisy or missing?
- Did the trace / replay / eval docs make sense?
- Would local JSON rule packs be useful for your project or team?

Please do not share secrets, private customer data, proprietary traces, or API keys in public comments.
```
