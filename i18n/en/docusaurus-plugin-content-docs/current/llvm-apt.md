---
title: LLVM APT Mirror Usage Guide
sidebar_label: LLVM APT
---

:::info

Some content in this document may have been translated by AI.

:::

## LLVM APT Introduction

LLVM APT is an APT repository provided for Debian and Ubuntu systems to install the LLVM toolchain.

## Automatic Installation

LLVM official provides an automatic configuration and installation [script](https://mirrors.hust.edu.cn/llvm-apt/llvm.sh), supporting Debian and Ubuntu series installation.

```shell varcode
[ ] (version) { all:Default, 19:19, 18:18, 17:17, 16:16, 15:15, 14:14, 13:13, 12:12, 11:11, 10:10, 9:9 } LLVM Version
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
wget ${_http}://${_domain}/llvm-apt/llvm.sh -O llvm.sh
chmod +x llvm.sh
./llvm.sh ${version} -m ${_http}://${_domain}/llvm-apt
```

## Manual Installation

```shell varcode
[ ] (version) { noble:Ubuntu 24.04, jammy:Ubuntu 22.04, focal:Ubuntu 20.04, bookworm:Debian 12, bullseye:Debian 11 } Distribution
[ ] (src) Enable source mirror
[ ] (root) Whether is root user
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
