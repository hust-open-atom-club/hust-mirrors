---
sidebar_label: Deepin
title: Deepin 软件仓库镜像使用帮助
cname: 'deepin'
typs: OS
detection:
  checks:
    - type: os_release
      name: Deepin
---

## Deepin 简介与软件管理

Deepin（原名 Linux Deepin）致力于为全球用户提供美观易用，安全可靠的 Linux 发行版。Deepin 项目于 2008 年发起，并在 2009 年发布了以 linux deepin 为名称的第一个版本。2014 年 4 月更名为 deepin，在中国常被称为 “深度操作系统”。Deepin 是一款基于 Linux 内核，以桌面系统为主的开源操作系统。它拥有简洁现代的界面，丰富的应用软件和工具，能满足日常的办公、学习和娱乐需求。

Deepin 使用软件包管理工具 `APT` 来管理 DEB 软件包。具体来说，deepin 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 [https://community-packages.deepin.com/](https://community-packages.deepin.com/) 替换为本软件镜像站。

## Deepin 软件源替换

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 [https://community-packages.deepin.com/](https://community-packages.deepin.com/) 直接替换为当前镜像源站。


```yaml cli
type: ReplaceIfExist
required: true
optional: false
description: 替换Deepin主仓库
privileged: true
files:
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/deepin'
    replace: '${_http}://${_domain}/deepin'
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/beige'
    replace: '${_http}://${_domain}/deepin/beige'
display_policy:
  kind: OneOf
  variables:
    - name: version
      description: Deepin 版本
      options:
        - name: 'Deepin 20'
          display: 
            - 1
        - name: 'Deepin 23'
          display:
            - 2
```

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list` 的原有内容：

```shell varcode
[ ] (version) { apricot:Deepin 20, beige:Deepin 23（不支持 Nightly） } Deepin 版本
[ ] (src) 启用源码镜像
---
let COMMAND = '';

if (version == 'apricot') {
  COMMAND = `://${_domain}/deepin apricot main contrib non-free`;
}
if (version == 'beige') {
  COMMAND = `://${_domain}/deepin/beige beige main community commercial`;
}
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}${COMMAND}
${SRC_PREFIX}deb-src ${_http}${COMMAND}
```

### 2. 通过如下命令更新软件。

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  apt-get update
  #{/USE_IN_DOCS}
```



## 注意事项

- 本镜像站不同步 Deepin 20 前的版本，如有需要请使用官方源。

- 本镜像站不同步 Deepin 23 Nightly 版本，如有需要请使用官方源。

- 本镜像站不提供 Deepin App Store 的镜像，因此请不要修改 `/etc/apt/sources.list` 中与 App Store 有关的源，如 [https://app-store-files.uniontech.com/](https://app-store-files.uniontech.com/)

- Deepin 20 及以上版本默认支持 HTTPS 源。如果遇到无法拉取 HTTPS 源的情况，请使用 HTTP 源安装如下软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

## Deepin 安装镜像 {#cd}

本站提供 amd64 架构的 Deepin 安装镜像下载，[点击链接跳转](/release?release=deepin)。

:::info
本站收录了 Deepin 23 Nightly 的安装镜像，但暂不提供其软件源镜像，如有需要请使用官方源。
:::
