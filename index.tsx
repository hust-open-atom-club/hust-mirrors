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
              <Translate id='mirror.footer.desc0_2'>  、  </Translate>
              <a href='https://ncc.hust.edu.cn'>
                <Translate id='mirror.footer.desc0_3'>网络与信息化办公室</Translate>
              </a>
	      <Translate id='mirror.footer.desc0_4'>  和  </Translate>
	      <a href='https://hlug.cn'>
                <Translate id='mirror.footer.desc0_5'>华中科技大学Linux协会</Translate>
              </a>
              <Translate id='mirror.footer.desc0_6'> 提供支持。用户使用问题可以发送邮件至 </Translate>
              <a href="mailto:mirror_support@hust.edu.cn">mirror_support@hust.edu.cn</a>
              <Translate id='mirror.footer.desc0_7'> 询问。该镜像站收录了主流开源软件源、安装镜像、完整帮助文档和CLI工具支持。 </Translate>
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
	    <div>
	    <a href='https://hlug.cn'>
              <Translate id='mirror.footer.desc5_0'>华中科技大学Linux协会 </Translate>
	    </a>
	    <Translate id='mirror.footer.desc5_1'>是由华中科技大学在校的Linux爱好者自发组织成立的学术科技类社团。协会旨在为Linux使用者提供一个可以有效交流学习的平台，并推广校内外自由软件的使用，营造自由软件社区的文化氛围。
              </Translate>
            </div>
            <div>
              <Translate id='mirror.footer.desc6_0'>本站的源码可在</Translate> <a href='https://github.com/hust-open-atom-club/hust-mirrors'><Translate id='mirror.footer.desc6_1'>hust-mirrors 前端网站</Translate></a> <Translate id='mirror.footer.desc6_2'>和</Translate> <a href='https://github.com/tuna/tunasync'><Translate id='mirror.footer.desc6_3'>tunasync 同步管理器</Translate></a> <Translate id='mirror.footer.desc6_4'>获取。</Translate>
            </div>
          </div>
        )}
        <div className={styles.logos}>
          <img className={styles.light} src='/img/atomclub.svg' height={80} />
          <img className={styles.dark} src='/img/atomclub-dark.svg' height={80} />
        </div>
	<div className={styles.logos}>
          <img className={styles.light} src='/img/hlug_logo.png' height={80} />
          <img className={styles.dark} src='/img/hlug_logo.png' height={80} />
        </div>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
