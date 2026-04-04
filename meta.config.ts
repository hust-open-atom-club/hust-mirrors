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
  { id: 'alpine', type: 'normal', description: 'Alpine Linux 软件仓库', supportCli: true },
  { id: 'anthon', type: 'normal', description: '安同 OS 软件与镜像仓库', helpID: 'anthon' },
  { id: 'archlinux', type: 'normal', description: 'Arch Linux 软件仓库', helpID: 'archlinux', supportCli: true },
  { id: 'archlinuxcn', type: 'normal', description: 'Arch Linux 中文社区软件仓库', supportCli: true },
  { id: 'blackarch', type: 'normal', description: 'BlackArch Linux 软件仓库', supportCli: true },
  { id: 'buildroot', type: 'normal', description: '嵌入式Linux系统制作工具' },
  { id: 'CPAN', type: 'normal', description: 'Perl语言软件库' },
  { id: 'CRAN', type: 'normal', description: 'R语言的可执行文件、源代码和说明文件' },
  { id: 'crates', type: 'normal', description: '面向Rust语言的软件包仓库文件', supportCli: true },
  { id: 'crates.io-index', type: 'normal', description: '面向Rust语言的软件包索引列表，支持git索引和稀疏索引', helpID: 'crates', supportCli: true, cliID: 'crates' },
  { id: 'CTAN', type: 'normal', description: 'TeX发行版和宏包' },
  { id: 'debian', type: 'normal', description: 'Debian GNU/Linux 软件仓库', helpID: 'debian', supportCli: true },
  { id: 'debian-cd', type: 'normal', description: 'Debian GNU/Linux 最新版镜像仓库', helpID: 'debian', anchorID: 'cd' },
  { id: 'debian-security', type: 'normal', description: 'Debian GNU/Linux 安全更新仓库', helpID: 'debian', anchorID: 'security' },
  { id: 'deepin', type: 'normal', description: 'Deepin 软件仓库', helpID: 'deepin', supportCli: true },
  { id: 'deepin-cd', type: 'normal', description: 'Deepin 镜像文件', helpID: 'deepin', anchorID: 'cd' },
  { id: 'docker-ce', type: 'normal', description: 'Docker CE 软件仓库', helpID: 'docker-ce' },
  { id: 'fdroid', type: 'normal', description: 'F-driod 软件仓库', helpID: 'F-Droid' },
  { id: 'fedora', type: 'normal', description: 'Fedora 软件仓库', helpID: 'fedora' },
  { id: 'gentoo', type: 'normal', description: 'Gentoo 的 Stage3 的镜像', helpID: 'gentoo' },
  { id: 'gentoo-portage-prefix', type: 'normal', description: 'Gentoo Prefix macOS 镜像' },
  { id: 'git-repo', type: 'git', description: 'Google开发的多git仓库管理工具git-repo代码仓库' },
  { id: 'github-release', type: 'normal', description: '部分知名软件发行版镜像', helpID: 'github-release' },
  { id: 'gnu', type: 'normal', description: 'GNU软件的源码包和文档仓库' },
  { id: 'golang', type: 'normal', description: 'Go语言工具链' },
  { id: 'kali', type: 'normal', description: 'Kali Linux 软件仓库', supportCli: true },
  { id: 'kali-images', type: 'normal', description: 'Kali Linux 镜像仓库', helpID: 'kali', anchorID: 'iso' },
  { id: 'kernel.org', type: 'normal', description: 'Linux 内核主站', helpID: 'kernel.org' },
  { id: 'linuxmint', type: 'normal', description: 'Linux Mint 软件仓库' },
  { id: 'linuxmint-cd', type: 'normal', description: 'Linux Mint 安装镜像', helpID: 'linuxmint', anchorID: 'cd' },
  { id: 'llvm-apt', type: 'normal', description: 'LLVM 工具链 apt 仓库镜像', helpID: 'llvm-apt' },
  { id: 'manjaro', type: 'normal', description: 'Manjaro 软件仓库', helpID: 'manjaro' },
  { id: 'mozilla', type: 'normal', description: 'Mozilla apt 软件仓库', helpID: 'mozilla' },
  { id: 'msys2', type: 'normal', description: 'MSYS2 软件仓库', helpID: 'msys2' },
  { id: 'mxlinux', type: 'normal', description: 'MXLinux 软件仓库', helpID: 'mxlinux' },
  { id: 'mxlinux-isos', type: 'normal', description: 'MXLinux 镜像仓库', helpID: 'mxlinux', anchorID: 'cd' },
  { id: 'OpenBSD', type: 'normal', description: 'OpenBSD 软件仓库', helpID: 'openbsd' },
  { id: 'openeuler', type: 'normal', description: 'OpenEuler 软件仓库', helpID: 'openeuler', supportCli: true },
  { id: 'openkylin', type: 'normal', description: 'OpenKylin 软件仓库', helpID: 'openkylin', supportCli: true },
  { id: 'openkylin-cdimage', type: 'normal', description: 'openKylin 镜像文件', helpID: 'openkylin', anchorID: 'iso' },
  { id: 'pypi', type: 'normal', description: 'Python软件包仓库', supportCli: true },
  { id: 'radxa-deb', type: 'normal', description: 'RadxaOS Deb软件源镜像仓库', helpID: 'radxa-deb' },
  { id: 'rocky', type: 'normal', description: 'Rocky Linux 软件源镜像仓库', helpID: 'rocky' },
  { id: 'ros', type: 'normal', description: 'Robot Operating System' },
  { id: 'ros2', type: 'normal', description: 'Robot Operating System 2' },
  { id: 'rustup', type: 'normal', description: 'Rust语言工具链', supportCli: true },
  { id: 'termux', type: 'normal', description: 'Termux 软件仓库镜像', helpID: 'termux', supportCli: true },
  { id: 'ubuntu', type: 'normal', description: 'Ubuntu 软件仓库', helpID: 'ubuntu', supportCli: true },
  { id: 'ubuntu-ports', type: 'normal', description: 'Ubuntu 非 x86 架构软件仓库', helpID: 'ubuntu', supportCli: true },
  { id: 'ubuntu-releases', type: 'normal', description: 'Ubuntu 发行版镜像仓库', helpID: 'ubuntu', anchorID: 'cd' },
  { id: 'ubuntukylin', type: 'normal', description: 'Ubuntu Kylin 软件仓库' },
  { id: 'virtualbox', type: 'normal', description: '开源的x86架构虚拟机安装文件' },
  // Git仓库与非Git仓库分开排序
  { id: 'gcc.git', type: 'normal', description: 'GNU编译工具代码仓库' },
  { id: 'gentoo-portage.git', description: 'Gentoo Portage Ebuild 源（Git 方式同步）', helpID: 'gentoo-portage' },
  { id: 'linux.git', type: 'git', description: 'Linux 内核主线仓库', helpID: 'linux.git' },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核稳定分支仓库', helpID: 'linux-stable.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源开发分支仓库', helpID: 'linux-next.git' },
  { id: 'ohmyzsh.git', type: 'git', description: 'zsh配置管理框架 oh-my-zsh 代码仓库', supportCli: true, cliID: 'ohmyzsh' },
  { id: 'qemu.git', type: 'git', description: '处理器模拟器 QEMU 代码仓库' }
]


const domains: DomainMeta[] = [
  {
    domain: 'mirrors.hust.edu.cn', desc: translate({
      id: 'mirror.domain.2',
      message: '双栈线路'
    }),
    link: 'https://mirrors.hust.edu.cn'
  },
  {
    domain: 'mirrors4.hust.edu.cn', desc: translate({
      id: 'mirror.domain.3',
      message: 'IPv4单栈线路'
    }),
    link: 'https://mirrors4.hust.edu.cn'
  },
  {
    domain: 'mirrors6.hust.edu.cn', desc: translate({
      id: 'mirror.domain.4',
      message: 'IPv6单栈线路'
    }),
    link: 'https://mirrors6.hust.edu.cn'
  },
]

export default {
  mirrors,
  domains,
}
