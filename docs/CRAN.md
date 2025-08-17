---
sidebar_label: CRAN
title: CRAN仓库镜像使用帮助
type: lang
automated: true 
detection:
  policy: OneOf
  checks:
    - type: file
      path: ~/.Rprofile
---

## CRAN 介绍
CRAN 是一个由世界各地的 ftp 和 Web 服务器组成的网络，存储相同的最新版本的 R 代码和文档。

## 使用方法

### 长期使用
CRAN (The Comprehensive R Archive Network) 镜像源配置文件之一是 `.Rprofile` (linux 下位于 `~/.Rprofile`)。

```yaml cli
type: ReplaceIfExist
required: true
description: 替换R配置文件
privileged: false
files:
  - path: ~/.Rprofile
    statement: '$a options("repos" = c(CRAN="http://${_domain}/CRAN/"))'
```


打开 R 即可使用该 CRAN 镜像源安装 R 软件包。

### 临时使用
在安装时指定 repo，如安装 lattice：

```raw varcode
install.packages("lattice", repos="${_http}://${_domain}/CRAN/")
```

## 引用
1. [Tuna 镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CRAN/)  
