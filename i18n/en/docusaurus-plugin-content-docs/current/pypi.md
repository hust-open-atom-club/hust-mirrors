---
sidebar_label: PyPI
title: How to use Python Package Index
---

## Introduction to PyPI

PyPI (The Python Package Index),code-hosted at [https://pypi.org/](https://pypi.org/),is the official third-party software repository for the Python programming language.

## Switching pip Package Mirror

:::caution
The pip tool only supports https by default, please do not use http.
:::

:::info About externally-managed-environment Error
Python 3.11 had implemented PEP 668, which is a significant proposal enhancing the Python packages to specify whether they can be installed in the global interpreter context by default.
Encountering such kind of issue,you could try creating a virtual environment using venv, or use other virtual-environment-based package managers.
:::

### Temporary Usage

```bash varcode
pip install -i https://${_domain}/pypi/web/simple <some-package>
```

### Set as Default

```bash varcode
pip config set global.index-url https://${_domain}/pypi/web/simple
```

:::caution
Please upgrade pip to version 10 or above before configuring.
:::

If the pip version is low, you can use the following command to upgrade pip
```bash varcode
python -m pip install -i https://${_domain}/pypi/web/simple --upgrade pip
```

## Switching PDM Package Mirror

PDM supports setting the package mirror using the `pdm config` command or environment variables. For long-term use, it is recommended to configure it through `pdm config`.

Set the package mirror using the `pdm config` command:
```bash varcode
pdm config pypi.url https://${_domain}/pypi/web/simple
```

Or set the PDM package mirror using environment variables:
```bash varcode
export PDM_PYPI_URL=https://${_domain}/pypi/web/simple
```

## Switching Poetry Package Mirror

:::caution
Poetry does not support configuring a global mirror, only project-specific configuration.
:::

Poetry supports setting the current project's package mirror using the `poetry source` command or by modifying `pyproject.toml`.

Set the package mirror using the `poetry source` command:
```bash varcode
poetry source add --priority=primary mirrors https://${_domain}/pypi/web/simple
```

Or modify `pyproject.toml` to set the package mirror, add the following content to the `pyproject.toml` file:
```toml varcode
[[tool.poetry.source]]
name = "mirrors"
url = "https://${_domain}/pypi/web/simple"
priority = "primary"
```

## Switching pipx Package Mirror

pipx uses the same mirror as pip by default, so the method of setting the package mirror is the same as pip.

## Switching Back to Default Mirror

If you want to use the official default mirror, change the mirror address in the above commands to `https://pypi.org/simple` and configure it in the same way.
