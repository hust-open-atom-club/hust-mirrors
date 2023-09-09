---
sidebar_label: Deepin
title: Deepin 软件仓库镜像使用帮助
cname: 'deepin'
---

一般情况下，将 `/etc/apt/sources.list` 文件中 Deepin 默认的源地址 `https://community-packages.deepin.com/` 替换为镜像地址即可。本镜像站不支持 Deepin 20 前的版本。

:::caution
请注意，本镜像站不提供 Deepin App Store 的镜像，因此请不要修改 `/etc/apt/sources.list` 中与 App Store 有关的源，如 `https://app-store-files.uniontech.com/`
:::

在进行替换前，建议先备份原文件。可以使用以下命令进行备份和替换：

```shell varcode
[ ] (root) 是否为 root 用户
[ ] (version) { apricot:Deepin 20, beige:Deepin 23 } Deepin 版本
---
const SUDO = !root ? 'sudo ' : '';
let COMMAND = '';
let STR_TO_REPLACE = '';
let STR_REPLACED = '';

if (version == 'apricot') {
  STR_TO_REPLACE = '([^/]+)/deepin';
  STR_REPLACED = 'hustmirror.cn/deepin';
}
if (version == 'beige') {
  STR_TO_REPLACE = '([^/]+)/' + version;
  STR_REPLACED = 'hustmirror.cn/deepin/' + version;
}
---
${SUDO}cp /etc/apt/sources.list /etc/apt/sources.list.bak
${SUDO}sed -E -e "s|https?://${STR_TO_REPLACE}|${_http}://${STR_REPLACED}|" /etc/apt/sources.list
```
