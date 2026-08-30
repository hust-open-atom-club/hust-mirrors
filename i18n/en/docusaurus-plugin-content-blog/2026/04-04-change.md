---
title: Mirror Changes Notice - 2026.04.04
authors: yeying-xingchen
---

To better meet user needs and optimize resource allocation, we have adjusted the synchronization policies of the mirror site as follows:

1. Removed Mirrors:
   - Removed synchronization for `gentoo-portage`
   - Removed synchronization for `libnvidia-container.git`

2. Upstream Changes:
   - Changed upstream for `anthon`
   - Changed upstream for `docker-ce`

3. Sync Method Changes:
   - Changed the synchronization method for `golang`. After the fix, Golang can sync the latest versions properly.

We will continue to monitor the stability of our mirror services to provide a better user experience. Thank you for your continued support and understanding.