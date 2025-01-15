---
title: Integration of MirrorZ Documentation
authors: chengzi
---

Currently, our mirror site is lacking some documentation. In addition, as we synchronize more mirror sources in the future and these mirror sources are constantly updated, we will have to spend a great deal of time maintaining the documentation.
We hope to integrate the documentation of some less popular mirror sources on our site with that of MirrorZ, so as to provide better services for our users.
After the integration, we expect to utilize the more frequently updated and newer documentation of MirrorZ to help users make better use of our mirror site.

<!-- truncate -->

## Integration Methods

According to the Readme of MirrorZ, we can integrate MirrorZ's documentation in the following ways:

- link in the mirror frontend e.g., ISCAS, SJTUG and SDU
- link in the mirror help e.g., NWAFU
- Fork/Rebase and Transpile mdx to local markdown e.g., TUNA/BFSU
- Self-host e.g., xtom.help
- Reverse proxy e.g., NJU

We have taken the following points into consideration:
1. We hope that when users browse our mirror site, they can directly access the documentation of MirrorZ without having to jump to other sites.
2. We hope that when users read the documentation of MirrorZ, they can have an experience similar to that of the documentation we maintain.
3. We hope to make some customized modifications to the documentation of MirrorZ, such as modifying the addresses of hyperlinks to adapt to our site.
Based on the above requirements, we have decided to integrate the documentation of MirrorZ using the third method

## Scheme

The script we write will follow these steps to integrate the documentation of MirrorZ:

1. Download the documentation of MirrorZ.
2. Convert the documentation of MirrorZ to the format of our site.
3. Replace the addresses of hyperlinks.
4. Replace the metadata in the front matter part of markdown.
5. Add a source tip and the original link.

In addition, we also need to write an update script to assist in the synchronization with the upstream documentation later.

## Implementation

We have implemented two scripts, one for downloading and generating the documentation of MirrorZ, and the other for updating the documentation of MirrorZ. The specific implementation can be referred to the scripts directory in the site directory. The usage can be referred to the Readme.
In the future, we will consider using tools similar to Github Actions to automate the update process, so that the documentation can be updated regularly and kept in sync with the upstream.
