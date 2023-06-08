import { translate } from '@docusaurus/Translate';
import { useDomainMetas } from '@site/src/utils/mirrorUtils';
import SharedContext from '@site/src/utils/SharedContext'
import React, { useContext } from 'react'
import Select from '@site/src/components/Select/index'
import Switch from '@site/src/components/Switch/index';

type Props = {}

export default function GlobalOptions({ }: Props) {
  const context = useContext(SharedContext);
  const domains = useDomainMetas();
  return (
    <div>
      <Select value={context.domain} label={translate({
        id: 'mirror.selectDomain',
        message: '域名'
      })} onChange={context.setDomain} items={domains.map(
        u => ({
          value: u.domain,
          label: `${u.domain} - ${u.desc}`
        })
      )} />
      <Switch value={context.https}
        onChange={context.setHttps}
        label={translate({
          id: 'mirror.selectHttp',
          message: '启用https'
        })} />
    </div>
  )
}
