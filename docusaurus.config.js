// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const mirrorConfig = require('./mirrors.config');


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
  

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [require('./plugin/remark/yamlcli'), require('./plugin/remark/varcode'), require('./plugin/remark/cliAd'), ],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/hust-open-atom-club/hust-mirrors/blob/master/'
        },
        blog: {
          showReadingTime: true,
          onUntruncatedBlogPosts: 'ignore'
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
          srcDark: 'img/logo-dark.svg'
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
        additionalLanguages: ["bash", "powershell", "batch", "toml", "ini"]
      },
    }),
  plugins: [
    require('./plugin/fancyindex'),
    require('./plugin/cgit'),
    require('./plugin/news')
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  }
};

module.exports = config;
