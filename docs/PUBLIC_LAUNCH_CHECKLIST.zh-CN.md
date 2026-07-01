# 公开发布检查清单

在公开渠道手动分享 Runwise `v0.1.0-preview.0` 前，请使用本检查清单。

## 仓库准备状态

- [x] GitHub 仓库已公开。
- [x] GitHub prerelease 已存在。
- [x] `main` 上 CI 通过。
- [x] README 视觉素材已检查。
- [x] Release notes 已检查。
- [x] Feedback guide 已存在。
- [x] Early user testing guide 已存在。
- [x] Issue templates 已检查。
- [x] Repository labels 已检查。
- [x] Launch posts 已准备为草稿。

## 边界检查

- [x] 暂不发布 npm。
- [x] 不声明 stable release。
- [x] 不声明官方集成或官方合作关系。
- [x] 不声明 GitHub Marketplace 可用。
- [x] 不暗示 hosted SaaS、cloud sync、登录、telemetry 或数据库能力。
- [x] 公开文案保持仅支持源码安装。

## 手动发布后

- [ ] 发布后监控 issues。
- [ ] 收集 Doctor false positives 和 false negatives。
- [ ] 收集生态检测缺口。
- [ ] 收集 trace schema 反馈。
- [ ] 收集 replay 报告反馈。
- [ ] 收集 Failure-to-Eval 反馈。
- [ ] 收集国内大模型服务商反馈。
- [ ] 记录令人困惑的文档或安装阻碍。

## 已知非阻塞后续事项

- GitHub Actions 会因引用的 actions 报告 Node.js 20 deprecation annotation。CI 通过。请在 stable release 前审查 action runtime 升级。
