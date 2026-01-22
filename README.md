# HUST Mirror 网页 & 文档

[![](https://img.shields.io/badge/Join_QQ-%E5%8D%8E%E7%A7%91%E5%A4%A7%E5%BC%80%E6%BA%90%E9%95%9C%E5%83%8F%E7%AB%99%E6%8A%80%E6%9C%AF%E4%BA%A4%E6%B5%81%E7%BE%A4-white?style=for-the-badge&color=76bad9&logo=qq&logoColor=76bad9)]( https://qm.qq.com/q/GxLlEDSdMI )

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
