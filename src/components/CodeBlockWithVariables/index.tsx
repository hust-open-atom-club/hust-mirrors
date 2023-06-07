import React, { useMemo, useState } from 'react'
import CodeBlock from '@theme/CodeBlock'
import { Props as CBProps } from '@theme/CodeBlock'
import { SelectItem } from '../Select';
import Select from '../Select';
import Switch from '../Switch';


type DefaultValue = boolean | string | number;

type OptionType = 'switch' | 'select';

type Option = {
  key: string,
  label: string,
  type: OptionType,
  items?: SelectItem[],
  default?: DefaultValue
}

type Variables = {
  [key: string]: any
}

type Props = {
  code: (vars: Variables) => string,
  options: Option[],
  blockProps?: CBProps
}

export default function CodeBlockWithVariables({ code, options, blockProps }: Props) {
  const states: {
    [key: string]: [any, React.Dispatch<any>]
  } = {};

  for (const option of options) {
    let def: DefaultValue = "";
    if (option.default)
      def = option.default;
    else if (option.type == 'switch')
      def = false;
    else if (option.type == 'select') {
      def = option.items?.[0].value;
    }
    states[option.key] = useState(def);
  }

  const vars: Variables = {};

  for (const key in states) {
    if (states.hasOwnProperty(key)) {
      const element = states[key][0];
      vars[key] = element;
    }
  }

  return (
    <div>
      {
        options.map(u => {
          if (u.type == 'switch')
            return <Switch key={u.key} label={u.label} value={states[u.key][0]} onChange={states[u.key][1]}></Switch>
          else if (u.type == 'select')
            return <Select key={u.key} label={u.label} items={u.items!} value={states[u.key][0]} onChange={states[u.key][1]}></Select>
        })
      }

      <CodeBlock {...blockProps}>
        {code(vars)}
      </CodeBlock>
    </div>
  )

}
