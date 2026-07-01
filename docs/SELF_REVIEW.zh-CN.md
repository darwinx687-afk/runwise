# 自我 Review

这份 review 从第一次打开 GitHub 仓库的用户视角看 Phase 11A-11E 之后的 Runwise。

Runwise 帮你在 AI Agent 项目上线前先做一次本地检查。它会在本地检查项目结构、生成报告、验证 trace、静态复盘运行过程，并把失败记录转成 eval 用例。

## 当前优势

- 本地优先定位清楚：Runwise 不上传项目数据，不调用模型，不要求登录，也不依赖 hosted service。
- README 中已经有 5 分钟源码试用流程，命令比较明确。
- 核心链路是连贯的：Doctor、report、view、trace validation、static replay、Failure-to-Eval。
- GitHub Action 已存在，并且复用 CLI 生成的本地报告 artifact。
- 英文和简体中文文档在主要入口上保持镜像。
- 示例 Gallery 说明了每个 fixture 代表什么，以及用户应该重点看什么。
- 可视化报告打磨让 HTML 报告和本地 viewer 更容易扫描。
- 插件架构探索已经写清楚，同时没有暗示插件能力已经实现。
- `v0.1.0-preview.0` public prerelease 已存在。

## 当前弱点

- Runwise 仍然只支持源码方式试用，对期待 `npm install` 的用户有摩擦。
- 目前还没有 npm package。
- README 比之前清楚，但第一次访问时仍然偏长。
- 示例是整理过的 fixture，还不是来自真实用户项目的案例。
- 外部反馈目前还很少。
- 插件文档已经存在，但 runtime plugin support 还没有实现。
- GitHub Actions 的 Node.js 20 annotation 仍然存在，虽然 CI 通过。
- 一些用户可能还不熟悉 trace、replay、eval 或 Failure-to-Eval 这些概念。
- 现在有 SVG 预览和 sample docs，但还没有真实浏览器截图或 GIF walkthrough。
- 小红书和 LinkedIn 发布后的公开 URL 没有记录下来。

## 第一次访问的风险

用户可能会离开的原因：

- 安装摩擦太高
- 文档很多，但还没立刻知道应该跑哪条命令
- 期待 npm package，却没有注意到源码安装说明
- 不清楚 Runwise 和 Langfuse、Promptfoo、Dify、Open WebUI 的区别
- 不确定 Runwise 能不能用在自己的项目上
- Node.js、pnpm 或 Corepack 版本说明不够清楚
- 在看到输出前，trace 和 eval 术语显得抽象
- 项目看起来比实际更成熟，用户后面才发现 preview 边界

## v0.1.1 应该先修什么

`v0.1.1-preview.0` 应聚焦 usability 和 trust polish，不做功能扩张。

优先级：

1. 收紧 README 的扫描路径，同时保留重要 public-preview 边界。
2. 在干净机器或干净环境中检查源码安装流程。
3. 添加更清楚的对比说明，并从 README 链接过去。
4. 改进 package manager 和 Corepack 指引。
5. 添加“如何在自己的 AI 项目上测试 Runwise”指南。
6. 添加 Doctor 误报和漏报反馈流程。
7. 如果安全可控，调查 GitHub Actions Node.js 20 annotation。
8. 只有在真实、容易维护时，才添加截图或 GIF 占位。
9. 插件实现继续后置，等 self-review 和明确批准后再推进。
10. npm 发布继续暂缓，等 package metadata 和安装体验 review 后再决定。

## 发布前要问的问题

- 新用户能不能不猜命令就跑完源码安装流程？
- README 是否足够快地告诉用户第一条命令？
- 不读完整 docs 文件夹时，生成报告是否也能看懂？
- trace 和 eval 示例是否能帮助新用户理解这些术语？
- public-preview 边界是否在关键位置写清楚？
- 对比说明是否减少困惑，而不是制造对立？
- 未来打 tag 前，`main` 上 CI 是否为绿色？
- 生成的 `.runwise/` artifact 是否仍然被忽略且未被跟踪？
