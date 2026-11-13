import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock'
import { Props as CBProps } from '@theme/CodeBlock'
import { SelectItem } from '../Select';
import Select from '../Select';
import Switch from '../Switch';
import { useSharedContext } from '@site/src/utils/SharedContext';
import styles from './index.module.css'


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

type Selection = {
  value: DefaultValue;
  defaultValue: DefaultValue;
  type: OptionType;
}

function getDefaultValue(option: Option): DefaultValue {
  return option.default ?? (option.type === 'switch' ? false : option.items?.[0]?.value ?? '');
}

export default function CodeBlockWithVariables({ code, options, blockProps }: Props) {
  const [selections, setSelections] = useState(() => new Map<string, Selection>());
  const ctx = useSharedContext();

  const activeSelections = new Map<string, Selection>();
  const controls = options.map(option => {
    const defaultValue = getDefaultValue(option);
    const selection = selections.get(option.key);
    if (selection?.type === option.type && selection.defaultValue === defaultValue &&
      (option.type === 'switch' || option.items?.some(item => item.value === selection.value))) {
      activeSelections.set(option.key, selection);
    }
    const value = activeSelections.get(option.key)?.value ?? defaultValue;
    const onChange = (value: DefaultValue) => {
      setSelections(previous => new Map(previous).set(option.key, { value, defaultValue, type: option.type }));
    };
    return { option, value, onChange };
  });
  // Discard stale choices so removed options cannot restore old selections.
  if (activeSelections.size !== selections.size) {
    setSelections(activeSelections);
  }

  const vars: Variables = Object.fromEntries(controls.map(({ option, value }) => [option.key, value]));
  vars['_http'] = ctx.https ? "https" : "http";
  vars['_domain'] = ctx.domain;

  return (
    <div>
      {options && !!options.length && <div className={styles.panel}>
        {
          controls.map(({ option, value, onChange }) => {
            if (option.type === 'switch')
              return <Switch key={option.key} label={option.label} value={Boolean(value)} onChange={onChange} />;
            return <Select key={option.key} label={option.label} items={option.items ?? []} value={String(value)} onChange={onChange} />;
          })
        }
      </div>}

      <CodeBlock {...blockProps}>
        {code(vars)}
      </CodeBlock>
    </div>
  )

}
