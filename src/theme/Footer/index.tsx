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
              <Translate id='mirror.footer.desc0_0'>华中科技大学开源镜像站由 </Translate>
              <a href='https://cse.hust.edu.cn'>
                <Translate id='mirror.footer.desc0_1'>华中科技大学网络空间安全学院</Translate>
              </a>
              <Translate id='mirror.footer.desc0_2'> 和 </Translate>
              <a href='https://ncc.hust.edu.cn'>
                <Translate id='mirror.footer.desc0_3'>网络与信息化办公室</Translate>
              </a>
              <Translate id='mirror.footer.desc0_4'> 提供支持。用户使用问题可以发送邮件至 </Translate>
              <a href="mailto:mirror_support@hust.edu.cn">mirror_support@hust.edu.cn</a>
              <Translate id='mirror.footer.desc0_5'> 询问。该镜像站收录了主流开源软件源、安装镜像、完整帮助文档和CLI工具支持。 </Translate>
            </div>
            <div>
              <a href='https://hust.openatom.club'>
                <Translate id='mirror.footer.desc3_0'>华中科技大学开放原子开源俱乐部
                </Translate>
              </a>
              <Translate id='mirror.footer.desc3_1'> 践行开放、共享、协同、贡献的理念，
                专注于通用Linux和物联网操作系统领域，并促进跨学科合作，提升技能，分享知识，为国内开源生态系统打造可持续的开源之路。
              </Translate>
            </div>
            <div>
              <Translate id='mirror.footer.desc4'>华中科技大学OpenHarmany技术俱乐部借助OpenHarmony社区平台推动开源技术和产学研合作，通过校内教学与俱乐部实践的深度融合，鼓励和推动开源社区技术研究和创新探索，繁荣开源社区生态。
              </Translate>
            </div>
          </div>
        )}
        <div className={styles.logos}>
          <img src='/img/atomclub.svg' height={80} />
          {/* <img src='/img/logo_secondary.png' height={60} /> */}
        </div>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
