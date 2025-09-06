---
sidebar_label: openKylin
title: openKylin 软件仓库镜像使用帮助
cname: 'openkylin'
type: OS
detection:
  checks:
    - type: os_release
      name: openKylin
---

## openKylin 简介与软件管理

openKylin（开放麒麟）社区是由基础软硬件企业、非营利性组织、社团组织、高等院校、科研机构和个人开发者共同创立的一个开源社区，旨在以 “共创” 为核心、以 “开源聚力、共创未来” 为社区理念，在开源、自愿、平等、协作的基础上，通过开源、开放的方式与企业构建合作伙伴生态体系，共同打造桌面操作系统顶级社区，推动 Linux 开源技术及其软硬件生态繁荣发展。

openKylin 使用软件包管理工具 `APT` 来管理 DEB 软件包。具体来说，openKylin 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 [http://archive.build.openkylin.top](http://archive.build.openkylin.top) 替换为本软件镜像站。

## openKylin 软件源替换


### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://archive.build.openkylin.top](http://archive.build.openkylin.top) 直接替换为当前镜像源站。


```yaml cli
type: ReplaceIfExist
required: true
optional: false
privileged: true
files:
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/openkylin'
    replace: '${_http}://${_domain}/openkylin'
```


:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list` 的原有内容：

```shell varcode
[ ] (version) { yangtze:1.0 } openKylin 版本
---
deb ${_http}://${_domain}/openkylin ${version} main
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

- openKylin 默认不使用 HTTPS 源。如果您选择使用 HTTPS 源后遇到无法拉取 HTTPS 源的情况，请使用 HTTP 源安装如下软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

## openKylin CD 镜像 {#iso}

本站提供 OpenKylin 的 CD 镜像下载，您可以通过以下链接下载：

- [点此链接](/release/?release=openKylin)，选择需要的版本和架构下载所需的 openKylin 安装镜像。
