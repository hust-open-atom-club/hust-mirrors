import React from 'react'
import RcSelect from 'rc-select'
import { DefaultOptionType } from 'rc-select/lib/Select'

export type SelectItem = DefaultOptionType;

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
      <RcSelect value={value} onChange={onChange} options={items}>
      </RcSelect>
    </div>
  )
}


