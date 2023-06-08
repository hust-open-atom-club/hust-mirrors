
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
  { id: 'linux.git', type: 'git', description: 'Linux 内核源代码的Git仓库', helpID: 'linux.git' },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核源代码的Git仓库，稳定版分支', helpID: 'linux.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源代码的Git仓库，开发分支', helpID: 'linux-next.git' },
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
