---
sidebar_label: Registry
title: OCI Container Registry Mirror Usage Guide
---

## Mirror Introduction

This mirror site hosts selected OCI container images. You can pull them directly using Docker or other container clients. Use the full image references and tags listed below.

## Image List

Maintainers update this list manually. The following images are currently available:

<!-- When adding or changing images, update this table and the pull commands below, and keep the Chinese documentation in sync. -->

| Image | Version | Tag | Upstream |
| --- | --- | --- |
| Open Source Dashboard Frontend | `latest` | `hust-open-atom-club/open-source-dashboard/frontend` | `ghcr.io/hust-open-atom-club/open-source-dashboard/frontend` |
| Open Source Dashboard Backend | `latest` | `hust-open-atom-club/open-source-dashboard/backend` | `ghcr.io/hust-open-atom-club/open-source-dashboard/backend` |
| Open Source Deadlines | `latest` | `hust-open-atom-club/open-source-deadlines` | `ghcr.io/hust-open-atom-club/open-source-deadlines` |
| HUST Mirrors Frontend | `latest` | `hust-open-atom-club/hust-mirrors` | `ghcr.io/hust-open-atom-club/hust-mirrors` |
| Robustone | `latest` | `hust-open-atom-club/robustone` | `ghcr.io/hust-open-atom-club/robustone` |
| Alpine | `latest` | `alpine` | `docker.io/library/alpine` |
| Alpine | `3.24` | `alpine` | `docker.io/library/alpine` |
| Ubuntu | `latest` | `ubuntu` | `docker.io/library/ubuntu` |
| Ubuntu | `26.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Ubuntu | `24.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Ubuntu | `22.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Node.JS | `latest` | `node` | `docker.io/library/node` |
| Node.JS | `lts` | `node` | `docker.io/library/node` |
| Node.JS | `26-bookworm-slim` | `node` | `docker.io/library/node` |
| Node.JS | `24-bookworm-slim` | `node` | `docker.io/library/node` |
| Node.JS | `22-bookworm-slim` | `node` | `docker.io/library/node` |
| Bun | `latest` | `oven/bun` | `docker.io/oven/bun` |
| Bun | `slim` | `oven/bun` | `docker.io/oven/bun` |
| Golang | `latest` | `golang` | `docker.io/library/golang` |
| Rust | `latest` | `rust` | `docker.io/library/rust` |
| Rust | `slim` | `rust` | `docker.io/library/rust` |
| Python | `latest` | `python` | `docker.io/library/python` |
| Python | `slim` | `python` | `docker.io/library/python` |
| Python | `3.15-slim` | `python` | `docker.io/library/python` |
| Python | `3.14-slim` | `python` | `docker.io/library/python` |
| Python | `3.13-slim` | `python` | `docker.io/library/python` |
| PostgreSQL | `latest` | `postgres` | `docker.io/library/postgres` |
| PostgreSQL | `18` | `postgres` | `docker.io/library/postgres` |
| PostgreSQL | `17` | `postgres` | `docker.io/library/postgres` |
| MongoDB | `latest` | `mongo` | `docker.io/library/mongo` |
| MongoDB | `9` | `mongo` | `docker.io/library/mongo` |
| MongoDB | `8` | `mongo` | `docker.io/library/mongo` |
| Redis | `latest` | `redis` | `docker.io/library/redis` |
| Redis | `alpine` | `redis` | `docker.io/library/redis` |
| BusyBox | `latest` | `busybox` | `docker.io/library/busybox` |

:::warning Notice
The mirror site only provides guarantee for images with versions specified above, and cannot guarantee the hash-styled versions deduced from version tags at any moment. We recommend you to use the tags for image pulling.
:::

## Usage

Pull the images directly with the following commands:

```shell varcode
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/frontend:latest
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/backend:latest
```
