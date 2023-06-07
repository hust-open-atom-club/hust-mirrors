import clsx from 'clsx'
import React from 'react'
import styles from './index.module.css'

type Props = {
  label: string,
  value: boolean,
  onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div>
      <span className={styles.label}>{label}</span>
      <div className={clsx(styles.container, value && styles['container-open'])}
        role="check-box" onClick={() => { onChange(!value) }} title={value ? "启用" : "禁用"}>
        <div className={clsx(styles.slider, value && styles['slider-open'])}></div>
      </div>
    </div >
  )
}


export default Switch;
