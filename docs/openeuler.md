---
sidebar_label: openEuler
title: openEuler 软件仓库镜像使用帮助
---

## openEuler 简介与软件管理

openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源操作系统项目，旨在为服务器和云计算环境提供强大的操作系统支持。openEuler 由中国的华为公司领导并由社区支持。当前 openEuler 系统基于 Linux 内核，支持鲲鹏，RISC-V 及其它多种处理器，能够充分释放计算芯片的潜能，是由全球开源贡献者构建的高效、稳定、安全的开源操作系统，适用于数据库、大数据、云计算、人工智能等应用场景。

openEuler 使用 `DNF` 工具来管理 RPM 软件包，查询软件包信息，从指定软件库获取软件包，自动处理依赖关系以安装及卸载软件包，以及更新系统。openEuler通过 `/etc/yum.repos.d/openEuler.repo` 文件来进行配置与管理软件源。

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令修改软件源配置文件 `/etc/yum.repos.d/openEuler.repo`

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -e "s|http://repo.openeuler.org|${_http}://${_domain}/openeuler|g" \\
	/etc/yum.repos.d/openEuler.repo
${SUDO}dnf update
```

## 引用

[^1] [使用DNF管理软件包](https://docs.openeuler.org/zh/docs/22.03_LTS_SP2/docs/Administration/%E4%BD%BF%E7%94%A8DNF%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E5%8C%85.html)  
