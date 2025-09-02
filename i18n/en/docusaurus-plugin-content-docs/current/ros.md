---
title: ROS Image Usage Guide 
sidebar_label: ROS
---

## ROS Profile

ROS (Robot Operating System), is a computer operating system architecture specifically designed for the robot software development. It is hosted on [http://packages.ros.org/ros](http://packages.ros.org/ros)

## ROS Software Source Replacement

1. Install dependencies

```shell varcode
[ ] (root) Are you the root user? 
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install -y gnupg
```

2. Import key

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}gpg --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
${SUDO}gpg --export C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 | ${SUDO}tee /usr/share/keyrings/ros.gpg > /dev/null
```

3. Add the software source to the system

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}tee /etc/apt/sources.list.d/ros-latest.list > /dev/null << EOF
deb [signed-by=/usr/share/keyrings/ros.gpg] ${_http}://${_domain}/ros/ubuntu $(lsb_release -sc) main
EOF
```

4. Refresh the software source cache

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update -y
```

5. Install the required ROS distribution

## Quote 

1. [USTC Mirror Source Usage Guide](https://mirrors.ustc.edu.cn/help/ros.html)