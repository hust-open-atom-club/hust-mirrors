// @ts-check
const fs = require('fs/promises')

/** @type {import('@docusaurus/types').Plugin} */
const fancyindexPlugin = {
  name: 'fancyindex-processor',
  postBuild: async (props) => {
    const dir = props.outDir + '/fancyindex';
    const inputFile = dir + '/index.html';
    const outputHeader = dir + '/header.html';
    const outputFooter = dir + '/footer.html';
    const tag = "<!-- fancyindex -->";
    const content = await fs.readFile(inputFile, 'utf-8');
    const files = content.split(tag);
    if (files.length != 2) console.error("fancyindex: multiple or no tag found");
    let header = files[0];
    // remove language select
    header = header.replace(/<div class="navbar__item dropdown dropdown--hoverable dropdown--right">.+?<\/div>/, "");
    header = header.replace(/<link rel="preload".+?>/g, "");
    await fs.writeFile(outputHeader, header);
    // remove script
    let footer = files[1];
    footer = footer.replace(/<script src=".+"><\/script>/g, '');
    await fs.writeFile(outputFooter, footer);
    await fs.rm(inputFile);
  },
}

module.exports = () => fancyindexPlugin;