---
sidebar_label: Manjaro
title: Manjaro 软件仓库镜像使用帮助
---

## Manjaro 简介

Manjaro 基于 Arch Linux，但目标是提供一个更加用户友好的系统，让更多用户能够体验 Arch 的强大功能，而不必面对 Arch 的复杂安装和维护过程。

## 手动替换

编辑 `/etc/pacman.d/mirrorlist` 文件，按以下步骤操作：

### 1. 禁用其它软件源（可选）

在所有以字符串 `Server` 开头的行前面加上字符 `#`，比如：

```mirrorlist
## Country : Germany
Server = https://mirror.philpot.de/manjaro/unstable/$repo/$arch
```

改为：

```mirrorlist
## Country : Germany
# Server = https://mirror.philpot.de/manjaro/unstable/$repo/$arch
```

### 2. 启用本站镜像源

在本行末尾添加如下内容：

```mirrorlist varcode
## Country : China
# Server = ${_http}://${_domain}/manjaro/unstable/$repo/$arch
```

### 3. 保存文件并更新源列表

在您的编辑器内保存更改，并退出编辑器，随后执行以下命令：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syu
```

## 引用

1. [使用帮助 - Manjaro Wiki](https://wiki.manjaro.org/index.php/Change_to_a_Different_Download_Server)
