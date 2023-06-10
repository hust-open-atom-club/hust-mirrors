import { translate } from "@docusaurus/Translate";

export type MirrorMeta = {
  id: string;
  type?: 'normal' | 'git';
  displayName?: string;
  description?: string;
  forceShown?: boolean;
  link?: string;
  helpID?: string;
  supportCli?: boolean;
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
  { id: 'linux.git', type: 'git', description: 'Linux 内核主线仓库', helpID: 'linux.git', supportCli: true },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核稳定分支仓库', helpID: 'linux.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源开发分支仓库', helpID: 'linux-next.git' },
  { id: 'qemu.git', type: 'git', description: '处理器模拟器 QEMU 代码仓库' },
  { id: 'archlinux', type: 'normal', description: 'Arch Linux 软件仓库', helpID: 'archlinux', supportCli: true },
  { id: 'debian', type: 'normal', description: 'Debian GNU/Linux 软件仓库', helpID: 'debian', supportCli: true },
  { id: 'deepin', type: 'normal', description: 'Deepin 软件仓库', helpID: 'deepin' },
  { id: 'openeuler', type: 'normal', description: 'OpenEuler 软件仓库', helpID: 'openeuler' },
  { id: 'openkylin', type: 'normal', description: 'OpenKylin 软件仓库', helpID: 'openkylin' },
  { id: 'ubuntu', type: 'normal', description: 'Ubuntu 软件仓库', helpID: 'ubuntu', supportCli: true },
]


const domains: DomainMeta[] = [
  {
    domain: 'hustmirror.cn', desc: translate({
      id: 'mirror.domain.1',
      message: '双栈线路'
    }),
    link: 'https://hustmirror.cn'
  },
  /*
  {
    domain: 'mirrors.hust.edu.cn', desc: translate({
      id: 'mirror.domain.2',
      message: 'IPV4线路'
    }),
    link: 'https://mirrors.hust.edu.cn'
  },
 */
]

const releases: ReleaseMeta[] = [
  { release: 'Arch Linux', version: 'Latest', path: '/archlinux/iso/latest/archlinux-x86_64.iso' },
  { release: 'Arch Linux', version: '2023.06.01', path: '/archlinux/iso/2023.06.01/archlinux-x86_64.iso' },
  { release: 'Arch Linux', version: '2023.05.03', path: '/archlinux/iso/2023.05.03/archlinux-x86_64.iso' },
  { release: 'Arch Linux', version: '2023.04.01', path: '/archlinux/iso/2023.04.01/archlinux-x86_64.iso' },
  // { release: 'Ubuntu', version: '22.04 LTS', variant: 'amd64, desktop', path: '/ubuntu-releases/jammy/ubuntu-22.04.2-desktop-amd64.iso' },
  // { release: 'Ubuntu', version: '22.04 LTS', variant: 'amd64, server', path: '/ubuntu-releases/jammy/ubuntu-22.04.2-desktop-amd64.iso' },
];

export default {
  mirrors,
  domains,
  releases
}
