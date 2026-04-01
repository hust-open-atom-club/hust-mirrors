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
import CliAnimation from '../components/CliAnimation'

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
          <div>
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
          </div>
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
          <CliAnimation.UbuntuSample windowStyle={{
            height: 300,
            width: '100%'
          }} />

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              <Translate id='mirror.index.cli'>命令行快速开始</Translate>
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

  // 检查是否是4月1日
  const [isAprilFirstState, setIsAprilFirstState] = useState(false);
  
  useEffect(() => {
    // 在客户端设置时间，确保基于访问端时间而不是构建时间
    const now = new Date();
    setIsAprilFirstState(now.getMonth() === 3 && now.getDate() === 1); // 月份从0开始，所以4月是3
  }, []);

  // 老版组件
  const AprilFirstVersion = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
      const loadData = async () => {
        try {
          const response = await fetch('/status.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
          
          // 更新表格内容
          setTimeout(updateTableContent, 100);
        } catch (error) {
          console.error('获取数据失败:', error);
          setLoading(false);
        }
      };
      
      loadData();
    }, []);
    
    // 更新表格内容的函数
    const updateTableContent = () => {
      const tbody = document.getElementById('mirror-tbody');
      if (!tbody || !data.length) return;
      
      // 清空现有内容
      tbody.innerHTML = '';
      
      data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'mirror-table-odd' : 'mirror-table-even';
        
        // 格式化时间戳为可读日期
        const lastUpdate = item.last_update_ts ? 
          new Date(item.last_update_ts * 1000).toLocaleString() : 
          item.last_update || 'N/A';
        
        // 状态颜色设置
        let statusHtml;
        if (item.status === 'success') {
          statusHtml = '<p style="color:#080;font-weight:bold;">Synchronized</p>';
        } else if (item.status === 'failed') {
          statusHtml = '<p style="color:#f00;font-weight:bold;">Failed</p>';
        } else if (item.status === 'syncing') {
          statusHtml = '<p style="color:#ff8c00;font-weight:bold;">Syncing</p>';
        } else {
          statusHtml = `<p>${item.status || 'Unknown'}</p>`;
        }
        
        row.innerHTML = `
          <td><a href="${item.name}/">${item.name}</a></td>
          <td><p>${item.size || 'N/A'}</p></td>
          <td>${statusHtml}</td>
          <td><p>${lastUpdate}</p></td>
        `;
        
        tbody.appendChild(row);
      });
      
      // 更新加载状态
      const loadingElement = document.getElementById('loading-status');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    };
    
    useEffect(() => {
      const loadData = async () => {
        try {
          const response = await fetch('/status.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
          
          // 更新表格内容
          setTimeout(updateTableContent, 100);
        } catch (error) {
          console.error('获取数据失败:', error);
          setLoading(false);
        }
      };
      
      loadData();
    }, [updateTableContent]);
    
    // 排序功能
    const handleSort = (index: number) => {
      // 由于我们直接操作DOM，这里可以使用原生JS的排序方法
      const table = document.getElementById('mirror-table');
      if (!table) return;
      
      const tbody = document.getElementById('mirror-tbody');
      if (!tbody) return;
      
      const rows = Array.from(tbody.rows);
      const isAscending = !(table.getAttribute('data-sort-dir') === String(index));
      table.setAttribute('data-sort-dir', isAscending ? String(index) : '-1');
      
      // 根据列索引排序
      rows.sort((a, b) => {
        const aValue = a.cells[index].innerText || a.cells[index].textContent || '';
        const bValue = b.cells[index].innerText || b.cells[index].textContent || '';
        
        // 如果是大小列，需要特殊处理
        if (index === 1) { // 大小列
          const parseSize = (sizeStr: string) => {
            if (!sizeStr || sizeStr === 'N/A') return 0;
            const match = sizeStr.match(/([\d.]+)\s*([KMGT]?B)/i);
            if (!match) return 0;
            
            const [, num, unit] = match;
            const value = parseFloat(num);
            
            const units: Record<string, number> = {
              'B': 1,
              'KB': 1000,
              'MB': 1000000,
              'GB': 1000000000,
              'TB': 1000000000000
            };
            
            return value * (units[unit.toUpperCase()] || 1);
          };
          
          return isAscending ? parseSize(aValue) - parseSize(bValue) : parseSize(bValue) - parseSize(aValue);
        } else if (index === 3) { // 时间列
          const aDate = new Date(aValue).getTime();
          const bDate = new Date(bValue).getTime();
          return isAscending ? aDate - bDate : bDate - aDate;
        } else { // 其他列按字符串排序
          return isAscending ? 
            aValue.localeCompare(bValue) : 
            bValue.localeCompare(aValue);
        }
      });
      
      // 重新插入排序后的行
      rows.forEach(row => tbody.appendChild(row));
      
      // 更新表头背景
      const headers = document.querySelectorAll('#mirror-thead th');
      headers.forEach((header, i) => {
        if (i === index) {
          header.className = isAscending ? 'arrow1' : 'arrow-1';
        } else {
          header.className = 'arrow0';
        }
      });
    };
    
    return (
      <Layout
        title="华中科技大学开源镜像站"
        description="华中科技大学开源镜像站">
        <div id="wrapper" style={{ width: '940px', margin: '0 auto', overflow: 'hidden' }}>
          <div id="sidebar" style={{ float: 'left', width: '180px', marginTop: '80px', position: 'fixed', textAlign: 'right', zIndex: 2 }}>
            <table id="sidetable" border={0} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ padding: '0', border: 'none' }}> 
                    <div id="name" style={{
                      textTransform: 'uppercase',
                      fontSize: '26px',
                      fontWeight: 'bold',
                      color: '#006699',
                      fontStyle: 'oblique',
                      marginBottom: '10px',
                    }}>
                      <a href="/" style={{ color: '#006699', textDecoration: 'none' }}>Mirrors<br />@HUST</a>
                    </div>
                    <div id="nav" style={{ marginTop: '30px' }}>
                      <ul id="internal" style={{ marginTop: '50px', fontSize: '20px', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '30px' }}>
                          <a id="mirrors-link" href="/" style={{ color: '#000', textDecoration: 'none' }}>Mirrors</a>
                        </li>
                        <li style={{ marginBottom: '30px' }}>
                          <a id="help-link" href="/docs/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>Help</a>
                        </li>
                        <li style={{ marginBottom: '30px' }}>
                          <a id="visitor-link" href="/blog" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>News</a>
                        </li>
                      </ul>
                      <ul id="external" style={{ marginTop: '50px', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '20px', border: 'none', width: '150px' }}>
                          <a className="external-link" href="http://www.hust.edu.cn/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/logo.svg" alt="HUST" />
                          </a>
                        </li>
                        <li style={{ marginBottom: '20px', border: 'none', width: '150px' }}>
                          <a className="external-link" href="https://hust.openatom.club/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/atomclub.svg" alt="HUST OPEN ATOM CLUB" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="content" style={{ width: '700px', float: 'right', position: 'relative', marginTop: '50px', marginBottom: '50px', zIndex: 3, backgroundColor: '#fff' }}>
            <div id="mirror">
              <h1 className="title-text" style={{ verticalAlign: 'bottom', lineHeight: '30px' }}>欢迎访问华中科技大学开源镜像站</h1>
              <h3><i>Brought to you by Huazhong University of Science and Technology</i></h3>
              <hr />
              <div>
                <table id="mirror-table" style={{
                  textAlign: 'left',
                  width: '700px',
                  border: '1px solid #ccc',
                  borderCollapse: 'collapse',
                  marginTop: '20px'
                }}>
                  <thead id="mirror-thead" style={{ backgroundColor: '#b3d3ff' }}>
                    <tr className="sortable" style={{ height: '30px' }}>
                      <th id="mirror-name" onClick={() => handleSort(0)} style={{ width: '300px', cursor: 'pointer' }} className="arrow0">名称</th>
                      <th id="mirror-size" onClick={() => handleSort(1)} style={{ width: '100px', cursor: 'pointer' }} className="arrow0">大小</th>
                      <th id="mirror-status" onClick={() => handleSort(2)} style={{ width: '120px', cursor: 'pointer' }} className="arrow0">状态</th>
                      <th id="mirror-update" onClick={() => handleSort(3)} style={{ width: '180px', cursor: 'pointer' }} className="arrow0">同步完成时间</th>
                    </tr>
                  </thead>
                  <tbody id="mirror-tbody">
                    {loading && <tr><td colSpan={4}>正在加载...</td></tr>}
                  </tbody>
                </table>
                <div id="loading-status">{loading ? '正在加载...' : ''}</div>
                <p>本镜像站点的服务器及存储资源由华中科技大学开放原子开源俱乐部提供</p>	
                <p>欢迎给我们提建议，请联系 <a href="mailto:mirror_support@hust.edu.cn">我们的邮箱地址</a></p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          ::-webkit-scrollbar {
            width: 6px;
            background: #ccc;
          }
          ::-webkit-scrollbar-thumb {
            background: #777;
          }

          html {
            padding: 0;
            overflow-y: scroll;
          }

          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            font-size: 14px;
            line-height: 21px;
            font-family: Arial,Helvetica,sans-serif;
          }

          div {
            display: block;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          #sidebar ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          #sidebar ul li {
            margin-bottom: 30px;
          }

          #sidebar ul li a {
            color: #0066cc;
            text-decoration: none;
            transition: color .5s;
          }

          #sidebar ul li a:hover {
            color: #000;
            transition: color .5s;
          }

          #external {
            margin-top: 50px;
            float: right;
          }

          #external li {
            margin-bottom: 20px;
            border: none;
            width: 150px;
          }

          #mirror-table tr {
            height: 30px;
          }

          #mirror-table tr p, a {
            margin: 0px;
          }

          #mirror-table tbody tr:hover {
            background: #bdd;
          }

          .mirror-table-odd {
            background: #ddf;
          }

          .mirror-table-even {
            background: #eee;
          }

          .sortable th:hover {
            background-color: #caf;
            cursor: pointer;
          }

          .arrow0 {
            background: url("../image/arrow0.gif") no-repeat center right;
          }
          .arrow1 {
            background: url("../image/arrow1.gif") no-repeat center right;
          }
          .arrow-1 {
            background: url("../image/arrow-1.gif") no-repeat center right;
          }
        `}</style>
      </Layout>
    );
  };

  // 如果是4月1日，显示老版本界面
  if (isAprilFirstState) {
    return <AprilFirstVersion />;
  }

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