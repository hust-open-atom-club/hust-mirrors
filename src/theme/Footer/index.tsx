import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './index.module.css'
import Translate from '@docusaurus/Translate';

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
          <div className="footer__bottom" style={{ maxWidth: 750 }}>
            <div>
              <Translate id='mirror.footer.desc0_0'> 华中科技大学开源镜像站由</Translate>
              <a href='https://ncc.hust.edu.cn'>
                <Translate id='mirror.footer.desc0_1'>华中科技大学网络中心</Translate>
              </a>
              <Translate id='mirror.footer.desc0_2'>提供支持。</Translate>
            </div>
            <div>
              <Translate id='mirror.footer.desc1'>
                该镜像站收录了主流开源操作系统的软件源、安装镜像，包管理器的仓库，以及常用开源软件源代码，
                除此以外，提供了发行版ISO下载、完整的使用帮助文档和CLI工具的支持。
              </Translate>
            </div>
            {/* <div>
              <Translate id='mirror.footer.desc2'>
                该镜像站目前是华中地区规模最大，速度最快，收录最全的开源软件镜像站。除此以外，提供了发行版ISO下载、完整的使用帮助文档和CLI工具的支持。
                是 deepin, openEuler, openKylin 等多个国产操作系统的官方源
              </Translate>
            </div> */}
            <div>
              <Translate id='mirror.footer.desc3'>华科网安开放原子开源俱乐部践行开放、共享、协同、贡献的理念，专注于通用Linux和物联网操作系统领域，并促进跨学科合作，提升技能，分享知识，为国内开源生态系统打造可持续的开源之路。
              </Translate>
            </div>
            <div>
              <Translate id='mirror.footer.desc4'>华中科技大学OpenHarmany技术俱乐部，借助OpenHarmony社区平台推动开源技术和产学研合作，通过校内教学与俱乐部实践的深度融合，鼓励和推动开源社区技术研究和创新探索，繁荣开源社区生态。
              </Translate>
            </div>
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
