# v0.1.1-preview.0 计划

`v0.1.1-preview.0` 计划作为一次 usability 和 trust polish preview。

这份计划不会创建 tag、release 或 npm package。它只是定义如果后续批准，下一版小 preview 应该包含什么。

## 版本主题

v0.1.1-preview.0 = usability and trust polish。

这次版本应让现有源码安装体验更可信、更容易试、更容易解释。

## 建议范围

1. README 收紧。
2. 在干净机器或干净环境中检查 Quick Start 摩擦。
3. 如果有真实且当前可用的素材，添加截图或 GIF 占位。
4. 添加更清楚的对比文档：
   - Runwise vs Langfuse
   - Runwise vs Promptfoo
   - Runwise vs Dify / Open WebUI
5. 添加 Doctor 误报 / 漏报反馈流程。
6. 如果安全可控，改进 GitHub Actions Node.js annotation。
7. 改进 package manager 和 Corepack 指引。
8. 添加 sample issue 链接或 example issue template。
9. 添加“如何在自己的 AI 项目上测试 Runwise”指南。
10. 重新 review npm 发布是否继续暂缓。

## v0.1.1 不包含

- plugin runtime implementation
- npm publish
- hosted service
- model calls
- real integrations
- database
- login
- PR bot
- telemetry
- 非 preview release

## Phase 11G 进展

已在本地完成：

- 添加干净安装检查清单。
- 添加在自己项目上试用 Runwise 的指南。
- 添加误报 / 漏报反馈指南。
- 收紧 README 链接结构。
- 文档入口已补充安装、项目试用、反馈、对比、示例和报告阅读链接。
- CLI help 已 review，并补充 source preview、本地运行、`--cwd` 和报告输出路径说明。
- GitHub Actions Node.js 20 annotation 已 review，并暂缓到后续 CI/action-version review。

这不表示 `v0.1.1-preview.0` 已发布，只是推进计划中的 usability 工作。

## Phase 11H 进展

已在本地完成：

- 从 `/tmp/runwise-clean-install-review/runwise` 执行 clean clone install review。
- 验证仓库声明的 `pnpm@9.15.4` 安装路径。
- 在 clean clone 中验证 `check`、`check:types` 和 `test`。
- 在 clean clone 中验证 `runwise doctor`，并生成文档中的报告文件。
- 在端口 `43118` smoke-test 本地 viewer。
- 在 clean clone 中验证 trace validate、replay 和 eval generation。
- 验证 `--cwd` 行为；相对 `--output` 路径会在被扫描项目内解析。
- 添加干净环境安装复核记录。

进入 release candidate 前仍需跟进：

- 继续保留 GitHub Actions Node.js 20 annotation review。
- 考虑是否需要给自定义输出目录增加更清楚的提醒或 ignore 指引。
- 在 review docs 合入后确认 GitHub Actions 为绿色。

## 打 Tag 前需要 Review

未来创建 `v0.1.1-preview.0` tag 前：

- 确认 `main` 干净
- 确认 GitHub Actions 为绿色
- 跑完整本地检查栈
- 确认 `.runwise/` artifact 仍然被忽略且未被跟踪
- 更新 release notes
- 确认没有 npm publishing 声明
- 除非已经明确批准并实现，否则继续说明插件能力尚未实现

## Release Notes 形状建议

```markdown
## v0.1.1-preview.0

This preview focuses on first-time user clarity and trust.

### Planned

- README and Quick Start refinements
- comparison docs
- cleaner source-install guidance
- improved feedback workflow for Doctor findings
- report and example readability refinements

### Still deferred

- npm package publishing
- plugin runtime support
- hosted services
- model calls
- non-preview release
```

## 完成标准

- 新访客读完 README 第一屏后能说明 Runwise 做什么。
- 开发者可以不额外求助就跑完源码安装流程。
- 对比文档能回答最常见的“它和其他工具有什么区别”问题。
- 项目仍然清楚说明 public preview、source-install only、还没有 npm package、还没有 plugin runtime support。
