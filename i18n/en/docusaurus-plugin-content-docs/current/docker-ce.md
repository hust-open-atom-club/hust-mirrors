---
title: Docker CE Mirror Usage Guide
sidebar_label: Docker CE
type: install
---

:::caution
This mirror is not DockerHub and can only be used to install Docker CE. It cannot be used to index or pull container images from DockerHub!!!
:::

## Docker CE Introduction

Docker CE, or Docker Community Edition, is the free version of Docker for developers and small teams. It provides community support and faster update cycles. It is hosted at [https://download.docker.com](https://download.docker.com).

## Automatic Installation

Docker officially provides an automatic configuration and installation [script](https://get.docker.com) that supports installation on Debian, RHEL, SUSE series, and derivative systems.

:::caution
Docker officially [does not recommend](https://github.com/docker/docker-install/blob/master/install.sh#L5-L9) using this script to install Docker CE in production environments!!!
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

## Manual Installation

### Debian/Ubuntu/Raspbian

1. First remove Docker maintained by the official repository:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do ${SUDO}apt remove -y \${pkg}; done
```

2. Preparation:

```shell varcode
[ ] (version) { ubuntu:Ubuntu, debian:Debian, raspbian:Raspbian } Distribution
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
# Install dependencies
${SUDO}apt install -y gnupg ca-certificates

# Configure GPG public key
${SUDO}install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/${version}/gpg | ${SUDO}gpg --dearmor -o /etc/apt/keyrings/docker.gpg
${SUDO}chmod a+r /etc/apt/keyrings/docker.gpg

# Configure software source
${SUDO}tee /etc/apt/sources.list.d/docker.list > /dev/null << EOF
deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] ${_http}://${_domain}/docker-ce/linux/${version} $(lsb_release -sc) stable
EOF
```

3. Install Docker CE:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update -y && ${SUDO}apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Fedora

1. First remove Docker maintained by the official repository:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine; do ${SUDO}dnf remove -y \${pkg}; done
```

2. Install dependencies, download repo file, and replace the software repository address with the mirror site:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}dnf -y install dnf-plugins-core
${SUDO}dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
${SUDO}sed -i 's+https://download.docker.com+${_http}://${_domain}/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

3. Install Docker CE:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### CentOS/RHEL

1. First remove Docker maintained by the official repository:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
for pkg in docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine; do ${SUDO}yum remove -y \${pkg}; done
```

2. Install dependencies, download repo file, and replace the software repository address with the mirror site:

```shell varcode
[ ] (version) { centos:CentOS, rhel:RHEL } Distribution
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}yum install -y yum-utils
${SUDO}yum-config-manager --add-repo https://download.docker.com/linux/${version}/docker-ce.repo
${SUDO}sed -i 's+https://download.docker.com+${_http}://${_domain}/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

3. Install Docker CE:

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## References

1. [Tsinghua Mirror Usage Guide](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce)