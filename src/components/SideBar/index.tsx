import React from 'react'
import styles from './index.module.css'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { DomainMeta } from '@site/meta.config'
import { useDomainMetas } from '@site/src/utils/mirrorUtils'

import clsx from 'clsx'

import DomainIcon from '@site/static/icons/domain.svg'
import ContactIcon from '@site/static/icons/contact.svg'
import HelpIcon from '@site/static/icons/help.svg'
import ImageIcon from '@site/static/icons/image.svg'
import LinkIcon from '@site/static/icons/link.svg'
import IssueIcon from '@site/static/icons/issue.svg'
import MailIcon from '@site/static/icons/mail.svg'
import MirrorZIcon from '@site/static/icons/mirrorz.svg'
import SettingsIcon from '@site/static/icons/settings.svg'
import NewMirrorIcon from '@site/static/icons/newmirror.svg'
import GlobalOptions from '@site/src/components/DocGlobalOptions/index';

interface Props extends React.HTMLProps<HTMLDivElement> { }


function Domains({ domains }: { domains: DomainMeta[] }) {
  return <>
    {domains.map(u => <p key={u.domain} className={styles['domain-row']}><a href={u.link}>
      {u.domain}
    </a> {u.desc} </p>
    )}
  </>
}

function DomainChoose() {
  return <div className={clsx('dropdown', 'dropdown--hoverable', 'dropdown--left', styles['domain-choose'])}>
    <a><h3><DomainIcon /><Translate id='mirror.sidebar.chooseDomain'>域名选择</Translate></h3></a>
    <div className={clsx("dropdown__menu", styles['global-dropdown'])}>
      <GlobalOptions />
    </div>
  </div>;
}

export default function SideBar(props: Props) {
  const domains = useDomainMetas();
  return (
    <div {...props}>
      <div className={styles.side}>
        <DomainChoose />
        <Domains domains={domains}></Domains>

        <a><h3><ImageIcon /><Translate id='mirror.sidebar.release'>软件下载</Translate></h3></a>
        <p>
          <Translate id='mirror.sidebar.releaseDesc'>
            这里为您提供各大主流 Linux 发行版的安装镜像以及一些应用软件、开发工具的下载：
          </Translate>
        </p>
        <Link to='/release'>
          <button className={clsx("button", "button--primary", "button--lg", styles.button)}>
            <Translate id='mirror.sidebar.goRelease'>
              获取下载链接
            </Translate>
          </button>
        </Link>


        <a><h3><HelpIcon /><Translate id='mirror.sidebar.help'>镜像站帮助</Translate></h3></a>
        <p>
          <Translate id='mirror.sidebar.helpDesc'>
            如果你不了解如何配置替换软件镜像源，
            这里提供了主流软件源的配置帮助：
          </Translate>
        </p>
        <Link to='/docs'>
          <button className={clsx("button", "button--primary", "button--lg", styles.button)}>
            <Translate id='mirror.sidebar.docs'>
              查看帮助文档
            </Translate>
          </button>
        </Link>
        {/* <p>
          <Translate id="mirror.sidebar.docsDesc">
            也可以通过左边的文件列表中相应源的帮助链接跳转到帮助文档。
          </Translate>
        </p> */}

        <a><h3><ContactIcon /><Translate id="mirror.sidebar.contactus">联系我们</Translate></h3></a>
        <p>
          <a href="https://github.com/hust-open-atom-club/hust-mirrors/issues">
            <IssueIcon /><Translate id='mirror.sidebar.submit'>提交问题</Translate>
          </a>
        </p>
        <p>
          <a href='mailto:mirror_support@hust.edu.cn'>
            <span>
              <MailIcon /><Translate id='mirror.sidebar.sendemail'>发送邮件</Translate>
            </span>
          </a>
        </p>
        <p>
          <a href='https://github.com/hust-open-atom-club/mirrorrequest/issues/new/choose'>
            <span>
              <NewMirrorIcon /><Translate id='mirror.sidebar.newmirror'>新增镜像</Translate>
            </span>
          </a>
        </p>

        <a><h3><LinkIcon /><Translate id="mirror.sidebar.links">友情链接</Translate></h3></a>
        <p>
          <Link to='/syncing-status'><SettingsIcon /><Translate id="mirror.sidebar.status">系统状态</Translate></Link>
        </p>
        <p>
          <a href='https://mirrors.cernet.edu.cn/list'><MirrorZIcon /><Translate id="mirror.sidebar.mirrorz">教育网联合镜像站</Translate></a>
        </p>
      </div>
    </div >
  )
}
