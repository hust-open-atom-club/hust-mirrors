---
title: ROS2 Mirror Usage Guide
sidebar_label: ROS2
---

## About ROS2

ROS2 (Robot Operating System 2) is the next-generation version of ROS, providing an open-source platform for robotics development with a collection of tools and libraries for building robotic applications. It is hosted at [http://packages.ros.org/ros2](http://packages.ros.org/ros2).

## ROS2 Software Source Replacement

1. Install dependencies:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install -y curl gnupg2 ca-certificates
```

2. Import the key:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

3. Add the software source to the system:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}tee /etc/apt/sources.list.d/ros2.list > /dev/null << EOF
deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] ${_http}://${_domain}/ros2/ubuntu $(lsb_release -sc) main
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

1. [USTC Mirror Source Usage Guide](https://mirrors.ustc.edu.cn/help/ros2.html)