---
sidebar_label: openEuler
title: openEuler 软件仓库镜像使用帮助
type: OS
detection:
  checks:
    - type: os_release
      name: openEuler
---

## openEuler 简介与软件管理

openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源操作系统项目，旨在为服务器和云计算环境提供强大的操作系统支持。openEuler 由中国的华为公司领导并由社区支持。当前 openEuler 系统基于 Linux 内核，支持鲲鹏，RISC-V 及其它多种处理器，能够充分释放计算芯片的潜能，是由全球开源贡献者构建的高效、稳定、安全的开源操作系统，适用于数据库、大数据、云计算、人工智能等应用场景。

openEuler 使用 `dnf` 工具来管理 RPM 软件包，查询软件包信息，从指定软件库获取软件包，自动处理依赖关系以安装及卸载软件包，以及更新系统。openEuler 通过 `/etc/yum.repos.d/openEuler.repo` 文件来进行配置与管理软件源。

## openEuler 软件源替换

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令修改软件源配置文件 `/etc/yum.repos.d/openEuler.repo`

```yaml cli
type: ReplaceIfExist
required: true
optional: false
description: 替换Linux Mint主仓库
privileged: true
files:
  - path: /etc/yum.repos.d/openEuler.repo
    match: 'http://repo.openeuler.org'
    replace: '${_http}://${_domain}/openeuler'
  - path: /etc/yum.repos.d/openEuler.repo
    match: '\\(metalink=.*$\\)'
    replace: '# \\1'
    comment: 目前本镜像站暂不支持 openEuler 的 metalink 功能，因此需要注释相关行
```

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/yum.repos.d/openEuler.repo` 的原有内容：

```ini varcode
[ ] (version) {23.09:23.09, 23.03:23.03, 22.09:22.09, 22.03-LTS-SP3:22.03 LTS SP3, 22.03-LTS-SP2:22.03 LTS SP2, 22.03-LTS-SP1:22.03 LTS SP1, 22.03-LTS:22.03 LTS, 21.09:21.09, 21.03:21.03, 20.09:20.09, 20.03-LTS-SP4:20.03 LTS SP4, 20.03-LTS-SP3:20.03 LTS SP3, 20.03-LTS-SP2:20.03 LTS SP2, 20.03-LTS-SP1:20.03 LTS SP1, 20.03-LTS:20.03 LTS} openEuler 版本
---
[OS]
name=OS
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/OS/$basearch/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/OS&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[Everything]
name=everything
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/everything/$basearch/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/everything&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/everything/$basearch/RPM-GPG-KEY-openEuler

[EPOL]
name=EPOL
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/EPOL/main/$basearch/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/EPOL/main&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[Debuginfo]
name=debuginfo
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/debuginfo/$basearch/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/debuginfo&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/debuginfo/$basearch/RPM-GPG-KEY-openEuler

[Source]
name=source
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/source/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever&arch=source
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/source/RPM-GPG-KEY-openEuler

[Update]
name=update
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/update/$basearch/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/update&arch=$basearch
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/OS/$basearch/RPM-GPG-KEY-openEuler

[Update-source]
name=update-source
baseurl=${_http}://${_domain}/openeuler/openEuler-${version}/update/source/
# metalink=https://mirrors.openeuler.org/metalink?repo=$releasever/update&arch=source
metadata_expire=1h
enabled=1
gpgcheck=1
gpgkey=${_http}://${_domain}/openeuler/openEuler-${version}/source/RPM-GPG-KEY-openEuler
```

### 2. 通过如下命令更新软件。

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  dnf update
  #{/USE_IN_DOCS}
```



## 注意事项

:::caution
目前本镜像站暂不支持 openEuler 的 metalink 功能，可能存在一定的安全风险，请谨慎使用。
:::

YUM 包管理器的 metalink 功能可向用户提供受信任的镜像列表，保护用户免受中间人攻击的影响，并防止用户从恶意或陈旧的镜像源下载存在已知漏洞的过时软件。 
然而本站目前暂不支持 openEuler 的 metalink 功能，错误的 metalink 配置可能会导致系统升级失败，因此本站提供的 openEuler 配置中暂不包含 metalink 配置。

## 引用

1. [使用 DNF 管理软件包](https://docs.openeuler.org/zh/docs/22.03_LTS_SP2/docs/Administration/%E4%BD%BF%E7%94%A8DNF%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%E5%8C%85.html)  
2. [Features/YumMetalinks - Fedora Project Wiki](https://fedoraproject.org/wiki/Features/YumMetalinks)
