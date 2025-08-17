---
sidebar_label: Oh My Zsh
title: Oh My Zsh Git 镜像使用帮助
type: install
---

## Oh My Zsh 简介
Oh My Zsh 是基于 zsh 命令行的一个扩展工具集，提供了丰富的扩展功能，用于管理您的 Zsh 配置。
它捆绑了数千个有用的功能、助手、插件、主题，并且开箱即用。

## 安装
如果还没有安装 Oh My Zsh，可以通过修改安装脚本中的变量默认值，将其设置为镜像站点的地址安装，使用如下命令：

```yaml cli
type: TestAndExecute
privileged: false
interpreter: shell
test: |
  has_command omz && return 1
exec: |
  #{USE_IN_DOCS/}
  REMOTE=${_http}://${_domain}/git/ohmyzsh.git sh -c "$(curl -fsSL ${_http}://${_domain}/ohmyzsh.git/install.sh)"
  #{/USE_IN_DOCS}
```

## 切换已有 ohmyzsh 至镜像源
如果已经安装了 Oh My Zsh，可以将 git 仓库的 remote 设置为当前镜像站点的地址，使用如下命令：
```yaml cli
type: TestAndExecute
privileged: false
interpreter: shell
test: |
  has_command omz
exec: |
  #{USE_IN_DOCS/}
  git -C $ZSH remote set-url origin ${_http}://${_domain}/git/ohmyzsh.git
  git -C $ZSH pull
  #{/USE_IN_DOCS}
```