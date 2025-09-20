---
title: QEMU Git 镜像使用帮助
cname: 'qemu.git'
sidebar_label: QEMU
type: repo
---

1. 克隆 `QEMU` 代码，运行

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git clone ${_http}://${_domain}/git/qemu.git
  #{/USE_IN_DOCS}
```


2. 将 `mirror` 加入已有代码库，在已有仓库中运行

```bash varcode
git remote add mirror ${_http}://${_domain}/git/qemu.git
```

或

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git remote set-url origin ${_http}://${_domain}/git/qemu.git
  #{/USE_IN_DOCS}
```


将默认上游设置为当前软件镜像站。

<!-- 
### 注意事项

实验性脚本（仅 TUNA 提供）

如需克隆 `QEMU` 完整源代码（包含其子模块），运行

```bash varcode
curl ${_http}://${_domain}/qemu/qemu.sh | bash
``` -->

## 引用

1. [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)

2. [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)

