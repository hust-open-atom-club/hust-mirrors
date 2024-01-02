import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate'
import { useLocation } from '@docusaurus/router'
import { useMirrorMetas } from '@site/src/utils/mirrorUtils';
import Admonition from '@theme/Admonition'
import React from 'react'

export default function () {
  const { pathname } = useLocation();
  const mirrorHelpid = pathname.split('/')[2];
  const metas = useMirrorMetas();
  let ok = false;
  const meta = metas.find(u => u.id == mirrorHelpid || u.helpID == mirrorHelpid);
  if (meta && meta.supportCli) {
    ok = true;
  }
  return ok && (<Admonition type='tip' icon='🌈' title={mirrorHelpid + translate({
    id: 'mirror.supportCli.title',
    message: '支持CLI部署'
  })}>
    <Translate id='mirror.supportCli'>
      该程序包支持命令行工具一键部署，
    </Translate>
    <Link to={`/docs?d=${meta.cliID || meta.id}`}>
      <Translate id='mirror.supportCli.goto'>
        去看看吧！
      </Translate>
    </Link>
  </Admonition>);
}