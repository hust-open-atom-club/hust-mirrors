import { translate } from "@docusaurus/Translate";

export type MirrorMeta = {
  id: string;
  type?: 'normal' | 'git';
  displayName?: string;
  description?: string;
  forceShown?: boolean;
  link?: string;
  helpID?: string;
  anchorID?: string;
  supportCli?: boolean;
  cliID?: string;
};

export type DomainMeta = {
  domain: string;
  desc: string;
  link: string;
}

export type ReleaseMeta = {
  release: string;
  version?: string;
  /**
   * associated mirror meta
   */
  mirrorID?: string;
  variant?: string;
  path?: string;
  /**
   * path won't take effect if link is 
   * not undefined.
   */
  link?: string;
  desc?: string;
  warn?: string;
}

const mirrors: MirrorMeta[] = [
  { id: 'linux.git', type: 'git', description: 'Linux 内核主线仓库', helpID: 'linux.git' },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核稳定分支仓库', helpID: 'linux-stable.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源开发分支仓库', helpID: 'linux-next.git' },
  { id: 'qemu.git', type: 'git', description: '处理器模拟器 QEMU 代码仓库' },
  { id: 'archlinux', type: 'normal', description: 'Arch Linux 软件仓库', helpID: 'archlinux', supportCli: true },
  { id: 'debian', type: 'normal', description: 'Debian GNU/Linux 软件仓库', helpID: 'debian', supportCli: true },
  { id: 'deepin', type: 'normal', description: 'Deepin 软件仓库', helpID: 'deepin', supportCli: true },
  { id: 'fdroid', type: 'normal', description: 'F-driod 软件仓库', helpID: 'F-Droid' },
  { id: 'fedora', description: 'Fedora 软件仓库', helpID: 'fedora' },
  { id: 'openeuler', type: 'normal', description: 'OpenEuler 软件仓库', helpID: 'openeuler', supportCli: true },
  { id: 'openkylin', type: 'normal', description: 'OpenKylin 软件仓库', helpID: 'openkylin', supportCli: true },
  { id: 'ubuntu', type: 'normal', description: 'Ubuntu 软件仓库', supportCli: true },
  { id: 'ubuntu-releases', description: 'Ubuntu 发行版镜像仓库', helpID: 'ubuntu', anchorID: 'cd' },
  { id: 'anolis', description: '阿里龙蜥软件仓库', supportCli: true },
  { id: 'AOSP', description: 'Android 源代码仓库' },
  { id: 'debian-cd', description: 'Debian GNU/Linux 最新版镜像仓库', helpID: 'debian', anchorID: 'cd' },
  { id: 'debian-nonfree', description: 'Debian GNU/Linux 非自由软件仓库' },
  { id: 'debian-security', description: 'Debian GNU/Linux 安全更新仓库', helpID: 'debian', anchorID: 'security' },
  { id: 'git-repo', type: 'git', description: 'Google开发的多git仓库管理工具git-repo代码仓库' },
  { id: 'kali', description: 'Kali Linux 软件仓库', supportCli: true },
  { id: 'kali-images', description: 'Kali Linux 镜像仓库', helpID: 'kali', anchorID: 'iso' },
  { id: 'manjaro', description: 'Manjaro 软件仓库', helpID: 'manjaro' },
  { id: 'raspbian', description: '为树莓派编译的Debian GNU/Linux软件仓库' },
  { id: 'raspbian-addons', description: 'Raspbian 非官方软件源' },
  { id: 'ohmyzsh.git', type: 'git', description: 'zsh配置管理框架 oh-my-zsh 代码仓库', supportCli: true, cliID: 'ohmyzsh' },
  { id: 'pypi', description: 'Python软件包仓库', supportCli: true },
  { id: 'buildroot', description: '嵌入式Linux系统制作工具' },
  { id: 'CPAN', description: 'Perl语言软件库' },
  { id: 'CTAN', description: 'TeX发行版和宏包' },
  { id: 'CRAN', description: 'R语言的可执行文件、源代码和说明文件' },
  { id: 'crates', description: '面向Rust语言的软件包仓库文件', supportCli: true },
  { id: 'crates.io-index', description: '面向Rust语言的软件包索引列表，支持git索引和稀疏索引', helpID: 'crates', supportCli: true, cliID: 'crates' },
  { id: 'deepin-cd', description: 'Deepin 镜像文件', helpID: 'deepin', anchorID: 'cd' },
  { id: 'gnu', description: 'GNU软件的源码包和文档仓库' },
  { id: 'golang', description: 'Go语言工具链' },
  { id: 'gentoo', description: 'Gentoo 的 Stage3 的镜像', helpID: 'gentoo' },
  { id: 'openkylin-cdimage', description: 'openKylin 镜像文件', helpID: 'openkylin', anchorID: 'iso' },
  { id: 'OpenBSD', description: 'OpenBSD 软件仓库', helpID: 'openbsd' },
  { id: 'rustup', description: 'Rust语言工具链', supportCli: true },
  { id: 'virtualbox', description: '开源的x86架构虚拟机安装文件' },
  { id: 'gcc.git', description: 'GNU编译工具代码仓库' },
  { id: 'ubuntukylin', description: 'Ubuntu Kylin 软件仓库' },
  { id: 'ubuntukylin-cdimage', description: 'Ubuntu Kylin 安装镜像', helpID: 'ubuntukylin', anchorID: 'image' },
  { id: 'linuxmint', description: 'Linux Mint 软件仓库' },
  { id: 'linuxmint-cd', description: 'Linux Mint 安装镜像', helpID: 'linuxmint', anchorID: 'cd' },
  { id: 'alpine', description: 'Alpine Linux 软件仓库', supportCli: true },
  { id: 'blackarch', description: 'BlackArch Linux 软件仓库', supportCli: true },
  { id: 'archlinuxcn', description: 'Arch Linux 中文社区软件仓库', supportCli: true },
  { id: 'rocky', description: 'Rocky Linux 软件源镜像仓库', helpID: 'rocky' },
  { id: 'ros', description: 'Robot Operating System' },
  { id: 'ros2', description: 'Robot Operating System 2' },
]


const domains: DomainMeta[] = [
  {
    domain: 'mirrors.hust.edu.cn', desc: translate({
      id: 'mirror.domain.2',
      message: '双栈线路'
    }),
    link: 'https://mirrors.hust.edu.cn'
  },
]

export default {
  mirrors,
  domains,
}
