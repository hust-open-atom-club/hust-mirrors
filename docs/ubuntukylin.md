---
title: 优麒麟镜像使用帮助
sidebar_label: UbuntuKylin
---

## 优麒麟简介与软件管理

优麒麟是由麒麟软件有限公司主导开发的基于 Ubuntu 的 Linux 发行版，是 Ubuntu 官方派生版本之一。
其专注于研发 “友好易用，简单轻松” 的桌面环境，致力为全球用户带来更智能的用户体验。

优麒麟使用软件包管理工具 `APT` 来管理 DEB 软件包。
其软件源包含两部分：
- 一部分是 Ubuntu 软件源。
- 另一部分是优麒麟软件源。

## Ubuntu 官方软件源替换

:::info 
除了优麒麟的软件源以外，优麒麟和 Ubuntu 的软件源是一样的，请直接参考 [Ubuntu 文档](./ubuntu)。

:::

:::caution
注意，优麒麟预装时可能已经替换 Ubuntu 源为阿里云，请不要参考 Ubuntu 文档中的 “一键换源” 的部分。
:::

点击[这里](./ubuntu)查看 ubuntu 软件源替换方法。


## 优麒麟官方软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list.d/ukui.list` 以及
`/etc/apt/sources.list.d/software.list` 的原有内容：

```bash varcode title=/etc/apt/sources.list.d/ukui.list
[ ] (version) { jammy:22.04 LTS, groovy:20.10, focal:20.04 LTS } 优麒麟版本
---
deb ${_http}://${_domain}/ubuntukylin/ ${version} main
```

```bash varcode title=/etc/apt/sources.list.d/software.list
[ ] (version) { jammy:22.04 LTS, groovy:20.10, focal:20.04 LTS } 优麒麟版本
---
deb ${_http}://${_domain}/ubuntukylin/ ${version}-partner main
```

2. 通过如下命令更新软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```


## 镜像下载 {#image}

该站同步了优麒麟的安装镜像。

请点击下面的按钮后，选择相应版本，进行下载安装。

<a href="/release?release=Ubuntu%20Kylin">
    <button className="button button--primary">下载镜像</button>
</a>
