---
title: GCC Git 镜像使用帮助
sidebar_label: gcc.git
cname: gcc.git
slug: /gcc.git
upstream: gcc.git
upstream_sha256: 91b592bd944a83869ad895c8ab657117082ef7e6f3c0c230ef1e8229975c0325
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月22日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/gcc.git)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


如需克隆 GCC 代码，使用

```plain varcode
---
---
git clone ${_http}://${_domain}/gcc.git
```

若要将 mirror 加入已有代码库，可在已有仓库中运行

```plain varcode
---
---
git remote add mirror ${_http}://${_domain}/gcc.git
```

或运行

```plain varcode
---
---
git remote set-url origin ${_http}://${_domain}/gcc.git
```

将默认上游设置为镜像站
