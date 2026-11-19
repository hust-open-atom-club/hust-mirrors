import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate'
import Table from '@site/src/components/Table';
import RequestState from '@site/src/components/RequestState';


export default function Home(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(false);
  const [search, setSearch] = useState("");

  const getItems = async () => {
    setLoading(true);
    setErr(false);
    try {
      const resp = await fetch("/status.json");
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }
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
      title={translate(
        {
          id: 'mirror.server.status',
          message: "服务器状态"
        })
      }

      description={translate({
        id: 'mirror.server.status.description',
        message: '查看华中科技大学开源镜像站各镜像源的同步状态、最近同步时间与数据大小。'
      })}>
      <div>
        {loading || err || items.length === 0 ?
          <RequestState
            loading={loading}
            failed={err}
            empty={items.length === 0}
            onRetry={getItems}
          /> :
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
