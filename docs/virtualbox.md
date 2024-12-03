---
title: VirtualBox 软件仓库镜像使用帮助
sidebar_label: virtualbox
cname: virtualbox
slug: /virtualbox
---

[Oracle Virtualbox](https://www.virtualbox.org/) VirtualBox 是一款开源虚拟机软件。由德国 Innotek 公司开发，Sun Microsystems 公司出品。使用 Qt 编写，在 Sun 被 Oracle 收购后正式更名成 Oracle VM VirtualBox。采用 GPL 协议开源。

## 通用安装包 {#universal}

通用安装包支持
- Windows
- macOS
- Linux 
- SunOS

点击[此链接](/release?release=Virtualbox)，选择需要的版本和操作系统下载最新版本的 VirtualBox。

:::info 针对 Linux 用户

如果你的系统是受支持的 Linux 发行版，推荐使用包管理器安装，参考[受支持的 Linux 发行版](#package-manager)。

如果不是，在下载通用的 `run` 文件（例如 `VirtualBox-5.0.24-108355-Linux_x86.run`）后，使用 `chmod +x` 给予执行权限后，直接安装即可。

:::

## 受支持的 Linux 发行版 {#package-manager}

目前支持的系统有：

* Ubuntu
* Debian
* Fedora
* openSUSE
* SUSE Linux Enterprise Server
* Oracle Linux / Red Hat Enterprise Linux / CentOS

如果您所使用的发行版不在上述列表之内，请参考[通用安装包](#universal)安装。


### 通过编译好的二进制包安装

点击[此链接](/release?release=Virtualbox%20\(package%20manager\))，选择版本（例如 `5.0.24`），
找到名为发行版名称\~发行代号\~架构的文件。
如 `virtualbox-5.0_5.0.24-108355~Ubuntu~xenial_i386.deb` 下载安装即可。


### 通过包管理器安装

#### Debian / Ubuntu 用户

首先信任 Virtualbox 的 GPG 公钥：

- 对于 Debian 8 和 Ubuntu 16.04 及以上：

```shell varcode
[ ] (root) 是否为 root 用户
---
const sudo = !root ? 'sudo ' : '';
---
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | ${sudo}apt-key add -
```

- 其他版本

```shell varcode
[ ] (root) 是否为 root 用户
---
const sudo = !root ? 'sudo ' : '';
---
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | ${sudo}apt-key add -
```

再选择你的 Debian/Ubuntu 版本，将文本框中内容写进 `/etc/apt/sources.list.d/virtualbox.list`

```bash varcode title="/etc/apt/sources.list.d/virtualbox.list"
[ ] (a) { 0:Debian 11 (bullseye), 1:Debian 10 (buster), 2:Debian 9 (stretch), 3:Debian 8 (jessie), 4:Ubuntu 22.04 LTS, 5:Ubuntu 20.04 LTS, 6:Ubuntu 18.04 LTS, 7:Ubuntu 16.04 LTS, 8:Ubuntu 14.04 LTS } 发行版
---
let release_name = ""
if(a === "0") { release_name = "bullseye"; }
if(a === "1") { release_name = "buster"; }
if(a === "2") { release_name = "stretch"; }
if(a === "3") { release_name = "jessie"; }
if(a === "4") { release_name = "jammy"; }
if(a === "5") { release_name = "focal"; }
if(a === "6") { release_name = "bionic"; }
if(a === "7") { release_name = "xenial"; }
if(a === "8") { release_name = "trusty"; }
---
deb ${_http}://${_domain}/virtualbox/debian/ ${release_name} contrib
```

安装 VirtualBox：

```bash varcode
[ ] (root) 是否为 root 用户
---
const sudo = !root ? 'sudo ' : '';
---
${sudo}apt-get update
${sudo}apt-get install virtualbox
# 此时会列出具体可用版本，选择所需版本安装
```

#### RHEL/CentOS 用户


新建 `/etc/yum.repos.d/virtualbox.repo`，内容为

```ini varcode title="/etc/yum.repos.d/virtualbox.repo"
---
---
[virtualbox]
name=Virtualbox Repository
baseurl=${_http}://${_domain}/virtualbox/rpm/el$releasever/
gpgcheck=0
enabled=1
```

刷新缓存并安装 `virtualbox` 即可。

```bash varcode
[ ] (root) 是否为 root 用户
---
const sudo = !root ? 'sudo ' : '';
---
${sudo}yum makecache
${sudo}yum search VirtualBox
# 此时会列出具体可用版本，选择所需版本安装即可
```
