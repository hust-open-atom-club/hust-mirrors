---
title: Linux Stable Git 镜像使用帮助
sidebar_label: Linux Stable
cname: 'linux-stable.git'
---

如需克隆 Linux Stable 代码，使用

```bash varcode
git clone ${_http}://${_domain}/git/linux-stable.git
```

若要将 mirror 加入已有代码库，可在已有仓库中运行

```bash varcode
git remote add mirror ${_http}://${_domain}/git/linux-stable.git
```

或运行

```bash varcode
---
git remote set-url origin ${_http}://${_domain}/git/linux-stable.git
```

将默认上游设置为镜像站

> 注：本页面帮助内容摘自[校园网联合镜像站](https://mirrors.cernet.edu.cn/about)的[帮助仓库](https://github.com/mirrorz-org/mirrorz-help)
