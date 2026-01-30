---
sidebar_label: RadxaOS
title: RadxaOS Deb Repository Mirror Usage Guide
type: OS
detection:
  checks:
    - type: command
      command: rsetup
---

:::info

Some content in this document may have been translated by AI.

:::

## RadxaOS Introduction

RadxaOS is a system developed based on secondary development of Debian/Ubuntu. This mirror provides additional repository mirrors for unique RadxaOS packages.

## Debian Repository Replacement

For parts sourced from Debian, please refer to [Debian Help](./debian) for modifications.

## RadxaOS Repository Replacement

### One-click Source Change

:::caution
This method only applies to changing from official sources to our mirror sources. If you have already changed sources, please do not use the following commands.
:::
Open the terminal and execute the following commands to replace the default software source configuration:

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  ${SUDO}sed -i "s|https://radxa-repo.github.io|${_http}://${_domain}/radxa-deb|g" /etc/apt/sources.list.d/*radxa*.list
  apt-get update
  #{/USE_IN_DOCS}
recover: |
  sudo sed -e "s|h${_http}://${_domain}/radxa-deb|https://radxa-repo.github.io|g" \
           -i /etc/apt/sources.list.d/*radxa*.list
  apt-get update
```

After executing the above commands, the enabled repositories will be correctly replaced and the cache will be updated.

## References

1. [Usage Guide - Radxa Docs](https://docs.radxa.com/en/zero/zero3/radxa-os/using-apt?mirror=HUST)
