// @ts-check
const fs = require('fs/promises')
var crypto = require('crypto');

/** @type {import('@docusaurus/types').Plugin} */
const fancyindexPlugin = {
  name: 'news-meta',
  async allContentLoaded({ allContent, actions }) {
    const content = /** @type {import('@docusaurus/plugin-content-blog').BlogContent} */ (
      allContent['docusaurus-plugin-content-blog'].default
    );
    const d = content.blogPosts.map((t) => ({
        id: t.id,
        title: t.metadata.title,
        date: t.metadata.date,
        link: t.metadata.permalink,
      }));
    actions.setGlobalData(d);

  }
}

module.exports = () => fancyindexPlugin;
