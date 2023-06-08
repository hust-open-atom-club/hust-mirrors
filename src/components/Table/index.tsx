import React from 'react'
import styles from './index.module.css'
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate'
import { DocMeta, MirrorMeta, useDocMetas, useMirrorMetas } from '@site/src/utils/mirrorUtils';

type MirrorStatus = {
  name: string,
  is_master: string,
  status: string,
  last_update: string,
  last_update_ts: number,
  last_started: string,
  last_started_ts: number,
  last_ended: string,
  last_ended_ts: number,
  next_schedule: string,
  next_schedule_ts: number,
  upstream: string,
  size: string,
}

type Props = {
  items: MirrorStatus[],
  search?: string
}

function tsToStr(ts: number) {
  const date = new Date(ts * 1000);
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}



type MirrorNameProps = {
  item: MirrorStatus,
  docsMeta: DocMeta[],
  mirrorMeta: MirrorMeta[]
}

function MirrorName({ item, docsMeta: docs, mirrorMeta: mirrors }: MirrorNameProps) {

  const m = mirrors.find(u => u.id == item.name);

  const isGit = m ? m.type == 'git' : item.name.endsWith(".git");
  const link = m ? m.link : (
    isGit ? "#" : `/${item.name}`
  );

  const dname = (m && m.displayName) ? m.displayName : item.name;

  let desc = <div>
    {m && m.description &&
      <p>{m.description}</p>}

    {isGit &&
      <p className={styles['git-desc']}> <Translate>该仓库为Git仓库，点击链接复制clone url。</Translate></p>
    }
  </div>;

  const descShown = (!!m && !!m.description) || isGit;

  return (
    <span className={styles['mirror-name']}>
      <a onClick={e => { if (!!link) e.stopPropagation(); }} href={link}>
        {dname}
      </a>
      {descShown &&
        <div className={styles['desc-container']}>
          {desc}
        </div>}
    </span>
  )
}

export default function Table({ items: srcItems, search }: Props) {

  const alldocs = useDocMetas();
  const mirrorMeta = useMirrorMetas();

  let items = srcItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
  if (search) {
    items = items.filter(u => u.name.toLowerCase().indexOf(search.toLowerCase()) != -1)
  }

  const timezone = new Date().getTimezoneOffset() / -60;

  return (
    <table className={styles['container']}>
      <thead>
        <tr>
          <th className={styles['name']}>
            <Translate>镜像名称</Translate>
          </th>
          <th className={styles['last-update']}>
            <Translate>上次更新</Translate> (UTC{timezone > 0 && '+'}{timezone})
          </th>
          <th className={styles['help']}>
            <Translate>帮助</Translate>
          </th>
        </tr>

      </thead>
      <tbody className={styles.tbody}>
        {items.map(u => (
          <tr key={u.name}>
            <th className={styles['name']}>
              <MirrorName item={u} docsMeta={alldocs} mirrorMeta={mirrorMeta} />
            </th>
            <th className={styles['last-update']}>{tsToStr(u.last_update_ts)}</th>
            <th className={styles['help']}>
              {alldocs.find(v => v.id == u.name) &&
                <Link to={`/docs/${u.name}`}>
                  [ <Translate>帮助文档</Translate> ]
                </Link>
              }
              {
                u.name.endsWith(".git") &&
                <Link to={`/docs/about-git`}>
                  [ <Translate>Git 镜像</Translate> ]
                </Link>
              }
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
