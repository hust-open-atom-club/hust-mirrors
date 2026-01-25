---
sidebar_label: Deepin
title: Deepin Mirror Usage Guide
cname: 'deepin'
typs: OS
detection:
  checks:
    - type: os_release
      name: Deepin
---

## Introduction to Deepin and Software Management

Deepin (formerly known as Linux Deepin) is committed to providing a beautiful, user-friendly, secure, and reliable Linux distribution for users worldwide. The Deepin project was initiated in 2008 and released its first version under the name "Linux Deepin" in 2009. In April 2014, it was renamed "Deepin" and is often referred to as the "Deepin Operating System" in China. Deepin is an open-source operating system primarily based on the Linux kernel and focuses on the desktop environment. It features a clean and modern interface, a wide range of applications and tools, and can meet daily office, study, and entertainment needs.

Deepin uses the APT package management tool to manage DEB software packages. Specifically, Deepin manages system software sources by modifying the `/etc/apt/sources.list` configuration file. In general, users can replace the default source address in this configuration file (i.e., `https://community-packages.deepin.com/`) with the mirror source provided by this software mirror site.

## Replacing Deepin Software Sources

### One-Click Source Replacement (YAML CLI)

:::caution
This method is only applicable when switching from official sources to the mirror sources on this site. If you have already switched sources, please do not use the following commands.
:::

Use the YAML CLI method to replace the default source address [https://community-packages.deepin.com/](https://community-packages.deepin.com/) in the software source configuration file with the current mirror source site.

```yaml cli
type: ReplaceIfExist
required: true
optional: false
description: Replace Deepin main repository
privileged: true
files:
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/deepin'
    replace: '${_http}://${_domain}/deepin'
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/beige'
    replace: '${_http}://${_domain}/deepin/beige'
display_policy:
  kind: OneOf
  variables:
    - name: version
      description: Deepin version
      options:
        - name: 'Deepin 20'
          display: 
            - 1
        - name: 'Deepin 23-25'
          display:
            - 2
```

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.**
:::

### 1. Based on your preference, copy the following software source configuration content to `/etc/apt/sources.list` and save it.

```shell varcode
[ ] (root) Are you the root user?
[ ] (version) { apricot:Deepin 20, beige:Deepin 23 (Nightly not supported), crimson:Deepin 25 } Deepin version
[ ] (src) Enable source mirror
---
const SUDO = !root ? 'sudo ' : '';
let COMMAND = '';

if (version == 'apricot') {
  COMMAND = `://${_domain}/deepin apricot main contrib non-free`;
}
if (version == 'beige') {
  COMMAND = `://${_domain}/deepin/beige beige main community commercial`;
}
if (version == 'crimson') {
  COMMAND = `://${_domain}/deepin/beige crimson main community commercial`;
}
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}${COMMAND}
${SRC_PREFIX}deb-src ${_http}${COMMAND}
```

### 2. Update the software using the following command:

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  apt-get update
  #{/USE_IN_DOCS}
```

### One-Click Source Replacement (sed command)

:::caution
This method is only applicable when switching from official sources to the mirror sources on this site. If you have already switched sources, please do not use the following commands.
:::

Use the `sed` command to directly replace the default source address [https://community-packages.deepin.com/](https://community-packages.deepin.com/)  in the software source configuration file with the current mirror source site.

```shell varcode
[ ] (root) Are you the root user?
[ ] (version) { apricot:Deepin 20, beige:Deepin 23 } Deepin version
---
const SUDO = !root ? 'sudo ' : '';
let COMMAND = '';
let STR_TO_REPLACE = '';
let STR_REPLACED = '';

if (version == 'apricot') {
  STR_TO_REPLACE = '([^/]+)/deepin';
  STR_REPLACED = `${_domain}/deepin`;
}
if (version == 'beige') {
  STR_TO_REPLACE = '([^/]+)/' + version;
  STR_REPLACED = `${_domain}/deepin/` + version;
}
---
${SUDO}sed -E -e "s|https?://${STR_TO_REPLACE}|${_http}://${STR_REPLACED}|" /etc/apt/sources.list
```

## Important Notes

- This mirror site does not synchronize versions earlier than Deepin 20. If needed, please use the official sources. 
- This mirror site does not synchronize Deepin 23 Nightly versions. If needed, please use the official sources.
- This mirror site does not provide Deepin App Store mirrors, so please do not modify the App Store related sources in `/etc/apt/sources.list`, such as [https://app-store-files.uniontech.com/](https://app-store-files.uniontech.com/)
- Deepin 20 and above versions support HTTPS sources by default. If you encounter issues pulling HTTPS sources, please use HTTP sources to install the following software.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

## Deepin Installation Images {#cd}

This site provides the latest version of Deepin installation images for amd64, arm64, loongarch64, and riscv64 architectures, as well as other versions of Deepin installation images for the amd64 architecture.

:::info
This site includes Deepin 23 Nightly installation images, but does not currently provide its software source mirrors. If needed, please use the official sources.
:::

<a href="/release?release=deepin">
    <button className="button button--primary">Download Images</button>
</a>
