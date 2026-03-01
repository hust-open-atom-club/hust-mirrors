---
sidebar_label: Anthon
title: AOSC OS 软件仓库镜像使用帮助
---

## 安同 OS 简介

安同 OS（英译：AOSC OS）是一款以 “简明可靠” 为设计及维护目标的 Linux 发行版，主要面向有一定 Linux 使用经验的用户，针对个人桌面设备优化体验，致力于为用户提供开箱即用和简便可靠的工作环境。

## 使用方法

### 工具修改

请使用以下命令交互式开启/关闭镜像源，输入镜像源名称并使用空格启用/禁用镜像源：

:::info

oma mirror 允许指定多个镜像源，请注意禁用不需要使用的镜像源。

:::

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}oma mirror
```

关于该命令的更多详细信息和用法，请参考 [oma 的 GitHub 页面](https://github.com/AOSC-Dev/oma?tab=readme-ov-file#command-reference)。

### 手动修改

安同 OS 推荐使用 `oma` 完成对软件源配置的修改，不推荐手动编辑配置文件。

但如您确实有相关需求，请根据下面的信息编辑 `/etc/apt/sources.list` 的内容：

```list varcode
deb ${_http}://${_domain}/anthon/debs stable main
```

## 引用

1. [简介 - 安同 OS](https://aosc.io/aosc-os)
2. [使用帮助 - 校园网联合镜像站](https://help.mirrors.cernet.edu.cn/anthon/)
