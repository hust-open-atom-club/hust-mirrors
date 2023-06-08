import Translate, { translate } from '@docusaurus/Translate';
import { useDomainMetas } from '@site/src/utils/mirrorUtils';
import SharedContext from '@site/src/utils/SharedContext'
import React, { useContext } from 'react'
import Select from '@site/src/components/Select/index'
import Switch from '@site/src/components/Switch/index';

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default function GlobalOptions(props: Props) {
  const context = useContext(SharedContext);
  const domains = useDomainMetas();
  return (
    <div {...props}>
      <Select labelTop value={context.domain} label={translate({
        id: 'mirror.globalOption.selectDomain',
        message: '选择使用的域名'
      })} onChange={context.setDomain} items={domains.map(
        u => ({
          value: u.domain,
          label: `${u.domain}`
        })
      )} />
      <div>
        <Translate id='mirror.globalOption.domainDescPrefix'>
          该域名线路为
        </Translate>
        {domains.find(u => u.domain == context.domain)?.desc}
      </div>
      <Switch labelTop value={context.https}
        onChange={context.setHttps}
        label={translate({
          id: 'mirror.globalOption.selectHttp',
          message: '是否启用HTTPS'
        })} />
    </div>
  )
}
