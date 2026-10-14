---
title: New Mirror Type — OCI Container Images
authors: paulkm
---

Dear mirror users,

Starting October 14, 2026, the HUST Open Source Mirror Site provides a Registry service for selected OCI container images. You can pull mirrored images directly from `mirrors.hust.edu.cn` using Docker or other container clients.

The homepage now includes a `registry` entry that links to the [usage guide and image list](/docs/registry).

<!-- truncate -->

## Available Images

The service currently mirrors selected images and tags from the following projects:

- Club projects: Open Source Dashboard frontend and backend, Open Source Deadlines, and HUST Mirrors frontend.
- Linux base images: Alpine, Ubuntu, and BusyBox.
- Development environments: Node.js, Bun, Go, Rust, and Python.
- Databases: PostgreSQL and MongoDB.

See the [Registry documentation](/docs/registry) for image names, tags, and upstream references. Maintainers update the image list manually and record additions and changes there.

## Usage

Use an image name and tag listed in the documentation, replacing its registry address with `mirrors.hust.edu.cn`. For example:

```bash
docker pull mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/frontend:latest
docker pull mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/backend:latest
docker pull mirrors.hust.edu.cn/ubuntu:24.04
```

:::warning Mirror Scope

The OCI image mirror service is currently in testing and may be unstable.

The service only mirrors the images and tags listed in the documentation. Other images or tags may be unavailable. The mirror also does not guarantee that every digest resolved from a tag at any given time has been synchronized. We recommend using the documented tags when pulling images for development and builds.

:::

Feedback is welcome. If an image you need is missing, submit a request through the new mirror request entry on the homepage. We will evaluate it based on demand and available server resources.
