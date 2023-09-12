import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from './index.module.css'
import { useDocMetas, useMirrorMetas } from "@site/src/utils/mirrorUtils";

function Breadcrumb() {
  return <nav className={clsx("theme-doc-breadcrumbs", styles.breadcrumbs)} aria-label="Breadcrumbs">
    <ul className="breadcrumbs" id='fancyindex__breadcrumbs'>
    </ul>
  </nav>
}


function FancyIndexInjectionContainer() {
  return <div className={clsx('mirror__table', styles.table)} dangerouslySetInnerHTML={
    {
      __html: `<h1 style="display:none"/><!-- fancyindex -->`
    }
  }>
    {/* fancy index content */}
  </div>

}

function Header() {
  return <header className={clsx('hero hero--primary', styles.header)}>
    <div className={styles['title-container']}>
      <div className={styles.title}>
        <h1>
          <span className='fancyindex__mirrorname'></span>
          <span>的文件索引</span>
        </h1>
        <p id='fancyindex__lastUpdate'>
          {/* 上次同步时间：N/A */}
        </p>
      </div>
      <div className={styles.blist}>
        <a className="button button--secondary" id="fancyindex__helpbutton">
          查看帮助
        </a>
        <div className={styles.cliBlock} id="fancyindex__cliblock">
          hustmirror deploy <span className="fancyindex__mirrorname"></span>
        </div>
      </div>
    </div>
  </header >
}

export default function FileIndexPage() {
  const mirrorMeta = JSON.stringify(useMirrorMetas());
  const helpMeta = JSON.stringify(useDocMetas());

  const clientScript = `
  window.MIRROR_METAS = ${mirrorMeta};
  window.HELP_METAS = ${helpMeta};
  `;

  return <Layout
    description="Index of /">
    <Header />
    <div className={styles.content}>
      <Breadcrumb />
      <FancyIndexInjectionContainer />
    </div>
    <script dangerouslySetInnerHTML={{
      __html: clientScript
    }}></script>
    <script defer src="__REPLACE_SCRIPT__"></script>
  </Layout>

}