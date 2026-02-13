---
sidebar_label: RadxaOS
title: RadxaOS Deb软件源镜像使用帮助
type: OS
detection:
  checks:
    - type: command
      command: rsetup
---

## RadxaOS 简介

RadxaOS 是基于 Debian / Ubuntu 基础上进行二次开发而获得的系统。
本镜像源为 RadxaOS 独有的软件包提供了额外的仓库的镜像源。

## Debian 软件源替换

对于来自 Debian 的部分源，可以参考 [Debian 帮助](./debian)进行修改。

## RadxaOS 软件源替换

### 一键换源

:::caution

本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。

:::

打开终端，执行以下命令，替换默认的软件源配置：

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  sed -i "s|https://radxa-repo.github.io|${_http}://${_domain}/radxa-deb|g" /etc/apt/sources.list.d/*radxa*.list
  apt-get update
  #{/USE_IN_DOCS}
recover: |
  ${SUDO}sed -i "s|${_http}://${_domain}/radxa-deb|https://radxa-repo.github.io|g" /etc/apt/sources.list.d/*radxa*.list
  ${SUDO}apt-get update
```

执行以上命令后，默认启用了的仓库将会被正确替换并更新缓存。

## 引用

1. [使用帮助 - Radxa Docs](https://docs.radxa.com/zero/zero3/radxa-os/using-apt?mirror=HUST)
