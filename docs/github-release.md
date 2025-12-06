---
sidebar_label: Github Release
title: Github Release 软件仓库镜像使用帮助
---

## 镜像简介

Github Release 通常用于开发者发布软件的发行版（发行说明，二进制文件，安装程序等），以供其他人使用。本镜像提供部分 GitHub 仓库 Release 内容的镜像。

## 软件列表

当前，本镜像仓库已同步的软件列表如下：

- [rustdesk/rustdesk](https://mirrors.hust.edu.cn/github-release/rustdesk/rustdesk/)
- [ip7z/7zip](https://mirrors.hust.edu.cn/github-release/ip7z/7zip/)
- [llvm/llvm-project](https://mirrors.hust.edu.cn/github-release/llvm/llvm-project/)

:::tip

本镜像仓库目前仅同步最新发行版。

:::

## 使用方法

### 方法一：直接替换

当您想要的软件被本镜像仓库收录，您可直接替换软件的 Github Release 下载链接中的相关部分，修改方法如下：
原链接：

```url
https://github.com/<组织名>/<仓库名>/releases/download/<版本名>/<文件名>
```

修改为

```url varcode
https://mirrors.hust.edu.cn/github-release/<组织名>/<仓库名>/<版本名>/<文件名>
```

### 方法二：手动查找

您也可在下列表中选择您想下载的软件，点击进入链接，选择相应文件下载。默认进入最新发行版下载。

- [rustdesk](https://mirrors.hust.edu.cn/github-release/rustdesk/rustdesk/LatestRelease/)
- [7zip](https://mirrors.hust.edu.cn/github-release/ip7z/7zip/LatestRelease/)
- [llvm-project](https://mirrors.hust.edu.cn/github-release/llvm/llvm-project/LatestRelease/)

## 引用

1. [关于发行版 - Github Docs](https://docs.github.com/zh/repositories/releasing-projects-on-github/about-releases)
2. [使用帮助 - USTC Mirror](https://mirrors.ustc.edu.cn/help/github-release.html)
