# 插件架构探索

插件能力目前还没有实现。本文档只是探索未来可能的设计。

Runwise 现在把 Doctor 规则放在 `@runwise/core`，把生态检测放在 `@runwise/integrations`。这对 public preview 来说是合理的：行为容易检查、容易测试，也容易解释。

但长期来看，不是所有 readiness check 都应该放进 core。MCP 团队、RAG 团队、国内大模型使用者，以及有内部交付规范的团队，都可能需要更具体的检查。

## 为什么可能需要插件

插件可以让 Runwise 继续扩展，同时不让 core 变得难懂。

可能有用的场景：

- MCP server 安全检查，例如高风险 tool 名称或缺失审批策略。
- RAG 检查，例如 source reference、retrieval 证据和 eval 覆盖。
- 国内大模型 provider 检查，例如 DashScope、Qwen、DeepSeek、GLM、Moonshot/Kimi、MiniMax 等配置假设。
- 团队内部交付规范检查。
- 和团队发布流程相关的 trace / eval 检查。

## 插件应该解决什么问题

- 让团队可以在不修改 Runwise core 的情况下添加项目特定检查。
- 让生态相关检查可以在主仓库之外继续增长。
- 保持 Runwise core 小而清楚。
- 支持 MCP、RAG、browser-use、本地模型、国内大模型服务商等方向的社区规则包。
- 让自定义检查容易 review、容易测试。

## 什么应该留在 Runwise core

Core 应该继续负责稳定的本地流程：

- 基础项目扫描
- 内置 Doctor 规则
- 规则执行和评分
- 共享 schema
- 报告生成
- trace 验证
- 静态 replay
- Failure-to-Eval 生成
- 本地生态检测基础能力
- GitHub Action 行为

如果未来实现插件能力，插件契约也应该由 core 定义。

## 什么可以放进插件

插件应该保持窄、清楚、可 review。

适合放进插件的内容：

- 特定生态的规则包
- 公司或团队策略检查
- provider-specific readiness 检查
- 可选 trace 验证扩展
- 可选报告区块
- 可选 eval 导出格式定义

插件不应该变成隐藏的项目运行时所有者。

## 目标

- 让团队可以在不修改 Runwise core 的情况下添加项目特定检查。
- 让生态检查可以在主仓库之外扩展。
- 保持 Runwise core 小而清楚。
- 支持 MCP、RAG、browser-use、本地模型、国内大模型服务商等社区规则包。
- 让自定义检查容易 review、容易测试。

## 非目标

- 不做远程插件执行。
- 近期不做 hosted plugin marketplace。
- 不从未知 URL 自动安装插件。
- 默认不允许任意网络访问。
- 不收集 secrets。
- 不做 cloud sync。
- 第一版插件不做模型调用。
- 不替换 core doctor engine。

## 安全和本地优先约束

未来任何插件设计都应该保留 Runwise 当前边界：

- 本地文件只在本地检查
- 生成的报告仍然是本地 artifact
- 不隐藏调用模型
- 不隐藏网络调用
- 不收集 secret
- 不从 URL 自动安装插件
- 不变成远程执行系统
- 正常使用不依赖 hosted plugin registry

第一版插件设计应优先考虑确定性的 JSON 规则包，而不是可执行插件。

## 插件类型草案

### readiness-rule-pack

添加额外 Doctor 规则。

例子：

- 公司内部审批策略检查
- MCP server 权限检查
- RAG source citation 检查

### ecosystem-detector

为某个项目栈添加本地检测线索。

例子：

- provider-specific `.env.example` 模式
- framework-specific 配置文件
- package metadata 信号

### trace-validator-extension

为 trace 文件添加额外验证提示。

例子：

- 要求 RAG retrieval step 带 source ID
- 要求高风险 MCP 调用前有审批 step

### report-section

基于本地检查结果添加一个小的可选报告区块。

例子：

- 团队 review checklist
- provider assumptions 摘要

### eval-exporter

定义未来本地 eval case 导出格式。

例子：

- 团队内部 YAML 格式
- 内部 eval harness 兼容格式

### policy-pack

围绕团队或组织策略组合一组检查。

例子：

- 审批边界
- trace 留存说明
- 必需文档文件

## 插件 Manifest 草案

见 [插件 Manifest 草案](./PLUGIN_MANIFEST_DRAFT.zh-CN.md)。

Manifest 应描述插件是什么、贡献哪些文件、请求哪些权限。当前 Runwise public preview 不会加载这个 manifest。

## Rule Pack 草案

见 [插件规则包草案](./PLUGIN_RULE_PACK_DRAFT.zh-CN.md)。

第一版安全设计应先聚焦确定性静态检查，例如文件模式和文本包含。任意 JavaScript 执行不应该进入第一版 plugin MVP。

## 加载策略选项

### 选项 A：显式本地路径

未来可能的形式：

```bash
runwise doctor --rule-pack ./runwise-rules/mcp-safety/rules.json
```

优点：

- 简单
- 规则包在仓库里容易 review
- 不需要安装流程

缺点：

- 对可复用社区包不够方便

### 选项 B：项目配置声明

未来可能的形式：

```json
{
  "runwise": {
    "rulePacks": ["./runwise-rules/mcp-safety/rules.json"]
  }
}
```

优点：

- CI 中可复现
- 团队使用方便

缺点：

- 需要清楚的配置校验

### 选项 C：基于 package 的插件

未来可能的形式：

```json
{
  "devDependencies": {
    "runwise-plugin-mcp-safety": "0.1.0"
  }
}
```

优点：

- 可复用
- 可通过包管理器管理版本

缺点：

- 会带来供应链和可执行代码问题
- 应等 JSON 规则包被证明有用后再考虑

## 安全模型

最安全的第一版是 data-only：

- JSON manifest
- JSON rule pack
- 不执行 JavaScript
- 不访问网络
- 插件不写文件
- 不调用模型
- 除 Runwise 已扫描的本地文本外，不读取 secret

如果未来考虑可执行插件，需要单独设计评审和显式用户批准。它不应该作为 JSON 规则包的副作用被加入。

## 测试策略

未来插件测试应包含：

- manifest schema validation
- rule pack schema validation
- 每个规则包对应的 fixture project
- 确定性的 finding snapshot
- 不支持权限的反向测试
- 生成的 `.runwise/` artifact 仍然被忽略

规则包应小到可以在 code review 中看懂。

## 版本策略

Manifest 草案使用：

- `schemaVersion`：plugin manifest 结构版本
- `version`：插件自身版本
- `runwise.minVersion`：兼容的最低 Runwise 版本

如果未来实现插件能力，Runwise 应该清楚拒绝不支持的 schema version。

## 示例插件想法

- `runwise-plugin-mcp`：MCP server 和 tool 审批检查
- `runwise-plugin-rag`：RAG retrieval、source 和 eval 覆盖检查
- `runwise-plugin-qwen`：DashScope / Qwen provider 假设
- `runwise-plugin-deepseek`：DeepSeek provider 假设
- `runwise-plugin-browser-use`：浏览器自动化 trace 和审批检查
- `runwise-plugin-company-policy`：本地团队策略检查

## 实施阶段

### Phase A：文档和 review

当前 loop。创建草案文档、示例和开放问题。

### Phase B：只做 schema 校验

添加 plugin manifest 和 rule pack 的 schema 校验，但还不执行规则包。

### Phase C：本地 JSON 规则包 MVP

允许显式指定本地 JSON 规则包，并生成确定性的 Doctor finding。

### Phase D：项目配置支持

如果 MVP 有用，再允许项目声明本地规则包。

### Phase E：基于 package 的规则包

只有在本地 JSON 规则包足够安全、有用之后，再考虑 package-based 分发。

可执行插件不在第一条实现路径中。

## 开放问题

- 第一版 MVP 是否只支持 `readiness-rule-pack`？
- 插件 finding 是否立刻影响 readiness score，还是先作为 advisory？
- rule pack category 是否必须限制在当前 `RunwiseCategory` 值中？
- rule ID 如何避免冲突？
- GitHub Actions 中是否默认允许本地规则包？
- 规则包是否可以添加 report section，还是应该后置？
- Runwise 应如何在双语报告中解释插件 finding？
- 最小且安全的 rule matching language 应该是什么？
