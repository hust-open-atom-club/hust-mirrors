---
sidebar_label: Debian GNU/Linux
title: Debian 软件仓库镜像使用帮助
cname: 'debian'
---

一般情况下，将 `/etc/apt/sources.list` 文件中 Debian 默认的源地址 `http://deb.debian.org/` 替换为镜像地址即可。

Debian Buster 以上版本默认支持 HTTPS 源。如果遇到无法拉取 HTTPS 源的情况，请先使用 HTTP 源并安装：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
```


```shell varcode
[ ] (version) { bullseye:Debian 11, bookworm:Debian 12, sid:Unstable - SID, testing:Testing, buster:Debian 10 } Debian 版本
[x] (secureOfficial) 使用官方安全更新软件源 (暂不支持安全更新镜像)
[ ] (src) 启用源码镜像
---
let SECURITY_APPENDIX = '-security'
if (version == 'buster') SECURITY_APPENDIX = '/updates'
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
const SECURE_URL = secureOfficial ? '://security.debian.org/debian-security' : `://${_domain}/ubuntu-security`;
---
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}

${SID_PREFIX}deb ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}

${SID_PREFIX}${BACKPORTS_PREFIX}deb ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
${SID_PREFIX}${BACKPORTS_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}

${SID_PREFIX}deb ${_http}${SECURE_URL} ${version}${SECURITY_APPENDIX} main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src ${_http}${SECURE_URL} ${version}${SECURITY_APPENDIX} main contrib non-free${NFW}
```
<!-- 
为了方便快速配置，此处一并附上了 debian-security 的配置，一般来说，镜像站会同时提供 debian-security，截至写文档时，DNUI、HIT 与 NYIST 未提供该镜像，为了更准确的信息您可以前往 [Debian Security 帮助](/debian-security/) 确认。 -->

:::caution
不过，一般来说，为了更及时地获得安全更新，不推荐使用镜像站安全更新软件源，因为镜像站往往有同步延迟。参考 https://www.debian.org/security/faq.en.html#mirror
:::

### 关于 Connection reset by peer 问题的解决办法

在 apt 2.1.9 及以后的版本中，apt 的 HTTP Pipelining 特性与 Nginx 服务器疑似存在一定的不兼容问题，可能导致高带宽从镜像站下载大量软件包
（例如系统升级）时出现偶发的 Connection reset by peer 错误
（详见 [Debian bug #973581](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=973581)）。

目前，用户可以通过关闭 HTTP Pipelining 特性解决此问题。
如果需要关闭，可以在使用 `apt` 命令时加上 `-o Acquire::http::Pipeline-Depth=0` 参数，
或使用以下命令将相关设置加入 apt 系统配置中：

```bash
echo "Acquire::http::Pipeline-Depth \"0\";" > /etc/apt/apt.conf.d/99nopipelining
```
