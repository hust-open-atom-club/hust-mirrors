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
    if(files.length != 2) console.error("fancyindex: multiple or no tag found");
    await fs.writeFile(outputHeader, files[0]);
    await fs.writeFile(outputFooter, files[1]);
    await fs.rm(inputFile);
  }
}

module.exports = () => fancyindexPlugin;