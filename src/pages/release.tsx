import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate'
import styles from './release.module.css';
import GlobalOptions from '../components/DocGlobalOptions/index';
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import CodeBlock from '@theme/CodeBlock'
import Select from '../components/Select/index';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles['header-container']}>
        <h1>
          {translate({
            id: 'mirror.release',
            message: "发行版ISO下载"
          })}
        </h1>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {

  const [release, setRelease] = useState("");
  const [version, setVersion] = useState("");
  const [variable, setVariable] = useState("");

  return (
    <Layout
      description="OS release iso image downloads">
      <HomepageHeader />
      <div className={styles.container}>
        <GlobalOptions />
        <Select labelTop label={
          translate({
            id: 'mirror.release.chooseRelease',
            message: '选择发行'
          })
        } items={[]}
          value={release}
          onChange={setRelease}
        ></Select>

        {release &&
          <Select labelTop label={
            translate({
              id: 'mirror.release.chooseVersion',
              message: '选择版本'
            })
          } items={[]}
            value={version}
            onChange={setVersion}
          ></Select>}


        {version && <Select labelTop label={
          translate({
            id: 'mirror.release.chooseVariable',
            message: '选择变体'
          })
        } items={[]}
          value={variable}
          onChange={setVariable}
        ></Select>}


        <Tabs>
          <TabItem label={
            translate({
              id: 'mirror.release.useCurl',
              message: '使用curl下载'
            })
          } value='curl'>
            <CodeBlock language='shell'>
              curl -s &gt;
            </CodeBlock>
          </TabItem>

          <TabItem label={
            translate({
              id: 'mirror.release.useWget',
              message: '使用wget下载'
            })
          } value='wget'>
            <CodeBlock language='shell'>
              wget
            </CodeBlock>
          </TabItem>

          <TabItem label={
            translate({
              id: 'mirror.release.link',
              message: '仅显示地址'
            })
          } value='link'>
            <CodeBlock>
              wget
            </CodeBlock>
          </TabItem>

        </Tabs>
      </div>


    </Layout>
  );
}
