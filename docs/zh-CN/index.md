# Runwise 文档

Runwise 帮你在 AI Agent 项目上线前先做一次本地检查。

它会在本地生成报告、验证 trace、静态复盘运行过程，并把失败记录转成 eval 用例。当前 preview 只支持源码方式试用，不上传项目数据。

## 从这里开始

- [首次运行 Walkthrough](../FIRST_RUN_WALKTHROUGH.zh-CN.md)
- [示例 Gallery](../EXAMPLE_GALLERY.zh-CN.md)
- [Demo Output 示例](../demo-output/README.zh-CN.md)
- [报告阅读指南](../REPORT_READING_GUIDE.zh-CN.md)
- [快速开始](./quick-start.md)
- [命令参考](./commands.md)
- [GitHub Action](./github-action.md)
- [Trace Schema](./trace-schema.md)
- [Failure-to-Eval / 失败转评测](./failure-to-eval.md)
- [生态兼容性](./ecosystem-compatibility.md)
- [反馈指南](../FEEDBACK_GUIDE.zh-CN.md)

## 先看输出示例

- [可视化报告示例](../demo-output/visual-report-sample.zh-CN.md)
- [报告预览图](../../assets/report-preview.svg)
- [Doctor 报告示例](../demo-output/doctor-report-sample.zh-CN.md)
- [Trace Replay 示例](../demo-output/trace-replay-sample.zh-CN.md)
- [Failure-to-Eval 示例](../demo-output/failure-to-eval-sample.zh-CN.md)
- [生态检测示例](../demo-output/ecosystem-detection-sample.zh-CN.md)

## 未来插件架构

插件能力目前还没有实现，但我们正在探索 Runwise 未来如何支持本地规则包，例如 MCP、RAG、生态检测和团队自定义策略。

- [插件架构探索](../PLUGIN_ARCHITECTURE_EXPLORATION.zh-CN.md)
- [插件 Manifest 草案](../PLUGIN_MANIFEST_DRAFT.zh-CN.md)
- [插件规则包草案](../PLUGIN_RULE_PACK_DRAFT.zh-CN.md)

## 推荐第一次怎么跑

1. 运行 `pnpm exec runwise doctor`。
2. 打开生成的 Markdown 或 HTML 报告。
3. 用 `pnpm exec runwise view` 打开本地 viewer。
4. 验证一个 trace fixture。
5. 复盘 risky trace fixture。
6. 生成一个 eval case 草稿。

## 当前边界

Runwise 当前从源码运行。它不是 hosted service、数据库、登录系统、云同步工具、模型运行时、agent framework、npm release 或 marketplace listing。
