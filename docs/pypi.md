---
sidebar_label: pypi
title: Python 软件包索引仓库使用帮助
---

## pip包管理工具使用方法

:::caution
pip工具默认配置下仅支持https, 请不要使用http。
:::

:::info 关于externally-managed-environment 错误
新版的python 3.11实现了PEP 668, 不允许使用pip安装包。

如果遇到该问题，可以尝试使用venv创建虚拟环境，或者使用pipx管理
软件包。
:::

### 临时使用

```bash varcode
pip install -i https://${_domain}/pypi/web/simple <some-package>
```

### 设为默认

```bash varcode
pip config set global.index-url https://${_domain}/pypi/web/simple
```

:::caution
请升级pip到10以上版本后进行配置。
:::


如果pip版本较低，可以使用下面的命令升级pip
```bash varcode
python -m pip install -i https://${_domain}/pypi/web/simple --upgrade pip
```


