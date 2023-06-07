import React from 'react'
import styles from './index.module.css'

type Status = {
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
  items: Status[],
}

export default function Table({ items }: Props) {
  return (
    <table className={styles['container']}>
      <thead>
        <tr>
          <th className={styles['name']}>
            镜像名称
          </th>
          <th className={styles['last-update']}>
            上次更新
          </th>
          <th className={styles['help']}>
            帮助
          </th>
        </tr>

      </thead>
      <tbody className={styles.tbody}>
        {items.sort((a, b) => (a.name > b.name) ? 1 : -1).map(u => (
          <tr key={u.name}>
            <th className={styles['name']}>{u.name}</th>
            <th className={styles['last-update']}>{u.last_update}</th>
            <th className={styles['help']}></th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
