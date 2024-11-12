---
title: Termux
sidebar_label: Termux
cname: termux
---


## What is Termux

Termux is a terminal application that runs on Android. It does not require root access and operates within internal storage (not on the SD card).

It comes with a package manager that can install many modern development and system maintenance tools. For example:

 * neovim
 * tmux
 * zsh
 * clang
 * gcc
 * weechat
 * irssi
 * ...

## How to use Termux mirrors


### Graphical User Interface (GUI) replacement

In the newer versions of Termux, the official team provides a Terminal User Interfaces (TUI) for semi-automatic mirror replacement,  which is recommended to use to avoid other risks.
* You need to update termux-tools to version 1.42.1 first.
Execute the following command in Termux:

```bash
apt update && apt upgrade termux-tools
termux-change-repo
```

Under the guidance of the graphical interface, you can use the built-in arrow keys to move up and down.   
First step, use the spacebar to select Single Mirror. Then, in the second step, select the mirrors.hust.edu.cn mirror source. After confirming, press Enter, and the mirror source will be automatically changed.

### Replace using the command line


Use the following command to replace the official source with the mirror source:

```bash varcode
---
---
sed -i 's@^\\(deb.*stable main\\)$@#\\1\\ndeb ${_http}://${_domain}/termux/apt/termux-main stable main@' $PREFIX/etc/apt/sources.list
apt update && apt upgrade
```

Use the following command to replace the community source x11-repo with a mirror source (if it is already enabled):

```bash varcode
---
---
sed -i 's@^\\(deb.*x11 main\\)$@#\\1\\ndeb ${_http}://${_domain}/termux/apt/termux-x11 x11 main @' $PREFIX/etc/apt/sources.list.d/x11.list 
apt update && apt upgrade 
```
Use the following command to replace the community source root-repo with a mirror source (if it is already enabled):

```bash varcode
---
---
sed -i 's@^\\(deb.*root main\\)$@#\\1\\ndeb ${_http}://${_domain}/termux/apt/termux-root root main @' $PREFIX/etc/apt/sources.list.d/root.list 
apt update && apt upgrade 
``` 

### Edit manually

To replace the official source with a mirror source, you need to edit `$PREFIX/etc/apt/sources.list` and modify it to the following content:

```properties varcode title="$PREFIX/etc/apt/sources.list"
---
---
# Termux repository mirror
deb ${_http}://${_domain}/termux/apt/termux-main stable main
```

To replace the official source with a mirror source, you need to edit `$PREFIX/etc/apt/sources.list` and modify it to the following content:

```properties varcode title="$PREFIX/etc/apt/sources.list.d/x11.list"
---
---
# Termux repository mirror
deb ${_http}://${_domain}/termux/apt/termux-x11 x11 main 
```

To replace the community source root-repo with a mirror source, you need to edit `$PREFIX/etc/apt/sources.list.d/root.list` and modify it to the following content:


```properties varcode title="$PREFIX/etc/apt/sources.list.d/root.list.d/root.list"
---
---
# Termux repository mirror
deb ${_http}://${_domain}/termux/apt/termux-root root stable 
```
 
Please use the built-in or installed text editor in Termux, such as: `vi` / `vim` / `nano` and so on. **Do not use other external apps with ROOT permissions, such as RE Manager** to modify Termux's files

Note: Termux will automatically set the environment variable `$PREFIX` to `/data/data/com.termux/files/usr`

### Warning

* The mirror is only suitable for Android 7.0 (API 24) and later versions. Using this mirror on older systems may cause program errors.
* The Termux on Google Play has been deprecated, and installing it may cause compatibility issues. Please install Termux through GitHub or F-Droid.
