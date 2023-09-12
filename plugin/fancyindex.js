// @ts-check
const fs = require('fs/promises')
var crypto = require('crypto');
var uglify = require("uglify-js");

function getFileName(scriptStr) {
  var hash = crypto.createHash('md5').update(scriptStr).digest('hex').substring(0, 8);
  return "fancyindex." + hash + ".js";
}

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
    // gen script file
    const srcfile = `${props.siteDir}/src/pages/fancyindex/_client.js`;
    const srcScript = uglify.minify(await fs.readFile(srcfile, 'utf-8')).code;
    const genFilename = getFileName(srcScript);
    const filename = `${dir}/${genFilename}`;
    await fs.writeFile(filename, srcScript);
    footer = footer.replace("__REPLACE_SCRIPT__", `/fancyindex/${genFilename}`);
    // remove other script tag 
    footer = footer.replace(/<script src=".+"><\/script>/g, '');
    await fs.writeFile(outputFooter, footer);
    await fs.rm(inputFile);
  },
}

module.exports = () => fancyindexPlugin;