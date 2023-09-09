import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './index.module.css'

function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className={clsx('container', ' container-fluid', styles.container)}>
        {(logo || copyright) && (
          <div className="footer__bottom" style={{ maxWidth: 650 }}>
            <div>华中科技大学开源镜像站由 <a href='https://ncc.hust.edu.cn'>华中科技大学网络中心</a> 提供支持。</div>
            <div>该镜像站收录了主流开源操作系统的软件源、安装镜像，包管理器的仓库，以及常用开源软件源代码，
              是 deepin, openEuler, openKylin 等多个国产操作系统的官方源。</div>
            <div>该镜像站目前是华中地区规模最大，速度最快，收录最全的开源软件镜像站。除此以外，提供了发行版ISO下载、完整的使用帮助文档和CLI工具的支持。</div>
          </div>
        )}
        <div className={styles.logos}>
          <img src='/img/logo.svg' height={60} />
          {/* <img src='/img/logo_secondary.png' height={60} /> */}
        </div>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
