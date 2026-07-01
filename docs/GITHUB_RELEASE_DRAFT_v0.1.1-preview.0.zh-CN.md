# Runwise v0.1.1-preview.0

这个 preview 主要打磨第一次开发者体验、报告可读性和发布可信度。

Runwise 仍然只支持源码方式试用，目前还没有发布到 npm。

## 这次改了什么

### 第一次运行更清楚

- 干净安装检查清单
- 首次运行 walkthrough
- 在你自己的项目上试用 Runwise 的指南
- 更清楚的 pnpm / Corepack 指引
- 干净环境安装复核记录

### 示例更具体

- 示例 Gallery
- 可视化示例卡片
- 整理过的 Doctor、Trace Replay、Failure-to-Eval 和生态检测 sample

### 报告更好读

- 改进静态 HTML 报告层级
- 改进 Markdown 报告可读性
- 改进本地 dashboard 可读性
- 添加报告阅读指南

### 定位更清楚

- README 开头更简单
- 添加对比说明
- 减少 GitHub 展示里的 AI buzzword
- 更明确说明 public preview 和源码安装边界

### 未来架构探索

- 插件架构探索
- 插件 manifest 和 rule-pack 草案
- documentation-only 插件示例

插件能力目前还没有实现。这些文档只是探索未来可能的方向。

## 已验证

- clean clone 安装通过
- `runwise doctor` 通过
- 本地 viewer smoke test 通过
- trace validate / replay / eval generate 通过
- GitHub Actions 通过
- `.runwise/` 生成输出仍然被忽略且未被跟踪

## 仍不包含

- npm package
- plugin runtime
- hosted service
- telemetry
- database
- login
- GitHub Marketplace listing
- stable release 保证

## 从源码试用

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
```
