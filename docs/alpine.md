---
sidebar_label: Alpine Linux
title: Alpine Linux software repository image usage help
cname: AplineLinux
---
## Alpine Linux profile and software manage
Alpine Linux is a independent, uncommercial, universial Linux edition that based on musl libc and BusyBox, aim 
to provide compact, simple, safe and efficient basic system.The design concept of Alpine Linux is "Keep It Simple",moreover because its lightweight and efficient characteristic, it is so popular in Docker and Kubernetes
container environments.

The package management system of Alpine Linux is apk(Alpine Package Keeper). apk is a package management tool that used to Alpine Linux, it can be used to install new software packages, upgrade or delete existing software packages, update software package index and so on. 


## Alpine Linux software source replacement

:::caution
**To avoid software source configuration file appears problems after replacing, please backup the software source configuration file that built-in the system first**
:::


1. Edit `/etc/apk/repositories`, replace the original content with the below content

```bash varcode
[ ] (version) {  v3.16:v3.16, v3.17:v3.17, v3.18:v3.18, v3.19:v3.19 } Alpine edition
---
---
${_http}://${_domain}/alpine/${version}/main
${_http}://${_domain}/alpine/${version}/community
```

2. Update the software package cache 

```shell varcode
[ ] (root) whether the root user or not 
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apk update
```

## one click to change source

:::caution
This way only apply to change from the official source to this site, if you have changed the source, please
don't use the following orders.
:::

Directly replace it with the current mirror source website:

use `sed` order to make the default source address that in software source configuration file [http://dl-cdn.alpinelinux.org](http://dl-cdn.alpinelinux.org) replace it with the current mirror source site directly: 

```shell varcode
[ ] (root) whether the root user or not
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i 's/dl-cdn.alpinelinux.org/${_domain}/g' /etc/apk/repositories
```

## Quote
1. [Tuna Use help of mirror sources](https://mirrors.tuna.tsinghua.edu.cn/help/alpine/)  
    
