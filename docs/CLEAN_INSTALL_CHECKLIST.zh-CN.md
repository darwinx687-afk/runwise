# 干净安装检查清单

Runwise 目前只支持源码方式试用，还没有发布到 npm。

如果你想从 fresh clone 开始试 Runwise，可以按这份清单走。

## 前置条件

- Node.js 20 或更高版本。
- pnpm 使用 `package.json` 中声明的版本。
- Git。

## 推荐设置

建议使用 Corepack，或直接使用仓库声明的 pnpm 版本。

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

如果你不想改全局 pnpm，也可以直接使用：

```bash
npx -y pnpm@9.15.4 install --frozen-lockfile
```

## 安装和验证

```bash
git clone https://github.com/darwinx687-afk/runwise.git
cd runwise
npx -y pnpm@9.15.4 install --frozen-lockfile
npx -y pnpm@9.15.4 check
npx -y pnpm@9.15.4 test
npx -y pnpm@9.15.4 exec runwise doctor
```

## 成功时应该看到什么

- `check` 通过。
- `test` 通过。
- `runwise doctor` 创建 `.runwise/`。
- `.runwise/runwise-report.json` 存在。
- `.runwise/runwise-report.md` 存在。
- `.runwise/runwise-report.html` 存在。
- `.runwise/` 仍然被 git 忽略。

可以这样确认生成文件被忽略：

```bash
git check-ignore -v .runwise/runwise-report.json .runwise/runwise-report.md .runwise/runwise-report.html .runwise
git ls-files .runwise
```

`git ls-files .runwise` 应该没有输出。

## 常见问题

### 全局 pnpm 行为不一致

直接使用仓库声明的版本：

```bash
npx -y pnpm@9.15.4 check
```

### 较新的 pnpm 提示 build approval

优先使用仓库声明的 pnpm 版本。如果仍然看到不理解的 package-manager 提示，先停下来读清楚提示，不要随手批准。

### workspace package 缺失

在仓库根目录重新安装：

```bash
npx -y pnpm@9.15.4 install --frozen-lockfile
```

### 你尝试了 `npm install -g runwise`

当前还不支持这种方式。Runwise 在当前 public preview 中只支持源码方式试用。

## 现在先不要做什么

- 不要发布 npm package。
- 不要创建 release tag。
- 不要提交 `.runwise/` 生成报告。
- 不要把 secret 或客户私有 trace 粘贴到公开 issue。
- 不要期待插件能力；插件能力目前还没有实现。
