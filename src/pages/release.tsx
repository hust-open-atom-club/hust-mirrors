import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import DownloadIcon from '@site/static/icons/download.svg';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate'
import styles from './release.module.css';
import GlobalOptions from '../components/DocGlobalOptions/index';
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import CodeBlock from '@theme/CodeBlock'
import Select from '../components/Select/index';
import SharedContext from '../utils/SharedContext';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles['header-container']}>
        <h1>
          {translate({
            id: 'mirror.release',
            message: "系统镜像与应用软件下载"
          })}
        </h1>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);

  const { https, domain } = useContext(SharedContext);

  const [release, setRelease] = useState("");
  const [version, setVersion] = useState("");
  const [variant, setVariant] = useState("");

  const updateReleases = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/releases.json`);
      const data = await res.json();
      setReleases(data);
    }
    catch {
      console.error("Loading release metas failed.")
    }
    setLoading(false);
  }

  useEffect(() => {
    updateReleases();
  }, []);

  function unique<T>(list: T[]): T[] {
    const set = new Set(list);
    return Array.from(set);
  }

  const releaseItems = unique(releases.map(u => u.release)).map(u => ({
    value: u,
    label: u
  }));

  const versionItems = unique(releases.filter(u => u.release === release)
    .map(u => u.version)).filter(u => !!u).map(u => ({
      value: u,
      label: u
    }));

  const variantItems = unique(releases.filter(u => u.release === release && u.version === version)
    .map(u => u.variant)).filter(u => !!u).map(u => ({
      value: u,
      label: u
    }));

  [versionItems, releaseItems, variantItems].forEach(u => u.unshift({
    value: '', label: translate({
      id: 'mirror.release.select',
      message: '请选择...'
    })
  }));

  const current = releases.filter(u => u.release == release
    && u.version == (version || undefined)
    && u.variant == (variant || undefined)
  );


  return (
    <Layout
      description="OS release iso image downloads">
      <HomepageHeader />
      <div className={styles.container}>
        {loading && <div>
          <Translate id='mirror.release.loading'>正在加载发行版列表...</Translate>
        </div>}
        <GlobalOptions />
        <Select labelTop label={
          translate({
            id: 'mirror.release.chooseRelease',
            message: '选择软件'
          })
        } items={releaseItems}
          value={release}
          onChange={(v) => {
            setRelease(v);
            setVersion("");
            setVariant("");
          }}
        ></Select>

        {release && versionItems.length > 1 &&
          <Select labelTop label={
            translate({
              id: 'mirror.release.chooseVersion',
              message: '选择版本'
            })
          } items={versionItems}
            value={version}
            onChange={(v) => {
              setVersion(v);
              setVariant("");
            }}
          ></Select>}

        {version && variantItems.length > 1 &&
          <Select labelTop label={
            translate({
              id: 'mirror.release.chooseVariable',
              message: '选择变体'
            })
          } items={variantItems}
            value={variant}
            onChange={setVariant}
          ></Select>}

        {current.map(c => {

          const link = c ? (
            c.link ? c.link : `${https ? 'https' : 'http'}://${domain}/${c.path}`
          ) : undefined;

          const filename = link ? link.split('/').pop() : undefined;

          return link &&
            <div className={styles.result}>
              <h4>
                <span>
                  <DownloadIcon />
                  <span>{filename}</span>
                </span>
                <a target="_blank" href={link}>
                  <button className='button button-lg button--primary'>
                    <Translate id='mirror.release.browserDownload'>通过浏览器下载</Translate>
                  </button>
                </a>

              </h4>
              <Tabs>
                <TabItem label={
                  translate({
                    id: 'mirror.release.useCurl',
                    message: '使用curl下载'
                  })
                } value='curl'>
                  <CodeBlock language='shell'>
                    curl -O {link}
                  </CodeBlock>
                </TabItem>

                <TabItem label={
                  translate({
                    id: 'mirror.release.useWget',
                    message: '使用wget下载'
                  })
                } value='wget'>
                  <CodeBlock language='shell'>
                    wget {link}
                  </CodeBlock>
                </TabItem>

                <TabItem label={
                  translate({
                    id: 'mirror.release.link',
                    message: '仅复制地址'
                  })
                } value='link'>
                  <CodeBlock>
                    {link}
                  </CodeBlock>
                </TabItem>

              </Tabs>
            </div>
        })
        }

      </div>


    </Layout>
  );
}
