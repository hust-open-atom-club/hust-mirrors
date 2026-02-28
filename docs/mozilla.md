---
sidebar_label: Mozilla
title: Mozilla 软件仓库镜像使用帮助
---

## 简介

此镜像仓库为基于 Debian 的发行版提供了官方打包的 FireFox 浏览器，支持 amd64、arm64 架构。

目前，Debian 稳定版只包含了长期支持版本 firefox-esr，而 Ubuntu 的 FireFox 切换到了 Snap 包。有需要的用户可使用本仓库提供的 APT 源。

## 使用方法

1. 如果 APT 仓库密钥不存在，创建一个目录来存储它：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}install -d -m 0755 /etc/apt/keyrings
```

2. 下载并导入 Mozilla 软件仓库密钥：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | ${SUDO}tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null
```

指纹应为 `35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3`。你可以用以下命令检查：

```bash varcode
gpg -n -q --import --import-options import-show /etc/apt/keyrings/packages.mozilla.org.asc | awk '/pub/{getline; gsub(/^ +| +$/,""); if($0 == "35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3") print "\nThe key fingerprint matches ("$0").\n"; else print "\nVerification failed: the fingerprint ("$0") does not match the expected one.\n"}'
```

如果你还没安装 wget，可以用以下方法安装：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt-get install wget
```

3. 将 Mozilla APT 仓库添加到你的 sources.list：

Debian 12 及以下版本：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] ${_http}://${_domain}/mozilla/ mozilla main" | ${SUDO}tee -a /etc/apt/sources.list.d/mozilla.list > /dev/null
```

Debian 13 及以上版本：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
cat <<EOF | ${SUDO}tee /etc/apt/sources.list.d/mozilla.sources
Types: deb
URIs: https://packages.mozilla.org/apt
Suites: mozilla
Components: main
Signed-By: /etc/apt/keyrings/packages.mozilla.org.asc
EOF
```

4. 更新 APT 缓存并安装：

```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt-get update && ${SUDO}apt-get install firefox
```

## 引用

1. [使用帮助 - Mozilla Firefox](https://support.mozilla.org/en-US/kb/install-firefox-linux#w_install-firefox-deb-package-for-debian-based-distributions)
2. [使用帮助 - TUNA 镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/mozilla/)
