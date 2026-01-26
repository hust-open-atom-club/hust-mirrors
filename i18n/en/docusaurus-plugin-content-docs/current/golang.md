---
title: Golang Installation Files Usage Guide
sidebar_label: Golang
---

## Golang Introduction
Golang is an open-source project aimed at improving programmer productivity.

Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that make full use of multi-core and networked machines,
while its novel type system enables flexible and modular program construction.

Go can quickly compile to machine code while also having the convenience of garbage collection and the powerful functionality of runtime reflection.
It is a fast, statically typed compiled language that feels like a dynamically typed interpreted language.

## Golang Installation

:::info
The mirror site provides installation packages for Golang on four platforms: Linux/Windows/Mac/FreeBSD. Please download the installation package corresponding to your system.
:::

### Linux/FreeBSD Installation

1. First download the installation package corresponding to your system and architecture from the [download page](/release/?release=Golang), or use the following command to download:

    ```shell varcode
    # use wget
    wget ${_http}://${_domain}/golang/<version>.linux-<arch>.tar.gz
    # use curl
    curl -O ${_http}://${_domain}/golang/go<version>.linux-<arch>.tar.gz
    ```

2. After downloading, if Golang was previously installed, execute the following command to remove it:
    ```shell varcode
    [ ] (root) Whether root user
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}rm -rf /usr/local/go
    ```

3. After removal, execute the following command to extract the binary files to the system path:
    ```shell varcode
    [ ] (root) Whether root user
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}tar -C /usr/local -xzf go<version>.linux-<arch>.tar.gz
    ```

4. Add the Golang executable file path to the environment variable `PATH`:
    ```shell varcode
    # Only effective for current terminal
    export PATH=$PATH:/usr/local/go/bin
    # Long-term effective
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc # If using zsh
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc # If using bash
    ```

5. Verify installation, open a new terminal and enter:
    ```shell
    go version
    ```

If the downloaded Golang version is printed, Golang installation is successful.

### Windows Installation
1. First download the installation package corresponding to your system and architecture from the [download page](/release/?release=Golang). It is recommended to download the MSI package.

2. Open the downloaded MSI file and follow the prompts to install Golang.

    :::caution
    After installation is complete, if you have an open terminal or command prompt, you need to reopen it to use the `go` command.
    :::

3. Verify installation, open terminal or command prompt and enter:
    ```shell
    go version
    ```

If the downloaded Golang version is printed, Golang installation is successful.

### Mac Installation
1. First download the installation package corresponding to your system and architecture from the [download page](/release/?release=Golang). It is recommended to download the pkg package.

2. Open the downloaded pkg file and follow the prompts to install Golang. The installation package will install Golang to the `usr/local/go` directory and add this directory to the environment variable `PATH`.

3. Verify installation, open terminal or command prompt and enter:
    ```shell
    go version
    ```
If the downloaded Golang version is printed, Golang installation is successful.

## References
1. [Golang Official Documentation](https://go.dev/doc/install)