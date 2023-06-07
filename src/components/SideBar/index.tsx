import React from 'react'
import styles from './index.module.css'

interface Props extends React.HTMLProps<HTMLDivElement> { }

type DomainMeta = {
  url: string,
  link: string,
  desc: string
}

const domains: DomainMeta[] = [
  { url: 'mirrors.hust.edu.cn', link: 'https://mirrors.hust.edu.cn', desc: '双栈线路' },
  { url: 'hustmirror.cn', link: 'https://hustmirror.cn', desc: 'IPv6线路' },
]


function Domains({ domains }: { domains: DomainMeta[] }) {
  return <>
    {domains.map(u => <p key={u.url} className={styles['domain-row']}><a href={u.link}>
      {u.url}
    </a> {u.desc} </p>
    )}
  </>
}

export default function SideBar(props: Props) {
  return (
    <div {...props}>
      <div className={styles.side}>
        <a><h3>域名选择</h3></a>
        <Domains domains={domains}></Domains>

        <a><h3>镜像站帮助</h3></a>
        如果你不了解如何配置替换软件镜像源，
        这里提供了主流软件源的配置帮助：<br />
        <a href='/docs'>
          <button className={styles.button}>查看文档</button>
        </a>
        <p>
          也可以通过左边的文件列表中相应源的帮助链接跳转到帮助文档。
        </p>

        <a><h3>常用链接</h3></a>
        <p>
          <a href='mailto:dzm91@hust.edu.cn'>联系我们：dzm91@hust.edu.cn</a>
        </p>
        <p>
          <a href='https://mirrors.cernet.edu.cn/list'>教育网联合镜像站</a>
        </p>
      </div>
    </div >
  )
}
