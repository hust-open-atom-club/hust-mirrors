import clsx from 'clsx'
import React from 'react'
import styles from './index.module.css'

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  labelTop?: boolean;
}

const Switch: React.FC<Props> = ({ label, value, onChange, labelTop }) => {
  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === " ") {
      onChange(!value);
      e.preventDefault();
    }
  };

  return (
    <div>
      <span className={clsx(styles.label, labelTop && styles['label-top'])}>{label}</span>
      <div tabIndex={0} className={clsx(styles.container, value && styles['container-open'])}
        role="check-box" onClick={() => { onChange(!value) }} onKeyDown={ handleKeyDown }
        title={value ? "启用" : "禁用"}>
        <div className={clsx(styles.slider, value && styles['slider-open'])}></div>
      </div>
    </div >
  )
}


export default Switch;
