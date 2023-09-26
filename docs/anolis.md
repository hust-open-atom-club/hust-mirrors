---
sidebar_label: Anolis OS
title: Anolis 软件仓库镜像使用帮助
---

## Anolis OS 简介与软件管理

Anolis OS 是 OpenAnolis 社区推出的完全开源、中立、开放的发行版，它支持多计算架构，也面向云端场景优化，兼容 CentOS 软件生态。Anolis OS 旨在为广大开发者和运维人员提供稳定、高性能、安全、可靠、开源的操作系统服务。

Anolis 使用 YUM 工具来管理 RPM 软件包，查询软件包信息，从指定软件库获取软件包，自动处理依赖关系以安装及卸载软件包，以及更新系统。Anolis OS 通过 `/etc/yum.repos.d/`　下的文件来进行配置与管理软件源。

## 一键换源

:::caution
由于 Anolis OS 23 尚无稳定版发布，本镜像站仅提供版本低于 Anolis OS 23 的软件源，如果您使用的是其他版本的 Anolis OS，请勿使用本镜像站及下列命令。
:::

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令修改 `/etc/yum.repos.d/` 文件夹下的软件源配置文件

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -E "s|https?://([^/]+)|${_http}://${_domain}|g"\\
	/etc/yum.repos.d/*.repo
${SUDO}yum makecache
${SUDO}yum update
```
