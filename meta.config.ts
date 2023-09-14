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
  { id: 'linux.git', type: 'git', description: 'Linux 内核主线仓库', helpID: 'linux.git' },
  { id: 'linux-stable.git', type: 'git', description: 'Linux 内核稳定分支仓库', helpID: 'linux.git' },
  { id: 'linux-next.git', type: 'git', description: 'Linux 内核源开发分支仓库', helpID: 'linux-next.git' },
  { id: 'qemu.git', type: 'git', description: '处理器模拟器 QEMU 代码仓库' },
  { id: 'archlinux', type: 'normal', description: 'Arch Linux 软件仓库', helpID: 'archlinux', supportCli: true },
  { id: 'debian', type: 'normal', description: 'Debian GNU/Linux 软件仓库', helpID: 'debian', supportCli: true },
  { id: 'deepin', type: 'normal', description: 'Deepin 软件仓库', helpID: 'deepin', supportCli: true },
  { id: 'openeuler', type: 'normal', description: 'OpenEuler 软件仓库', helpID: 'openeuler', supportCli: true },
  { id: 'openkylin', type: 'normal', description: 'OpenKylin 软件仓库', helpID: 'openkylin', supportCli: true },
  { id: 'ubuntu', type: 'normal', description: 'Ubuntu 软件仓库', helpID: 'ubuntu', supportCli: true },
]


const domains: DomainMeta[] = [
  {
    domain: 'mirrors.hust.college', desc: translate({
      id: 'mirror.domain.2',
      message: '双栈线路'
    }),
    link: 'https://mirrors.hust.college'
  },
  {
    domain: 'hustmirror.cn', desc: translate({
      id: 'mirror.domain.1',
      message: '将弃用⚠️'
    }),
    link: 'https://hustmirror.cn'
  },
]

export default {
  mirrors,
  domains,
}
