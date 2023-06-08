import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate'
import styles from './index.module.css';
import Table from '../components/Table';
import SideBar from '../components/SideBar';


export default function Home(): JSX.Element {
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
      title={translate({
        message: "服务器状态"
      })}

      description="all mirror status on server">
      <div className={styles['container']}>
        {loading ?
          <div style={{
            textAlign: 'center'
          }}>
            正在加载...
          </div> :
          <div style={{
            overflow: 'auto',
          }}>
            <Table detail={true} search={search} items={items}></Table>
          </div>
        }
      </div>
    </Layout>
  );
}
