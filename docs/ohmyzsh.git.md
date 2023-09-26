---
sidebar_label: oh-my-zsh
title: oh my zsh Git 镜像使用帮助
---

## Oh My Zsh 简介
Oh My Zsh 是基于 zsh 命令行的一个扩展工具集，提供了丰富的扩展功能，用于管理您的 Zsh 配置。
它捆绑了数千个有用的功能、助手、插件、主题，并且开箱即用......

## 安装
```bash varcode
REMOTE=${_http}://${_domain}/git/ohmyzsh.git sh -c "$(curl -fsSL ${_http}://${_domain}/ohmyzsh.git/install.sh)"
```

## 切换已有 ohmyzsh 至镜像源
```bash varcode
git -C $ZSH remote set-url origin ${_http}://${_domain}/git/ohmyzsh.git
git -C $ZSH pull
```