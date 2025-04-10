---
sidebar_label: Oh My Zsh
title: Oh My Zsh Git
---

## Introduction to Oh My Zsh
Oh My Zsh is a delightful, open source, community-driven framework for managing your Zsh configuration.
It comes bundled with thousands of helpful functions, helpers, plugins, themes, and works out of the box.

## Installation
If you have not installed Oh My Zsh yet, you can modify the variable $REMOTE in the installation script to set it to the current mirror site address with the following command:
```bash varcode
REMOTE=${_http}://${_domain}/git/ohmyzsh.git sh -c "$(curl -fsSL ${_http}://${_domain}/ohmyzsh.git/install.sh)"
```

## Switching an Existing Oh My Zsh to the Mirror Source
If you have already installed Oh My Zsh, you can set the git repository's remote url to the current mirror site address:
```bash varcode
git -C $ZSH remote set-url origin ${_http}://${_domain}/git/ohmyzsh.git
git -C $ZSH pull
```