---
sidebar_label: AOSP
title: Android Open Source Project 仓库镜像使用帮助
---

## 初次克隆使用方法

### 下载git-repo工具
首先，下载git-repo工具，工具已在该镜像站同步。

```bash varcode
curl ${_http}://${_domain}/git-repo/git-repo -o repo
chmod +x repo

# 移动到/usr/local/bin中，或者设置当前路径到PATH中
sudo mv repo /usr/local/bin
```

### 克隆仓库

```bash varcode
export REPO_URL='${_http}://${_domain}/git-repo'

repo init -u ${_http}://${_domain}/git/AOSP/platform/manifest
```

默认同步master，如果需要clone特定的分支，请执行

```bash varcode
repo init -u ${_http}://${_domain}/git/AOSP/platform/manifest -b android-13.0.0_r44
```

开始执行同步
```bash varcode
repo sync -j4 # 4为并发数
```




## 更新现有仓库到镜像源

如果你之前已经通过某种途径获得了 AOSP 的源码，
你希望以后通过该镜像站同步 AOSP 部分的代码，只需要修改AOSP目录下.repo/manifests.git/config，将

```
url = https://android.googlesource.com/platform/manifest
```

更改为

```raw varcode
url = ${_http}://${_domain}/git/AOSP/platform/manifest
```

