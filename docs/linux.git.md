---
title: Linux Git 镜像使用帮助
sidebar_label: Linux
cname: 'linux.git'
---

如需克隆 Linux 代码，使用

```bash varcode
git clone ${_http}://${_domain}/git/linux.git
```

若要将 mirror 加入已有代码库，可在已有仓库中运行

```bash varcode
git remote add mirror ${_http}://${_domain}/git/linux.git
```

或运行

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/linux.git
```

将默认上游设置为镜像站

### 增量下载

如果需要其它 linux 分支的代码（如树莓派内核代码），可以在 clone 本项目基础上增量下载分支的代码，从而加速下载

以树莓派为例，具体操作为

```bash varcode
git clone ${_http}://${_domain}/git/linux.git
git remote add rasp https://github.com/raspberrypi/linux.git
git fetch rasp
```

> 注：本页面帮助内容摘自[校园网联合镜像站](https://mirrors.cernet.edu.cn/about)的[帮助仓库](https://github.com/mirrorz-org/mirrorz-help)
