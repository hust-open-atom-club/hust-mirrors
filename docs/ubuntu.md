# Ubuntu

本镜像仅包含32/64位 x86 架构处理器的软件包，
在ARM(arm64, armhf)、PowerPC(ppc64el)、RISC - V(riscv64) 和
S390x等架构的设备上（对应官方源为 ports.ubuntu.com）
请使用 `ubuntu-ports` 镜像。

Ubuntu 的软件源配置文件是 `/etc/apt/sources.list`。
为避免替换后出现问题，可以先将系统自带的该文件做个备份。
```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

然后将该文件替换为下面内容，即可使用选择的软件源镜像。

:::caution
因镜像站同步有延迟，可能会导致生产环境系统不能及时检查、安装上最新的安全更新，不建议替换 security 源。
:::


```bash varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu版本
[x] (secure) 使用官方安全更新软件源： 
[-] (proposed) 启用预发布软件源
[-] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
const SECURE_URL = secure ? '://security.ubuntu.com/ubuntu/' : '://hustmirror.cn/ubuntu/';
---
deb ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
deb ${_http}${SECURE_URL} ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}${SECURE_URL} ${version}-security main restricted universe multiverse

${PROPOSED_PREFIX}deb ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
```

保存该文件至`/etc/apt/sources.list`。
