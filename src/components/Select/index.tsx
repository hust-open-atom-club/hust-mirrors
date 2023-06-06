import React from 'react'
import Select from 'react-select'

export type SelectItem = {
  label: string,
  value: string
}

type Props = {
  label: string,
  items: SelectItem[],
  value: boolean,
  onChange: (value: boolean) => void
}

export default ({ label, value, onChange, items }: Props) => {
  return (
    <div>
      <span>{label}</span>
      <Select value={value} onChange={onChange} options={items}></Select>
    </div>
  )
}


