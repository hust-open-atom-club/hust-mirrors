import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import styles from './index.module.css'
import { useLocation } from "@docusaurus/router";
import { useDocMetas, useMirrorMetas } from '@site/src/utils/mirrorUtils';
import CodeBlock from '@theme/CodeBlock'
import BrowserOnly from "@docusaurus/BrowserOnly";

function Breadcrumb() {
  const { pathname } = useLocation();
  const items = pathname.split("/").map((curr, index, list) => {
    const prev = '/' + list.slice(0, index).join("/");
    return {
      label: curr || '/',
      href: prev + curr
    }
  });
  return <nav className={clsx("theme-doc-breadcrumbs", styles.breadcrumbs)} aria-label="Breadcrumbs">
    <ul className="breadcrumbs">
      {
        items.map((item, index) => <li className="breadcrumbs__item" key={item.href}>
          {
            index !== items.length - 1 ?
              <a aria-label={`Link to ${item.label}`} className="breadcrumbs__link" href={item.href}>{item.label}</a>
              :
              <span className="breadcrumbs__link">{item.label}</span>
          }
          <meta itemProp="position" content={index.toString()} />
        </li>
        )
      }
    </ul>
  </nav>

}

function FancyIndexInjectionContainer() {
  return <div className={styles.table} dangerouslySetInnerHTML={
    {
      __html: `<h1 style="display:none">
<!-- fancyindex -->
<script>
// modify injection dom
</script>`}
  }>
    {/* fancy index content */}
  </div>

}

function Header() {
  const { pathname } = useLocation();
  const mirrorid = pathname.split("/")[1];
  const metas = useMirrorMetas();
  const meta = metas.find(u => u.id == mirrorid);
  const displayName = meta ? (meta.displayName || meta.id) : mirrorid;

  return <header className={clsx('hero hero--primary', styles.header)}>
    <div className={styles['title-container']}>
      <BrowserOnly>
        {() => <>
          <div className={styles.title}>
            <h1>
              {translate({
                id: 'mirror.release',
                message: `${displayName} 的文件索引`
              })}
            </h1>
            <p>上次同步时间：N/A</p>
          </div>
          <div className={styles.blist}>
            <button className="button button--secondary">
              查看帮助
            </button>
            <div className={styles.cliBlock}>
              hustmirror deploy {mirrorid}
            </div>
          </div>
        </>}
      </BrowserOnly>
    </div>
  </header >
}

export default function FileIndexPage() {
  return <Layout
    description="Index of /">
    <Header />
    <div className={styles.content}>
      <Breadcrumb />
      <FancyIndexInjectionContainer />
    </div>
  </Layout>

}