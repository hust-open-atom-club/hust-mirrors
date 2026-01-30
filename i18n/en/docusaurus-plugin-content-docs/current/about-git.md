---
title: About git
---

In this software mirror site, repositories ending with `.git` are `Git` repository mirrors. Clicking on the corresponding link on the mirror site's homepage will allow you to copy the clone link.

Taking the Linux kernel mainline repository as an example, the usage is as shown in the following image:

Click the appropriate link to copy the clone link, and then use a Git client to clone the code.

<!-- ![Copy URL](./assets/git-linux.png)  -->

```bash varcode
git clone ${_http}://${_domain}/git/linux.git
```

## Important Notes

Differences between Git repository mirrors and regular software mirrors:

- When this URL is opened in a browser, it displays a non-repository page.
- You can only clone it using a Git client.
- The `git` protocol is not currently supported.
