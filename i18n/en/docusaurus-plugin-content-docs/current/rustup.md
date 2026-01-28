---
sidebar_label: Rustup
title: Rustup Toolchain Installer Usage Guide
---

:::warning Important Notes
The mirror site only keeps the latest stable, beta, and nightly versions. If you need to install older toolchains using rustup, please use the official source.
:::

## Windows Users

### First-time Rust Toolchain Installation

Before using Rust (MSVC), you may need to install the MSVC compiler toolchain (Microsoft C++ Build Tools).

Use PowerShell to run the following script. (During the exe download process, Windows anti-malware service will scan the file, which may take about half a minute.)

```powershell varcode
[] (abi) { msvc: MSVC, gnu: GNU } Select Backend
[] (arch) { x86_64: x64, i386: x86 } Select Architecture
---
let name = arch == 'i386' ? 'i686-pc-windows-': 'x86_64-pc-windows-';
name += abi;
---
Invoke-WebRequest -OutFile \${env:TEMP}/rustup-init.exe ${_http}://${_domain}/rustup/rustup/dist/${name}/rustup-init.exe
\$env:RUSTUP_DIST_SERVER = "${_http}://${_domain}/rustup"
\$env:RUSTUP_UPDATE_ROOT = "${_http}://${_domain}/rustup/rustup"
& "\${env:TEMP}\\rustup-init.exe"

```

:::info About Rust Compiler Backend on Windows
If you don't know which to choose, please use the MSVC version.
:::

:::caution
The above installation script only enables the mirror source during installation. It will revert to the official source on the next update. If you need to permanently enable the mirror source,
please refer to the next section.
:::

### Permanently Enable Mirror Source for Rustup Toolchain

export function VarValue(props) {
  const appendix = props.appendix || "";
  return <WithVariables component={({ http, domain }) =>
    <code>{`${http}://${domain}/rustup${appendix}`}</code>} />
}

**Method 1:** Add environment variables in "System - Advanced System Settings - Environment Variables".

- Variable name: `RUSTUP_DIST_SERVER`, value: <VarValue/>.
- Variable name: `RUSTUP_UPDATE_ROOT`, value: <VarValue appendix="/rustup"/>.

**Method 2 (Recommended):** Execute the following PowerShell script directly:

```powershell varcode
[System.Environment]::SetEnvironmentVariable("RUSTUP_DIST_SERVER", "${_http}://${_domain}/rustup", "User")
[System.Environment]::SetEnvironmentVariable("RUSTUP_UPDATE_ROOT", "${_http}://${_domain}/rustup/rustup", "User")
```

## *nix Users

### First-time Rust Toolchain Installation

Considering that the network environment of the official website's [https://sh.rustup.rs](https://sh.rustup.rs) script may be unstable, we have mirrored this script.

Execute the following command directly to complete the installation of the Rust toolchain.

```bash varcode
[x] (shMirror) Use installation script mirror
---
const shellUrl = shMirror ? `${_http}://${_domain}/rustup/rustup.sh` : "https://sh.rustup.rs";
---
RUSTUP_DIST_SERVER="${_http}://${_domain}/rustup" \\
RUSTUP_UPDATE_ROOT="${_http}://${_domain}/rustup/rustup" \\
curl -sSf ${shellUrl} | sh
```

### Long-term Use

Add the following content to your `.bashrc`, `.zshrc` or other profile files.

```bash varcode
export RUSTUP_DIST_SERVER="${_http}://${_domain}/rustup"
export RUSTUP_UPDATE_ROOT="${_http}://${_domain}/rustup/rustup"
```
