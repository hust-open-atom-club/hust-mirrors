---
sidebar_label: Alpine Linux
title: Alpine Linux 软件仓库镜像使用帮助
cname: AplineLinux
type: OS
detection:
  checks:
    - type: os_release
      name: Alpine Linux
---
## Alpine Linux 简介与软件管理
Alpine Linux 是一个基于 musl libc 和 BusyBox 的独立、非商业、通用的 Linux 发行版，旨在提供小巧、简单、安全和高效的基础系统。Alpine Linux 的设计理念是 “Keep It Simple”，并且由于其轻量级和高效的特性，它在 Docker 和 Kubernetes 等容器环境中非常受欢迎。

Alpine Linux 的包管理系统是 apk (Alpine Package Keeper)。apk 是一个用于 Alpine Linux 的包管理工具，它可以用于安装新的软件包、升级或删除已存在的软件包、更新软件包索引等。

## Alpine Linux 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://dl-cdn.alpinelinux.org](http://dl-cdn.alpinelinux.org) 直接替换为当前镜像源站：

```yaml cli
type: ReplaceIfExist
required: false
privileged: true
description: 一键替换Alpine Linux软件源
files:
  - path: /etc/apk/repositories
    match: 'dl-cdn\.alpinelinux\.org'
    replace: '${_domain}'
```

### 1. 编辑 `/etc/apk/repositories`，将下列内容替换原有的内容：

```bash varcode
[ ] (version) {  v3.16:v3.16, v3.17:v3.17, v3.18:v3.18, v3.19:v3.19 } Alpine 版本
---
---
${_http}://${_domain}/alpine/${version}/main
${_http}://${_domain}/alpine/${version}/community
```

### 2. 更新软件包缓存

```yaml cli
type: Execute
required: false
privileged: true
description: 更新软件包索引
exec: |
  #{USE_IN_DOCS/}
  apk update
  #{/USE_IN_DOCS}
```




## 引用
1. [Tuna 镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/alpine/)  
