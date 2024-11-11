---
title: ROS2 镜像使用帮助
sidebar_label: ROS2
---

## ROS2 介绍

ROS2（Robot Operating System 2）是 ROS（机器人操作系统，Robot Operating System）的下一代版本，它是一个用于机器人开发的开源平台，提供了一系列工具和库，用于构建机器人应用程序。其托管在 [http://packages.ros.org/ros2](http://packages.ros.org/ros2) 上。

## ROS2 软件源替换

1. 安装依赖

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install -y curl gnupg2 ca-certificates
```

2. 导入 key：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

3. 将软件源添加至系统：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}tee /etc/apt/sources.list.d/ros2.list > /dev/null << EOF
deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] ${_http}://${_domain}/ros2/ubuntu $(lsb_release -sc) main
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

1. [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ros2.html)
