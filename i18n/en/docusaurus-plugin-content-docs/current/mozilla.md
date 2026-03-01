---
sidebar_label: Mozilla
title: Mozilla Software Repository Mirror Usage Guide
---

## Introduction

This mirror repository provides officially packaged Firefox browser for Debian-based distributions, supporting amd64 and arm64 architectures.

Currently, Debian stable only includes the long-term support version firefox-esr, while Ubuntu's Firefox has switched to Snap packages. Users who need it can use the APT source provided by this repository.

## Usage

1. Create a directory to store APT repository keys if it doesn't exist:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}install -d -m 0755 /etc/apt/keyrings
```

2. Import the Mozilla APT repository signing key:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | ${SUDO}tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null
```

The fingerprint should be `35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3`. You may check it with the following command:

```bash varcode
gpg -n -q --import --import-options import-show /etc/apt/keyrings/packages.mozilla.org.asc | awk '/pub/{getline; gsub(/^ +| +$/,""); if($0 == "35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3") print "\nThe key fingerprint matches ("$0").\n"; else print "\nVerification failed: the fingerprint ("$0") does not match the expected one.\n"}'
```

If you do not have `wget` installed, you can install it with:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt-get install wget
```

3. Next, add the Mozilla APT repository to your sources.list:

For Debian Bookworm and Older:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] ${_http}://${_domain}/mozilla/ mozilla main" | ${SUDO}tee -a /etc/apt/sources.list.d/mozilla.list > /dev/null
```

For Debian Trixie and Newer:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
cat <<EOF | ${SUDO}tee /etc/apt/sources.list.d/mozilla.sources
Types: deb
URIs: ${_http}://${_domain}/mozilla/apt
Suites: mozilla
Components: main
Signed-By: /etc/apt/keyrings/packages.mozilla.org.asc
EOF
```

4. Update your package list, and install firefox:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt-get update && ${SUDO}apt-get install firefox
```

## References

1. [Using Help - Mozilla Firefox](https://support.mozilla.org/en-US/kb/install-firefox-linux#w_install-firefox-deb-package-for-debian-based-distributions)
2. [Using Help - TUNA Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/mozilla/)
