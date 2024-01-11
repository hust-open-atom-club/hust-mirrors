import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate'
import { DocMeta, useDocMetas, useMirrorMetas } from '@site/src/utils/mirrorUtils';
import copy from 'copy-to-clipboard';
import clsx from 'clsx';

// svg import
import NoneIcon from '@site/static/icons/none.svg';
import PausedIcon from '@site/static/icons/paused.svg';
import PreSyncingIcon from '@site/static/icons/presyncing.svg';
import SyncingIcon from '@site/static/icons/syncing.svg';
import SuccessIcon from '@site/static/icons/success.svg';
import FailedIcon from '@site/static/icons/failed.svg';
import DisabledIcon from '@site/static/icons/disabled.svg';
import TerminalIcon from '@site/static/icons/terminal.svg';
import HelpIcon from '@site/static/icons/help2.svg';
import CopyIcon from '@site/static/icons/copy.svg';
import { MirrorMeta } from '@site/meta.config';
import SharedContext from '@site/src/utils/SharedContext';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { format as timeagoFormat } from 'timeago.js'


type MirrorStatus = {
  name: string,
  is_master: boolean,
  // https://github.com/tuna/tunasync/blob/755c87761daecf590b1192501a652b582d3eda6d/internal/status.go#LL21C15-L21C15
  status: 'none' | 'failed' | 'success' | 'syncing' | 'pre-syncing' | 'paused' | 'disabled',
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

function tsPeriodToStr(tsStart: number, tsEnd: number) {
  if (tsStart == 0) return "N/A";

  const seconds = tsEnd - tsStart;

  const zhUnits = {
    day: '天',
    hour: '小时',
    minute: '分钟',
    second: '秒',
  }

  const enUnits = {
    day: 'days',
    hour: 'hours',
    minute: 'minutes',
    second: 'seconds',
  }

  let unit;

  const locale = useDocusaurusContext().i18n.currentLocale;
  if (locale.startsWith("zh")) unit = zhUnits;
  else unit = enUnits;

  if (seconds < 0) return "N/A";
  else if (seconds == 0) {
    if (locale.startsWith("zh")) return "瞬间";
    else return "a moment";
  }
  else if (seconds < 60) return `${seconds} ${unit.second}`;
  else if (seconds < 60 * 60) return `${Math.ceil(seconds / 60)} ${unit.minute}`;
  else if (seconds < 60 * 60 * 24) return `${Math.ceil(seconds / 60 / 60)} ${unit.hour}`;
  else return `${Math.ceil(seconds / 60 / 60 / 24)} ${unit.day}`;
}

type MirrorTimeProps = {
  ts: number
}

function MirrorTime({ ts }: MirrorTimeProps) {
  const docusaurusContext = useDocusaurusContext();
  let locale = docusaurusContext.i18n.currentLocale;

  // check mouse hover

  const [hover, setHover] = useState(false);

  if (locale.startsWith("zh")) locale = "zh_CN";
  else locale = "en_US";

  if (new Date(ts * 1000).getFullYear() <= 1) return "N/A";

  return <div
    style={{ cursor: 'default' }}
    onMouseEnter={() => { setHover(true) }}
    onMouseLeave={() => { setHover(false) }}>
    <span>{timeagoFormat(new Date(ts * 1000), locale)}</span>
    {hover && <span className={styles['date-abs']}> {tsToStr(ts)} </span>}
  </div>
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


function SyncingStatus({ status }: { status: MirrorStatus['status'] }) {
  let label;
  if (status == 'none') label = translate({ id: 'mirror.table.status.none', message: '未同步' });
  else if (status == 'paused') label = translate({ id: 'mirror.table.status.paused', message: '暂停' });
  else if (status == 'pre-syncing') label = translate({ id: 'mirror.table.status.presyncing', message: '预同步' });
  else if (status == 'syncing') label = translate({ id: 'mirror.table.status.syncing', message: '同步中' });
  else if (status == 'success') label = translate({ id: 'mirror.table.status.success', message: '成功' });
  else if (status == 'failed') label = translate({ id: 'mirror.table.status.failed', message: '失败' });
  else if (status == 'disabled') label = translate({ id: 'mirror.table.status.disabled', message: '禁用' });
  else label = status;

  return <span className={clsx(styles['status-label'])}>
    {status == 'none' && <NoneIcon />}
    {status == 'paused' && <PausedIcon />}
    {status == 'pre-syncing' && <PreSyncingIcon />}
    {status == 'syncing' && <SyncingIcon />}
    {status == 'success' && <SuccessIcon />}
    {status == 'failed' && <FailedIcon />}
    {status == 'disabled' && <DisabledIcon />}

    <span>
      {label}
    </span>
  </span>
}

function MirrorName({ item, docsMeta: docs, mirrorMeta: mirrors }: MirrorNameProps) {
  const m = mirrors.find(u => u.id == item.name);

  const isGit = (m && m.type) ? m.type == 'git' : item.name.endsWith(".git");
  const link = (m && m.link) ? m.link : (
    isGit ? `/git/${item.name}` : `/${item.name}`
  );

  const dname = (m && m.displayName) ? m.displayName : item.name;

  let desc = <div>
    {m && m.description &&
      <p>{m.description}</p>}
  </div>;

  const descShown = (!!m && !!m.description);


  const onLinkClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  }

  return (<>
    <span className={styles['mirror-name']}>
      <a onClick={onLinkClick} href={link}>
        {dname}
      </a>
      {descShown &&
        <div className={styles['desc-container']}>
          {desc}
        </div>}
    </span>
    <MirrorHelp item={item} docsMeta={docs} mirrorMeta={mirrors} />
  </>
  )
}

type MirrorHelpProps = MirrorNameProps;

function MirrorHelp({ item, mirrorMeta: mirrors, docsMeta: docs }: MirrorHelpProps) {
  const m = mirrors.find(u => u.id == item.name);
  const isGit = (m && m.type) ? m.type == 'git' : item.name.endsWith(".git");
  const helpid = (m && m.helpID) ? m.helpID : item.name;

  const [copied, setCopied] = useState(false);
  const ctx = React.useContext(SharedContext);
  const timeoutRef = useRef<number | undefined>(undefined);

  const copyLink: React.MouseEventHandler = (e) => {
    if (isGit) {
      const gitUrl = `${ctx.https ? 'https' : 'http'}://${ctx.domain}/git/` + item.name;
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
    }
    e.preventDefault();
    e.stopPropagation();
  }


  return <>
    {
      copied &&
      <span className={styles.copied}>
        <Translate id='mirror.table.copied'>( 已复制 )</Translate>
      </span>
    }
    {docs.find(v => v.id == helpid) &&
      <Link className={styles['help-link']} to={`/docs/${helpid}`} title={translate({
        id: 'mirror.table.help',
        message: '帮助文档'
      })} >
        <HelpIcon />
      </Link>}
    {isGit &&
      <a onClick={copyLink} href='#' className={clsx(styles['help-link'], styles['help-link-copy'])} title={
        translate({
          id: 'mirror.table.copy',
          message: '复制链接'
        })
      }>
        <CopyIcon />
      </a>
    }

    {m && m.supportCli &&
      <Link className={styles['help-link']} to={`/docs?d=${m.cliID || m.id}`} title={translate({
        id: 'mirror.table.supportCli',
        message: '该镜像支持CLI部署'
      })}>
        <TerminalIcon />
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
  ).sort((a, b) => {
    if (a.name.endsWith(".git") && !b.name.endsWith(".git")) {
      return 1;
    } else if (!a.name.endsWith(".git") && b.name.endsWith(".git")) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });

  if (search) {
    items = items.filter(u => u.name.toLowerCase().indexOf(search.toLowerCase()) != -1)
  }


  return (
    <table className={clsx('mirror__table', styles['container'], detail && styles["detail"])}>
      <thead>
        <tr>
          <th className={styles['name']}>
            <Translate id='mirror.tableMeta.name'>镜像名称</Translate>
          </th>
          <th className={styles['date']}>
            <Translate id='mirror.tableMeta.lastUpdate'>上次更新</Translate>
          </th>
          {detail && <th className={styles['date-short']}>
            <Translate id='mirror.tableMeta.lastStart'>同步时长</Translate>
          </th>}
          {detail && <th className={styles['date']}>
            <Translate id='mirror.tableMeta.nextUpdate'>下次更新</Translate>
          </th>}
          {detail && <th className={styles['status']}>
            <Translate id='mirror.tableMeta.status'>同步状态</Translate>
          </th>}
          {detail && <th className={styles['size']}>
            <Translate id='mirror.tableMeta.size'>镜像大小</Translate>
          </th>}
          {detail && <th className={styles['upstream']}>
            <Translate id='mirror.tableMeta.upstream'>上游链接</Translate>
          </th>}
        </tr>

      </thead>
      <tbody>
        {items.map(u => (
          <tr key={u.name} className={clsx({
            [styles['row-none']]: u.status == 'none',
            [styles['row-failed']]: u.status == 'failed',
            [styles['row-syncing']]: u.status == 'syncing',
            [styles['row-presyncing']]: u.status == 'pre-syncing',
            [styles['row-paused']]: u.status == 'paused',
            [styles['row-disabled']]: u.status == 'disabled'
          })}>
            <td className={styles['name']}>
              <MirrorName item={u} docsMeta={alldocs} mirrorMeta={mirrorMeta} />
            </td>
            <td className={styles['date']}>
              <MirrorTime ts={u.last_update_ts} />
            </td>
            {detail && <td className={styles['date-short']}>
              {tsPeriodToStr(u.last_started_ts, u.last_ended_ts)}
            </td>}
            {detail && <td className={styles['date']}>
              <MirrorTime ts={u.next_schedule_ts} />
            </td>}
            {detail && <td className={styles['status']}>
              <SyncingStatus status={u.status} />
            </td>}
            {detail && <td className={styles['size']}>{u.size}</td>}
            {detail && <td className={styles['upstream']}>{u.upstream}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
