---
title: LLVM APT 镜像使用帮助
sidebar_label: LLVM APT
---

## LLVM APT 介绍

LLVM APT 是一个为 Debian 和 Ubuntu 系统提供的 APT 仓库，用于安装 LLVM 工具链。

## 自动安装

LLVM 官方提供了一个自动配置与安装的[脚本](https://mirrors.hust.edu.cn/llvm-apt/llvm.sh)，支持 Debian、Ubuntu 系列的安装。

```shell varcode
[ ] (version) { all:Default, 19:19, 18:18, 17:17, 16:16, 15:15, 14:14, 13:13, 12:12, 11:11, 10:10, 9:9 } LLVM 版本
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
wget ${_http}://${_domain}/llvm-apt/llvm.sh -O llvm.sh
chmod +x llvm.sh
./llvm.sh ${version} -m ${_http}://${_domain}/llvm-apt
```

## 手动安装

```shell varcode
[ ] (version) { noble:Ubuntu 24.04, jammy:Ubuntu 22.04, focal:Ubuntu 20.04, bookworm:Debian 12, bullseye:Debian 11 } Distribution
[ ] (src) 启用源码镜像
[ ] (root) 是否为 root 用户
---
const SRC_PREFIX = src ? "" : "# ";
const SUDO = !root ? 'sudo ' : '';
---
wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | ${SUDO}apt-key add -

${SUDO}tee /etc/apt/sources.list.d/llvm.list > /dev/null << EOF
deb ${_http}://${_domain}/llvm-apt/${version} llvm-toolchain-${version} main
${SRC_PREFIX}deb-src ${_http}://${_domain}/llvm-apt/${version} llvm-toolchain-${version} main
EOF
```
