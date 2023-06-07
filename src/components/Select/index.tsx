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
}

export default ({ label, value, onChange, items }: Props) => {
  console.log(items)

  return (
    <div>
      <span className={styles.label}>{label}</span>
      <Select<SelectItem>
        value={items.find(u => u.value == value)}
        classNames={{
          container: () => styles.container,

        }}
        onChange={(value) => { onChange(value.value); }}
        options={items}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--ifm-color-primary)',
          }

        })}
      >
      </Select>
    </div >
  )
}


