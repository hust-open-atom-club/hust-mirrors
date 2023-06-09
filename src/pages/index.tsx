import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate'
import styles from './index.module.css';
import Table from '../components/Table';
import SideBar from '../components/SideBar';
import mirrorConfig from '@site/mirrors.config';

function HomepageHeader({
  searchValue, onSearchValueChange
}: {
  searchValue: string, onSearchValueChange: (value: string) => void
}) {



  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles['header-container']}>
        <div className={styles['main-part']}>
          <h1 className={`hero__title ${styles.left}`}>
            {translate({
              id: 'mirror.title',
              message: mirrorConfig.mainTitle
            })}
          </h1>
          <p className={`hero__subtitle ${styles.left}`}>
            {translate({
              id: 'mirror.welcome',
              message: mirrorConfig.welcome
            })}
          </p>
          <input ref={inputRef} value={searchValue} onChange={(e) => { onSearchValueChange(e.target.value) }}
            onKeyDown={(e) => {
              if (e.key == 'Escape') {
                inputRef.current?.blur();
                onSearchValueChange("");
              }
            }}
            className={`${styles.left} ${styles.search}`} placeholder={translate({
              id: 'mirror.index.searchHint',
              message: "按下 / 开始搜索"
            })} />
        </div>
        <div className={styles['cli-ad-container']}>
          <img className={styles['banner-img']} src='/img/cli.png' />
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              <Translate id='mirror.index.cli'>通过命令行使用</Translate>
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
  const [search, setSearch] = useState("");

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
      description="Description will go into a meta tag in <head />">
      <HomepageHeader searchValue={search} onSearchValueChange={setSearch} />
      <div className={styles['list-container']}>
        <div className={styles['table-container']}>
          {loading ?
            <div>
              正在加载...
            </div> :
            <Table search={search} items={items}></Table>
          }
        </div>
        <SideBar className={styles['sidebar-container']} />
      </div>
    </Layout>
  );
}
