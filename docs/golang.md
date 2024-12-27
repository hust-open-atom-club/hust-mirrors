---
title: Golang 安装文件使用帮助
sidebar_label: Golang
---

## Golang 简介
Golang 是一个开源项目，旨在提高程序员的工作效率。

Go 富有表现力、简洁、干净且高效。它的并发机制使编写能够充分利用多核和联网机器的程序变得容易，
而其新颖的类型系统可以实现灵活和模块化的程序构建。

Go 可以快速编译为机器代码，同时还具有垃圾收集的便利性和运行时反射的强大功能。
它是一种快速、静态类型的编译语言，感觉就像一种动态类型的解释语言。

## Golang 安装

:::info
镜像站提供 Golang 在 Linux/Windows/Mac/FreeBSD 四个平台上的安装包，请根据自己使用的系统下载对应系统的安装包。
:::

### Linux/FreeBSD 安装
1. 首先在[下载页面](/release/?release=Golang)下载对应系统和架构的安装包，或使用如下命令下载：
    ```shell varcode
    # use wget
    wget ${_http}://${_domain}/golang/<version>.linux-<arch>.tar.gz
    # use curl
    curl -O ${_http}://${_domain}/golang/go<version>.linux-<arch>.tar.gz
    ```

2. 下载完成后，如果之前安装过 Golang，则需要执行以下命令移除：
    ```shell varcode
    [ ] (root) 是否为 root 用户
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}rm -rf /usr/local/go
    ```

3. 移除之后，执行如下命令将二进制文件解压到系统路径中：
    ```shell varcode
    [ ] (root) 是否为 root 用户
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}tar -C /usr/local -xzf go<version>.linux-<arch>.tar.gz
    ```

4. 将 Golang 可执行文件所在路径添加到环境变量 `PATH` 中：
    ```shell varcode
    # 仅对当前终端有效
    export PATH=$PATH:/usr/local/go/bin
    # 长期生效
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc # 如果使用 zsh
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc # 如果使用 bash
    ```

5. 验证安装，打开一个新的终端，输入：
    ```shell
    go version
    ```

打印出下载的 Golang 版本则代表 Golang 安装成功。

### Windows 安装
1. 首先在[下载页面](/release/?release=Golang)下载对应系统和架构的安装包，建议下载 MSI 包。

2. 打开下载的 MSI 文件并按照提示安装 Golang。

    :::caution
    安装完成后，如果有开启的终端或命令提示符，需要重新打开才能使用 `go` 命令。
    :::

3. 验证安装，打开终端或命令行提示符，输入：
    ```shell
    go version
    ```

打印出下载的 Golang 版本则代表 Golang 安装成功。

### Mac 安装
1. 首先在[下载页面](/release/?release=Golang)下载对应系统和架构的安装包，建议下载 pkg 包。

2. 打开下载的 pkg 文件并安装提示安装 Golang，安装包将会将 Golang 安装到 `usr/local/go` 目录，并将该目录加入环境变量 `PATH` 中。

3. 验证安装，打开终端或命令行提示符，输入：
    ```shell
    go version
    ```
打印出下载的 Golang 版本则代表 Golang 安装成功。

## 引用
1. [Golang 官方文档](https://go.dev/doc/install)
