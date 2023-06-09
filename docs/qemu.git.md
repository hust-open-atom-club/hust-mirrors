---
title: QEMU Git 镜像使用帮助
cname: 'qemu.git'
sidebar_label: QEMU
---

## 实验性脚本（仅 TUNA 提供）

如需克隆 QEMU 代码及其子模块，使用以下脚本

```bash varcode
curl ${_http}://${_domain}/qemu/qemu.sh | bash
```

## 手动克隆

如仅需克隆 QEMU 代码，使用

```bash varcode
git clone ${_http}://${_domain}/git/qemu.git
```

若要将 mirror 加入已有代码库，可在已有仓库中运行

```bash varcode
git remote add mirror ${_http}://${_domain}/git/qemu.git
```

或运行

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/qemu.git
```

将默认上游设置为镜像站

> 注：本页面帮助内容摘自[校园网联合镜像站](https://mirrors.cernet.edu.cn/about)的[帮助仓库](https://github.com/mirrorz-org/mirrorz-help)
