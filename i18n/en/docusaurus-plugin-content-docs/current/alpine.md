---
sidebar_label: Alpine Linux
title: Alpine Linux Software Repository Image Usage Help
cname: AplineLinux
---
## Alpine Linux Profile and Software Manage
Alpine Linux is a independent, non-commercial, general-purpose Linux distribution that based on musl libc and BusyBox, designed to provide a small, simple, safe and efficient basic system. The design concept of Alpine Linux is "Keep It Simple", and due to its lightweight and efficient characteristics, it is so popular in container environments such as Docker and Kubernetes.

The package management system of Alpine Linux is apk(Alpine Package Keeper). apk is a package management tool for Alpine Linux, which can be used to install new software packages, upgrade or delete existing software packages, update the software package index and so on. 

## Alpine Linux Software Source Replacement

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.**
:::

1. Edit `/etc/apk/repositories`, and replace the original content with the following 

```bash varcode
[ ] (version) {  v3.16:v3.16, v3.17:v3.17, v3.18:v3.18, v3.19:v3.19 } Alpine edition
---
---
${_http}://${_domain}/alpine/${version}/main
${_http}://${_domain}/alpine/${version}/community
```

2. Update the software package cache 

```shell varcode
[ ] (root) Are you the root user? 
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apk update
```

## One-click Source Replacement

:::caution
This way only apply to change from the official source to this site source. If you have already changed the source, please don't use the following orders.
:::

Use the `sed` command to directly replace the default source address [http://dl-cdn.alpinelinux.org](http://dl-cdn.alpinelinux.org) in the software source configuration file with the current mirror source site:

```shell varcode
[ ] (root) whether the root user or not
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i 's/dl-cdn.alpinelinux.org/${_domain}/g' /etc/apk/repositories
```

## Quote
1. [Tuna Mirror Source Usage Guide](https://mirrors.tuna.tsinghua.edu.cn/help/alpine/) 