// @ts-check
const fs = require('fs/promises')
var crypto = require('crypto');

/** @type {import('@docusaurus/types').Plugin} */
const fancyindexPlugin = {
  name: 'news-meta',
  async contentLoaded({ allContent, actions }) {
    const d = allContent['docusaurus-plugin-content-blog'].default
      // @ts-ignore
      .blogPosts.map((/** @type any }} */ t) => ({
        id: t.id,
        title: t.metadata.title,
        date: t.metadata.date,
        link: t.metadata.permalink,
      }));
    actions.setGlobalData(d);

  }
}

module.exports = () => fancyindexPlugin;
