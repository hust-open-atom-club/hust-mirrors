
/** @type{{
 * id: string; 
 * type?: 'normal' | 'git';
 * description?: string;
 * displayName?: string;
 * forceShown?: boolean;
 * link?: string;
 * helpID?: string;
 * }}[] */
const mirrors = [
  { id: 'linux.git', type: 'git', description: 'Linux 内核主线仓库', helpID: 'linux.git' },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核稳定分支仓库', helpID: 'linux.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源开发分支仓库', helpID: 'linux-next.git' },
  { id: 'qemu.git', type: 'git', description: 'QEMU 主线仓库', helpID: 'qemu.git' },
]


const config = {
  title: "华中科技大学开源镜像站",
  desc: "欢迎来到华中科技大学开源镜像站，该站点由华中科技大学为你呈现。",
  url: "https://hustmirror.cn"
}

module.exports = {
  config,
  mirrors
};
