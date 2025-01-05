---
title: 集成 MirrorZ 文档
authors: chengzi
---

目前，我们镜像站目前缺失一些文档，除此以外，后期随着我们同步的镜像源增多、
镜像源不断更新，我们需要花费大量的时间来维护文档。
我们希望将我们站点一些不热门的镜像源集成 MirrorZ 的文档，以便更好地为用户提供服务。

集成以后，我们希望使用 MirrorZ 更多、更新更频繁的文档来帮助用户更好地使用我们的镜像站。

<!-- truncate -->

## 集成方法

根据 MirrorZ 的 [Readme](https://github.com/mirrorz-org/mirrorz-help)，我们可以使用下面几种方式集成 MirrorZ 的文档：

- link in the mirror frontend e.g., ISCAS, SJTUG and SDU
- link in the mirror help e.g., NWAFU
- Fork/Rebase and Transpile mdx to local markdown e.g., TUNA/BFSU
- Self-host e.g., xtom.help
- Reverse proxy e.g., NJU

我们考虑到了以下几点：
1. 我们希望用户在浏览我们的镜像站时，可以直接访问到 MirrorZ 的文档，而不需要跳转到其他站点。
2. 我们希望用户在阅读 MirrorZ 的文档时，可以获得和我们维护的文档相似的体验。
3. 我们希望对 MirrorZ 的文档进行一些定制化的修改，比如修改超链接的地址，以适应我们的站点。

综合以上需求，我们决定使用第三种方式集成 MirrorZ 的文档。

## 方案

我们编写的脚本将使用以下步骤来集成 MirrorZ 的文档：

1. 下载 MirrorZ 的文档
2. 将 MirrorZ 的文档转换为我们站点的格式
3. 替换超链接的地址
4. 替换 markdown 前言部分的元数据
5. 增加来源提示，以及原文链接

除此以外，我们还需要编写更新脚本辅助后期和上游文档的同步。

## 实现

我们实现了两个脚本，一个用于下载并生成 MirrorZ 的文档，一个用于更新 MirrorZ 的文档。  
具体实现可以参考站点目录的 `scripts` 目录。使用方法可以参考 Readme。

后期我们会考虑使用类似于 Github Actions 的工具来自动化更新过程，让文档定期更新，保持和上游的同步。
