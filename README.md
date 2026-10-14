# HUST Mirror 网页 & 文档

[![加入华科大开源镜像站技术交流群](https://img.shields.io/badge/Join_QQ-%E5%8D%8E%E7%A7%91%E5%A4%A7%E5%BC%80%E6%BA%90%E9%95%9C%E5%83%8F%E7%AB%99%E6%8A%80%E6%9C%AF%E4%BA%A4%E6%B5%81%E7%BE%A4-white?style=for-the-badge&color=76bad9&logo=qq&logoColor=76bad9)]( https://qm.qq.com/q/GxLlEDSdMI )

该网站使用 [Docusaurus](https://docusaurus.io/) 构建。

## 开发

### 安装依赖

``` bash
yarn
```

### 本地开发

``` bash
yarn start
```

该命令会启动一个本地开发服务器，并打开一个浏览器窗口。大多数更改都会在不必重新启动服务器的情况下实时重载。

### 构建

``` bash
yarn build
```

该命令会将静态内容生成到 `build` 目录中，可以使用任何静态内容托管服务进行服务。

### Docker 镜像

镜像使用 Node.js 22 和 Yarn 1.22.22 构建网站，再由 Nginx 在容器的 `80` 端口提供静态文件。

```bash
docker build -t hust-mirrors:local .
docker run --rm -p 8080:80 hust-mirrors:local
```

打开 `http://localhost:8080` 即可访问。网站配置（如 `mirrors.config.js`、`meta.config.ts` 和 `docusaurus.config.js`）在构建时写入静态文件，修改后需要重新构建镜像；运行时环境变量不会改变这些配置。

镜像只包含网站与文档，不包含镜像仓库数据、同步服务、CGit 服务或自动生成的 CLI。首页和下载页使用的 `/status.json`、`/releases.json` 需要由部署环境提供，可以将实际文件只读挂载到 `/usr/share/nginx/html/status.json` 和 `/usr/share/nginx/html/releases.json`，或在前置反向代理中配置对应路由。不要挂载整个 `/usr/share/nginx/html`，否则会覆盖镜像内的网站文件。

### 手动发布到 GHCR

本仓库默认开发分支为 `master`，没有 `main` 分支。将本工作流及 Docker 文件合并到 `master` 后，在 GitHub 的 **Actions → Publish GHCR image → Run workflow** 中手动触发。工作流只支持 `workflow_dispatch`，不会因推送或 PR 自动发布镜像。

无论触发时选择哪个分支，构建步骤始终检出运行时最新的 `master`，并使用该次检出的完整提交 SHA 生成镜像标签与修订信息。第一次运行前必须先合并 Docker 文件；仅在功能分支中添加这些文件无法让 `master` 构建使用它们。

发布目标为 `linux/amd64`：

- `ghcr.io/hust-open-atom-club/hust-mirrors:latest`
- `ghcr.io/hust-open-atom-club/hust-mirrors:sha-<master 的完整提交 SHA>`

工作流使用自动提供的 `GITHUB_TOKEN`，仅申请 `contents: read` 和 `packages: write`，无需添加仓库密钥。组织需要允许仓库发布 GHCR 包；若同名包已经存在，需确保该包向此仓库授予 Actions 写入权限。首次发布后，匿名拉取还需要包的可见性设为公开；否则请先使用有读取权限的账号登录 GHCR。

```bash
docker pull ghcr.io/hust-open-atom-club/hust-mirrors:latest
docker run --rm -p 8080:80 ghcr.io/hust-open-atom-club/hust-mirrors:latest
```

运行摘要中会记录源提交、标签和镜像摘要。`latest` 会随手动发布更新；相同提交重新构建时，基础镜像更新也可能改变产物。需要锁定完全相同的镜像时，请使用摘要 `ghcr.io/hust-open-atom-club/hust-mirrors@sha256:<digest>`。

### 自动生成 CLI

``` bash
python scripts/parser.py
```

该命令会自动读取文档中可以生成 `hustmirrors-cli` 替换脚本的部分，并将其生成为相应镜像的脚本，保存在 `generated_scripts` 目录下。

有关编写自动生成镜像替换脚本的文档，请参考 [USAGE.md](USAGE.md)

## 贡献

我们欢迎任何形式的贡献，包括但不限于提交问题报告、功能请求、文档改进、翻译等。如果您在贡献中遇到任何问题，请先查看[贡献指南](https://github.com/hust-open-atom-club/hust-mirrors/wiki/2.-For-Contributor-%E2%80%90-%E5%AF%B9%E8%B4%A1%E7%8C%AE%E8%80%85)

### 站点功能

如果您发现了站点的任何问题，或者有任何功能请求，请在
[GitHub Issues](https://github.com/hust-open-atom-club/hust-mirrors/issues) 中提交一个问题报告，
或者直接提交一个 Pull Request。

### 文档改进

如果您发现了文档中的任何问题，或者有任何改进意见，请在
[GitHub Issues](https://github.com/hust-open-atom-club/hust-mirrors/issues) 中提交一个问题报告，
或者直接提交一个 Pull Request。

#### 文档格式

文档采用 Markdown 格式编写，如果需要支持用户交互的代码块，请参考 Ubuntu 文档的写法。

## 许可证

MIT
