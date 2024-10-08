---
sidebar_label: Rustup
title: Rustup工具链安装器使用帮助
---

:::warning 注意事项
镜像站只保留最新的 stable, beta 和 nightly，如果需要使用 rustup 安装旧版工具链，请使用官方源。
:::

## Windows 用户

### 初次安装 Rust 工具链

要使用 Rust （MSVC）之前，可能需要安装MSVC编译工具链（Microsoft C++ 生成工具）。

使用powershell运行下面的脚本。（下载exe过程中，Windows反恶意软件服务会进行文件扫描，可能需要等待大约半分钟。）

```powershell varcode
[] (abi) { msvc: MSVC, gnu: GNU } 选择后端
[] (arch) { x86_64: x64, i386: x86 } 选择架构
---
let name = arch == 'i386' ? 'i686-pc-windows-': 'x86_64-pc-windows-';
name += abi;
---
Invoke-WebRequest -OutFile \${env:TEMP}/rustup-init.exe ${_http}://${_domain}/rustup/rustup/dist/${name}/rustup-init.exe
\$env:RUSTUP_DIST_SERVER = "${_http}://${_domain}/rustup"
\$env:RUSTUP_UPDATE_ROOT = "${_http}://${_domain}/rustup/rustup"
& "\${env:TEMP}\\rustup-init.exe"

```

:::info 关于Windows上的Rust编译器后端
如果你不知道如何选择，请使用MSVC版本。
:::

:::caution
上面的安装脚本仅在安装时启用镜像源，下次更新又会恢复官方源，如果你需要长期启用镜像源，
请参考下一小节的内容。
:::

### 长期启用 rustup 工具链的镜像源

import React from "react";
import SharedContext from '@site/src/utils/SharedContext';
export function VarValue(props) {
  const ctx = React.useContext(SharedContext);
  const _http = ctx.https ? "https": "http";
  const _domain = ctx.domain;
  const appendix = props.appendix || "";
  return <code>{`${_http}://${_domain}/rustup${appendix}`}</code>;
}

**方法一：** 在“系统-高级系统设置-环境变量” 中增加环境变量。

- 变量名为 `RUSTUP_DIST_SERVER`，值为<VarValue/>。
- 变量名为 `RUSTUP_UPDATE_ROOT`，值为<VarValue appendix="/rustup"/>。

**方法二（推荐）：** 直接执行下面的Powershell脚本：

```powershell varcode
[System.Environment]::SetEnvironmentVariable("RUSTUP_DIST_SERVER", "${_http}://${_domain}/rustup", "User")
[System.Environment]::SetEnvironmentVariable("RUSTUP_UPDATE_ROOT", "${_http}://${_domain}/rustup/rustup", "User")
```


## *nix 用户

### 初次安装 Rust 工具链

考虑到官方网站提供的 [https://sh.rustup.rs](https://sh.rustup.rs) 脚本网络环境可能不稳定，我们已经镜像了该脚本。

直接执行下面的命令即可完成rust工具链的安装。

```bash varcode
[x] (shMirror) 使用安装脚本镜像
---
const shellUrl = shMirror ? `${_http}://${_domain}/rustup/rustup.sh` : "https://sh.rustup.rs";
---
RUSTUP_DIST_SERVER="${_http}://${_domain}/rustup" \\
RUSTUP_UPDATE_ROOT="${_http}://${_domain}/rustup/rustup" \\
curl -sSf ${shellUrl} | sh
```

### 长期使用

将下面的内容添加到你的`.bashrc`，`.zshrc`或者其他profile文件中。
```bash varcode
export RUSTUP_DIST_SERVER="${_http}://${_domain}/rustup"
export RUSTUP_UPDATE_ROOT="${_http}://${_domain}/rustup/rustup"
```
