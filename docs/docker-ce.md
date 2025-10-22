---
title: Docker CE 镜像使用帮助
sidebar_label: Docker CE
type: install
---

:::caution
此镜像不是 DockerHub，只可用于安装 Docker CE，无法用于索引或拉取 DockerHub 上的容器镜像！！！
:::

## Docker CE 介绍

Docker CE，即 Docker Community Edition，是针对开发者和小型团队的免费版 Docker，它提供了社区支持与较快的更新周期。其托管在 [https://download.docker.com](https://download.docker.com) 上。

## 自动安装

Docker 官方提供了一个自动配置与安装的[脚本](https://get.docker.com)，支持 Debian、RHEL、SUSE 系列及衍生系统的安装。

:::caution
Docker 官方[不建议](https://github.com/docker/docker-install/blob/master/install.sh#L5-L9)在生产环境使用此脚本安装 Docker CE！！！
:::

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  curl -fsSL https://get.docker.com -o get-docker.sh
  DOWNLOAD_URL=${_http}://${_domain}/docker-ce sh get-docker.sh
  #{/USE_IN_DOCS}
```

## 手动安装

### Debian/Ubuntu/Raspbian

1. 先删除由官方维护的 Docker：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do ${SUDO}apt remove -y \${pkg}; done
```

2. 准备工作：

```shell varcode
[ ] (version) { ubuntu:Ubuntu, debian:Debian, raspbian:Raspbian } Distribution
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
# 安装依赖
${SUDO}apt install -y gnupg ca-certificates

# 配置 GPG 公钥
${SUDO}install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/${version}/gpg | ${SUDO}gpg --dearmor -o /etc/apt/keyrings/docker.gpg
${SUDO}chmod a+r /etc/apt/keyrings/docker.gpg

# 配置软件源
${SUDO}tee /etc/apt/sources.list.d/docker.list > /dev/null << EOF
deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] ${_http}://${_domain}/docker-ce/linux/${version} $(lsb_release -sc) stable
EOF
```

3. 安装 Docker CE：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update -y && ${SUDO}apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Fedora

1. 先删除由官方维护的 Docker：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine; do ${SUDO}dnf remove -y \${pkg}; done
```

2. 安装依赖，下载 repo 文件，并把软件仓库地址替换为镜像站：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}dnf -y install dnf-plugins-core
${SUDO}dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
${SUDO}sed -i 's+https://download.docker.com+${_http}://${_domain}/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

3. 安装 Docker CE：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### CentOS/RHEL

1. 先删除由官方维护的 Docker：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine; do ${SUDO}yum remove -y \${pkg}; done
```

2. 安装依赖，下载 repo 文件，并把软件仓库地址替换为镜像站：

```shell varcode
[ ] (version) { centos:CentOS, rhel:EHEL } Distribution
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}yum install -y yum-utils
${SUDO}yum-config-manager --add-repo https://download.docker.com/linux/${version}/docker-ce.repo
${SUDO}sed -i 's+https://download.docker.com+${_http}://${_domain}/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

3. 安装 Docker CE：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 引用

1. [清华镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce)
