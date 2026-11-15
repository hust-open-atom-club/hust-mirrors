import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate'
import Table from '@site/src/components/Table';


export default function Home(): React.JSX.Element {
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
