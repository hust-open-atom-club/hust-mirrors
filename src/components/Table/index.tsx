import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate'
import { DocMeta, MirrorMeta, useDocMetas, useMirrorMetas } from '@site/src/utils/mirrorUtils';
import copy from 'copy-to-clipboard';

type MirrorStatus = {
  name: string,
  is_master: boolean,
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
  search?: string,
  detail?: boolean,
}

function tsToStr(ts: number) {
  if (ts == 0) return "";
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

function metaToStatus(v: MirrorMeta): MirrorStatus {
  return {
    name: v.id,
    is_master: true,
    status: "success",
    last_update: "",
    last_update_ts: 0,
    last_started: "",
    last_started_ts: 0,
    last_ended: "",
    last_ended_ts: 0,
    next_schedule: "",
    next_schedule_ts: 0,
    upstream: "N/A",
    size: "N/A"
  };
}

type MirrorNameProps = {
  item: MirrorStatus,
  docsMeta: DocMeta[],
  mirrorMeta: MirrorMeta[]
}

function MirrorName({ item, docsMeta: docs, mirrorMeta: mirrors }: MirrorNameProps) {

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const m = mirrors.find(u => u.id == item.name);

  const isGit = (m && m.type) ? m.type == 'git' : item.name.endsWith(".git");
  const link = (m && m.link) ? m.link : (
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

  const onLinkClick: React.MouseEventHandler = (e) => {
    if (isGit) {
      const gitUrl = "https://hustmirror.cn/git/" + item.name;
      copy(gitUrl);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      setCopied(true);
      timeoutRef.current = window.setTimeout(
        () => {
          setCopied(false);
        },
        3000
      );
      e.preventDefault();
    }
    e.stopPropagation();
  }

  return (
    <span className={styles['mirror-name']}>
      <a onClick={onLinkClick} href={link}>
        {dname}
      </a>
      {
        copied &&
        <span className={styles.copied}>
          <Translate>( 已复制 )</Translate>

        </span>
      }
      {descShown &&
        <div className={styles['desc-container']}>
          {desc}
        </div>}
    </span>
  )
}

type MirrorHelpProps = MirrorNameProps;

function MirrorHelp({ item, mirrorMeta: mirrors, docsMeta: docs }: MirrorHelpProps) {
  const m = mirrors.find(u => u.id == item.name);
  const isGit = (m && m.type) ? m.type == 'git' : item.name.endsWith(".git");
  const helpid = (m && m.helpID) ? m.helpID : item.name;

  return <>
    {docs.find(v => v.id == helpid) &&
      <Link to={`/docs/${item.name}`}>
        [ <Translate>帮助文档</Translate> ]
      </Link>
    }
    {
      isGit &&
      <Link to={`/docs/about-git`}>
        [ <Translate>Git 镜像</Translate> ]
      </Link>
    }
  </>
}

export default function Table({ items: srcItems, search, detail }: Props) {

  const alldocs = useDocMetas();
  const mirrorMeta = useMirrorMetas();

  let items = srcItems.concat( // combine force to shown meta data.
    mirrorMeta.filter(u => u.forceShown && srcItems.find(v => v.name == u.id) == undefined)
      .map(u => metaToStatus(u))
  ).sort((a, b) => (a.name > b.name) ? 1 : -1);

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
          <th className={styles['date']}>
            <Translate>上次更新</Translate> (UTC{timezone > 0 && '+'}{timezone})
          </th>
          {detail && <th className={styles['date']}>
            <Translate>上次开始</Translate> (UTC{timezone > 0 && '+'}{timezone})
          </th>}
          {detail && <th className={styles['date']}>
            <Translate>上次结束</Translate> (UTC{timezone > 0 && '+'}{timezone})
          </th>}
          {detail && <th className={styles['status']}>
            <Translate>同步状态</Translate>
          </th>}
          {detail && <th className={styles['upstream']}>
            <Translate>上游链接</Translate>
          </th>}
          {detail && <th className={styles['size']}>
            <Translate>镜像大小</Translate>
          </th>}
          {!detail && <th className={styles['help']}>
            <Translate>帮助</Translate>
          </th>}
        </tr>

      </thead>
      <tbody className={styles.tbody}>
        {items.map(u => (
          <tr key={u.name}>
            <th className={styles['name']}>
              <MirrorName item={u} docsMeta={alldocs} mirrorMeta={mirrorMeta} />
            </th>
            <th className={styles['date']}>{tsToStr(u.last_update_ts)}</th>
            {detail && <th className={styles['date']}>{tsToStr(u.last_started_ts)}</th>}
            {detail && <th className={styles['date']}>{tsToStr(u.last_ended_ts)}</th>}
            {detail && <th className={styles['status']}>{u.status}</th>}
            {detail && <th className={styles['upstream']}>{u.upstream}</th>}
            {detail && <th className={styles['size']}>{u.size}</th>}
            {!detail && <th className={styles['help']}>
              <MirrorHelp item={u} docsMeta={alldocs} mirrorMeta={mirrorMeta} />
            </th>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
