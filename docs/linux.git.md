---
title: Linux Git 镜像使用帮助
sidebar_label: Linux
cname: 'linux.git'
---

本镜像站中，所有以.git结尾的为git仓库镜像。 在镜像站首页点击相应的链接，即可复制clone链接。

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


## References

[1] [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)
[2] [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)
