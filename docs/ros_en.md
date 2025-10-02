---
title: ROS Mirror Usage Guide
sidebar_label: ROS
---

## About ROS

ROS (Robot Operating System) is a computer operating system architecture specifically designed for robotics software development. It is hosted at [http://packages.ros.org/ros](http://packages.ros.org/ros).

## ROS Software Source Replacement

1. Install dependencies:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install -y gnupg
```

2. Import the key:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}gpg --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
${SUDO}gpg --export C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 | ${SUDO}tee /usr/share/keyrings/ros.gpg > /dev/null
```

3. Add the software source to the system:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}tee /etc/apt/sources.list.d/ros-latest.list > /dev/null << EOF
deb [signed-by=/usr/share/keyrings/ros.gpg] ${_http}://${_domain}/ros/ubuntu $(lsb_release -sc) main
EOF
```

4. Refresh the software source cache:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update -y
```

5. Install the desired ROS distribution.

## References

1. [USTC Mirror Source Usage Guide](https://mirrors.ustc.edu.cn/help/ros.html)