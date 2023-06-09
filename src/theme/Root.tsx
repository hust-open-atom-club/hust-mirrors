import React from 'react';
import RootContext from '@site/src/utils/SharedContext'
import { useDomainMetas } from '../utils/mirrorUtils';


export default function Root({ children }) {

  const domains = useDomainMetas();

  const [https, setHttps] = React.useState(true);
  const [domain, setDomain] = React.useState(domains[0] ? domains[0].domain : 'path/to/mirror');

  return <RootContext.Provider value={{
    https,
    setHttps,
    domain,
    setDomain
  }}>
    {children}
  </RootContext.Provider>
}
