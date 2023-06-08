import clsx from 'clsx';
import React from 'react'
import Select from 'react-select'
import styles from './index.module.css'

export type SelectItem = {
  value: string,
  label: string
};

type Props = {
  label: string,
  items: SelectItem[],
  value: string,
  onChange: (value: string) => void
  labelTop?: boolean;
}

export default ({ label, value, onChange, items, labelTop }: Props) => {
  return (
    <div>
      <span className={clsx(styles.label, labelTop && styles['label-top'])}>{label}</span>
      <
        // @ts-ignore
        Select<SelectItem>
        value={items.find(u => u.value == value)}
        classNames={{
          container: () => labelTop ? "" : styles.container,
        }}
        onChange={(value) => { onChange(value.value); }}
        options={items}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--ifm-color-primary)',
            primary75: 'var(--ifm-color-emphasis-300)',
            primary50: 'var(--ifm-color-emphasis-300)',
            primary25: 'var(--ifm-color-emphasis-200)',
            neutral0: 'var(--ifm-color-emphasis-0)',
            neutral5: 'var(--ifm-color-emphasis-500)',
            neutral10: 'var(--ifm-color-emphasis-600)',
            neutral20: 'var(--ifm-color-emphasis-600)',
            neutral30: 'var(--ifm-color-emphasis-700)',
            neutral40: 'var(--ifm-color-emphasis-700)',
            neutral50: 'var(--ifm-color-emphasis-800)',
            neutral60: 'var(--ifm-color-emphasis-800)',
            neutral70: 'var(--ifm-color-emphasis-900)',
            neutral80: 'var(--ifm-color-emphasis-900)',
            neutral90: 'var(--ifm-color-emphasis-900)'
          }
        })}
      >
      </Select>
    </div >
  )
}


