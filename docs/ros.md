---
title: ROS 镜像使用帮助
sidebar_label: ROS
---

## ROS 介绍

ROS (机器人操作系统，Robot Operating System)，是专为机器人软件开发所设计出来的一套电脑操作系统架构。其托管在 [http://packages.ros.org/ros](http://packages.ros.org/ros) 上。

## ROS 软件源替换

1. 安装依赖：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install -y gnupg
```

2. 导入 key：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}gpg --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
${SUDO}gpg --export C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 | ${SUDO}tee /usr/share/keyrings/ros.gpg > /dev/null
```

3. 将软件源添加至系统：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}tee /etc/apt/sources.list.d/ros-latest.list > /dev/null << EOF
deb [signed-by=/usr/share/keyrings/ros.gpg] ${_http}://${_domain}/ros/ubuntu $(lsb_release -sc) main
EOF
```

3. 刷新软件源缓存：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update -y
```

4. 安装所需的 ROS 发行版。

## 引用

1. [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ros.html)
