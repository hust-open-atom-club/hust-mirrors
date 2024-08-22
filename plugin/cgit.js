// @ts-check
const fs = require('fs/promises')
const { JSDOM } = require('jsdom');
var crypto = require('crypto');
var uglify = require("uglify-js");

function getFileName(scriptStr, ext = ".js") {
  var hash = crypto.createHash('md5').update(scriptStr).digest('hex').substring(0, 8);
  return "cgit." + hash + ext;
}

/** @type {import('@docusaurus/types').Plugin} */
const fancyindexPlugin = {
  name: 'cgit-processor',
  postBuild: async (props) => {
    const dir = props.outDir + '/cgit';
    const inputFile = dir + '/index.html';

    const srcDir = `${props.siteDir}/src/pages/cgit`;
    const srcClientJsFile = `${srcDir}/_client.js`;
    const srcHeadHtmlFile = `${srcDir}/_head.html`;
    const srcCgitCssFile = `${srcDir}/_cgit.css`;

    const outputHeadFile = dir + '/head.html';
    const outputHeaderFile = dir + '/header.html';
    const outputFooterFile = dir + '/footer.html';

    let outputHead = "", outputHeader = "", outputFooter = "";


    const dom = await JSDOM.fromFile(inputFile);
    const document = dom.window.document;

    outputHead += await fs.readFile(srcHeadHtmlFile, 'utf-8');

    // get link to stylesheet in head
    document.head.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
      outputHead += el.outerHTML;
    });

    const cssCode = await fs.readFile(srcCgitCssFile, 'utf-8');
    const cssFile = getFileName(cssCode, ".css");
    outputHead += `<link rel="stylesheet" href="/cgit/${cssFile}">`;

    const nav = document.body.querySelector("nav");
    nav.querySelector(".navbar__item.dropdown.dropdown--hoverable.dropdown--right").remove();
    if (nav) {
      outputHeader += nav.outerHTML;
    }

    const footer = document.body.querySelector("footer");
    if (footer) {
      outputFooter += footer.outerHTML;
    }

    const jsCode = uglify.minify(await fs.readFile(srcClientJsFile, 'utf-8')).code;
    const jsFileName = getFileName(jsCode);

    const bodyScript = document.body.querySelector('script');

    if (bodyScript) {
      outputFooter += bodyScript.outerHTML;
    }

    outputFooter += `<script defer src="/cgit/${jsFileName}"></script>`;

    await fs.writeFile(`${dir}/${jsFileName}`, jsCode);
    await fs.writeFile(`${dir}/${cssFile}`, cssCode);
    await fs.writeFile(outputHeadFile, outputHead);
    await fs.writeFile(outputHeaderFile, outputHeader);
    await fs.writeFile(outputFooterFile, outputFooter);
    await fs.rm(inputFile);
  },
}

module.exports = () => fancyindexPlugin;
