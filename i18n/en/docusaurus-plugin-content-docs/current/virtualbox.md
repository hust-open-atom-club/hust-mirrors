---
title: VirtualBox Software Repository Mirror Usage Guide
sidebar_label: virtualbox
cname: virtualbox
slug: /virtualbox
---

[Oracle Virtualbox](https://www.virtualbox.org/) VirtualBox is an open-source virtualization software. Developed by German company Innotek and produced by Sun Microsystems. Written in Qt, it was officially renamed to Oracle VM VirtualBox after Sun was acquired by Oracle. It is open-source under the GPL license.

## Universal Installation Packages {#universal}

Universal installation packages support:
- Windows
- macOS
- Linux
- SunOS

Click [this link](/release?release=Virtualbox), select the required version and operating system to download the latest version of VirtualBox.

:::info For Linux Users

If your system is a supported Linux distribution, it is recommended to use the package manager for installation. Refer to [Supported Linux Distributions](#package-manager).

If not, after downloading the universal `run` file (e.g., `VirtualBox-5.0.24-108355-Linux_x86.run`), use `chmod +x` to grant execution permissions and install directly.

:::

## Supported Linux Distributions {#package-manager}

Currently supported systems include:

* Ubuntu
* Debian
* Fedora
* openSUSE
* SUSE Linux Enterprise Server
* Oracle Linux / Red Hat Enterprise Linux / CentOS

If your distribution is not listed above, please refer to [Universal Installation Packages](#universal) for installation.

### Installation via Pre-compiled Binary Packages

Click [this link](/release?release=Virtualbox%20\(package%20manager\)), select the version (e.g., `5.0.24`),
find the file named distribution_name~release_codename~architecture.
For example, `virtualbox-5.0_5.0.24-108355~Ubuntu~xenial_i386.deb` to download and install.

### Installation via Package Manager

#### Debian / Ubuntu Users

First, trust VirtualBox's GPG public key:

- For Debian 8 and Ubuntu 16.04 and above:

```shell varcode
[ ] (root) Is root user?
---
const sudo = !root ? 'sudo ' : '';
---
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | ${sudo}apt-key add -
```

- For other versions:

```shell varcode
[ ] (root) Is root user?
---
const sudo = !root ? 'sudo ' : '';
---
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | ${sudo}apt-key add -
```

Then select your Debian/Ubuntu version and write the content from the text box into `/etc/apt/sources.list.d/virtualbox.list`

```bash varcode title="/etc/apt/sources.list.d/virtualbox.list"
[ ] (a) { 0:Debian 11 (bullseye), 1:Debian 10 (buster), 2:Debian 9 (stretch), 3:Debian 8 (jessie), 4:Ubuntu 22.04 LTS, 5:Ubuntu 20.04 LTS, 6:Ubuntu 18.04 LTS, 7:Ubuntu 16.04 LTS, 8:Ubuntu 14.04 LTS } Distribution
---
let release_name = ""
if(a === "0") { release_name = "bullseye"; }
if(a === "1") { release_name = "buster"; }
if(a === "2") { release_name = "stretch"; }
if(a === "3") { release_name = "jessie"; }
if(a === "4") { release_name = "jammy"; }
if(a === "5") { release_name = "focal"; }
if(a === "6") { release_name = "bionic"; }
if(a === "7") { release_name = "xenial"; }
if(a === "8") { release_name = "trusty"; }
---
deb ${_http}://${_domain}/virtualbox/debian/ ${release_name} contrib
```

Install VirtualBox:

```bash varcode
[ ] (root) Is root user?
---
const sudo = !root ? 'sudo ' : '';
---
${sudo}apt-get update
${sudo}apt-get install virtualbox
# Available versions will be listed; select the desired version to install
```

#### RHEL/CentOS Users

Create `/etc/yum.repos.d/virtualbox.repo` with the following content:

```ini varcode title="/etc/yum.repos.d/virtualbox.repo"
---
---
[virtualbox]
name=Virtualbox Repository
baseurl=${_http}://${_domain}/virtualbox/rpm/el$releasever/
gpgcheck=0
enabled=1
```

Refresh the cache and install `virtualbox`:

```bash varcode
[ ] (root) Is root user?
---
const sudo = !root ? 'sudo ' : '';
---
${sudo}yum makecache
${sudo}yum search VirtualBox
# Available versions will be listed; select the desired version to install
```