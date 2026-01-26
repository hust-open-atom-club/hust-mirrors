---
sidebar_label: Manjaro
title: Manjaro Repository Mirror Usage Guide
---

## Manjaro Introduction

Manjaro is based on Arch Linux, but aims to provide a more user-friendly system, allowing more users to experience the powerful features of Arch without facing the complex installation and maintenance process of Arch.

## Manual Replacement

Edit the `/etc/pacman.d/mirrorlist` file, following these steps:

### 1. Disable Other Software Sources (Optional)

Add the character `#` in front of all lines starting with the string `Server`, for example:

```mirrorlist
## Country : Germany
Server = https://mirror.philpot.de/manjaro/unstable/$repo/$arch
```

Change to:

```mirrorlist
## Country : Germany
# Server = https://mirror.philpot.de/manjaro/unstable/$repo/$arch
```

### 2. Enable This Mirror Source

Add the following content at the end of this line:

```mirrorlist varcode
## Country : China
# Server = ${_http}://${_domain}/manjaro/unstable/$repo/$arch
```

### 3. Save File and Update Source List

Save the changes in your editor and exit the editor, then execute the following command:

```bash varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syu
```

## References

1. [Usage Guide - Manjaro Wiki](https://wiki.manjaro.org/index.php/Change_to_a_Different_Download_Server)