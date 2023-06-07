import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import Table from '../components/Table';
import SideBar from '../components/SideBar';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles['header-container']}>
        <div className={styles['main-part']}>
          <h1 className={`hero__title ${styles.left}`}>{siteConfig.title}</h1>
          <p className={`hero__subtitle ${styles.left}`}>{siteConfig.tagline}</p>
          <input className={`${styles.left} ${styles.search}`} placeholder={"按下 / 开始搜索"} />
        </div>
        <div className={styles['cli-ad-container']}>
          <img className={styles['banner-img']} src='/img/cli.png' />

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/cli-tool">
              通过命令行使用
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(false);

  const getItems = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/status.json");
      const data = await resp.json();
      setItems(data);
    }
    catch {
      setErr(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <div className={styles['list-container']}>
        <div className={styles['table-container']}>
          {loading ?
            <div>
              正在加载...
            </div> :
            <Table items={items}></Table>
          }
        </div>
        <SideBar className={styles['sidebar-container']} />
      </div>
    </Layout>
  );
}
