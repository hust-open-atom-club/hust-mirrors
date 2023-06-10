---
title: Linux Next Git 镜像使用帮助
sidebar_label: Linux Next
cname: 'linux-next.git'
---

1. 克隆`Linux Next`源代码，运行

```bash varcode
git clone ${_http}://${_domain}/git/linux-next.git
```

2. 将`mirror`加入已有代码库，在已有仓库中运行

```bash varcode
git remote add mirror ${_http}://${_domain}/git/linux-next.git
```

或

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/linux-next.git
```

将默认上游设置为镜像站。

## References

[1] [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)

[2] [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)

[3] [关于Git镜像](https://hustmirror.cn/docs/about-git)
