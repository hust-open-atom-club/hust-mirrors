import React from 'react'
import styles from './index.module.css'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { DomainMeta } from '@site/meta.config'
import { useDomainMetas } from '@site/src/utils/mirrorUtils'

import DomainIcon from '@site/static/icons/domain.svg'
import ContactIcon from '@site/static/icons/contact.svg'
import HelpIcon from '@site/static/icons/help.svg'
import ImageIcon from '@site/static/icons/image.svg'
import LinkIcon from '@site/static/icons/link.svg'

interface Props extends React.HTMLProps<HTMLDivElement> { }


function Domains({ domains }: { domains: DomainMeta[] }) {
  return <>
    {domains.map(u => <p key={u.domain} className={styles['domain-row']}><a href={u.link}>
      {u.domain}
    </a> {u.desc} </p>
    )}
  </>
}

export default function SideBar(props: Props) {
  const domains = useDomainMetas();
  return (
    <div {...props}>
      <div className={styles.side}>
        <a><h3><DomainIcon /><Translate id='mirror.sidebar.chooseDomain'>域名选择</Translate></h3></a>
        <Domains domains={domains}></Domains>

        <a><h3><ImageIcon /><Translate id='mirror.sidebar.release'>发行版下载</Translate></h3></a>
        <p>
          <Translate id='mirror.sidebar.releaseDesc'>
            这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，
            请根据您的发行版及其详细版本进行选择：
          </Translate>
        </p>
        <Link to='/release'>
          <button className={styles.button}>
            <Translate id='mirror.sidebar.goRelease'>
              发行版下载
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
          <button className={styles.button}>
            <Translate id='mirror.sidebar.docs'>
              查看帮助文档
            </Translate>
          </button>
        </Link>
        <p>
          <Translate id="mirror.sidebar.docsDesc">
            也可以通过左边的文件列表中相应源的帮助链接跳转到帮助文档。
          </Translate>
        </p>

        <a><h3><ContactIcon /><Translate id="mirror.sidebar.contactus">联系我们</Translate></h3></a>
        <p>
          <a href="https://gitee.com/dzm91_hust/hust-mirrors/issues"><Translate id='mirror.sidebar.submit'>提交问题</Translate></a>
        </p>
        <p>
          <a href='mailto:mirror_support@hust.edu.cn'><Translate id='mirror.sidebar.sendemail'>发送邮件</Translate></a>
        </p>

        <a><h3><LinkIcon /><Translate id="mirror.sidebar.links">友情链接</Translate></h3></a>
        <p>
          <Link to='/syncing-status'><Translate id="mirror.sidebar.status">系统状态</Translate></Link>
        </p>
        <p>
          <a href='https://mirrors.cernet.edu.cn/list'><Translate id="mirror.sidebar.mirrorz">教育网联合镜像站</Translate></a>
        </p>
      </div>
    </div >
  )
}
