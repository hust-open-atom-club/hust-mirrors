import React from 'react'

type Props = {
  label: string,
  value: boolean,
  onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div>
      <span>{label}</span>
      <button onClick={() => { onChange(!value) }}>{value ? "启用" : "禁用"}</button>
    </div>
  )
}


export default Switch;
