---
sidebar_label: Registry
title: OCI Container Registry Mirror Usage Guide
---

## Mirror Introduction

This mirror site hosts selected OCI container images. You can pull them directly using Docker or other container clients. Use the full image references and tags listed below.

## Image List

Maintainers update this list manually. The following two images are currently available:

<!-- When adding or changing images, update this table and the pull commands below, and keep the Chinese documentation in sync. -->

| Image | Tag | Image reference |
| --- | --- | --- |
| Open Source Dashboard frontend | `latest` | `mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/frontend:latest` |
| Open Source Dashboard backend | `latest` | `mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/backend:latest` |

The `latest` tag is mutable, so image contents may change when the mirror is updated.

## Usage

Pull the images directly with the following commands:

```shell varcode
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/frontend:latest
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/backend:latest
```
