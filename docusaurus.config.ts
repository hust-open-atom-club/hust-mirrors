// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const prismThemes= require('prism-react-renderer');

const lightCodeTheme = prismThemes.themes.github;
const darkCodeTheme = prismThemes.themes.dracula;
const mirrorConfig = require('./mirrors.config');
const path = require("path");


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: mirrorConfig.title,
  favicon: 'img/favicon.png',
  // Set the production url of your site here
  url: mirrorConfig.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // beforeDefaultRemarkPlugins:[require('./plugin/remark/varcode'), require('./plugin/remark/cliAd')],
          // docItemComponent: '@theme/DocItem',
          remarkPlugins: [],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/hust-open-atom-club/hust-mirrors/blob/master/'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/hust-open-atom-club/hust-mirrors/blob/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  markdown:{
    // mermaid: true,
    format: "detect",
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: mirrorConfig.logoTitle,
        logo: {
          alt: mirrorConfig.mainTitle,
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '帮助',
          },
          {
            to: '/blog',
            label: '动态',
            position: 'left'
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/hust-open-atom-club/hust-mirrors',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `华中科技大学开源镜像站由 华中科技大学网络中心 提供支持。`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // additionalLanguages: ['shell-session', 'http'],
      },
      mermaid: {
        theme: {light: 'forest', dark: 'dark'},
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
    }),
  plugins: [
    '@docusaurus/theme-live-codeblock',
    require('./plugin/fancyindex'),
    // [
    //   'docusaurus-plugin-module-alias',
    //   {
    //     alias: {
    //       'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
    //       react: path.resolve(__dirname, './node_modules/react'),
    //       'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    //       '@components': path.resolve(__dirname, './src/components'),
    //       '@utils': path.resolve(__dirname, './src/utils'),
    //       '@src': path.resolve(__dirname, './src')
    //     },
    //   },
    // ]
  ]
};

module.exports = config;
