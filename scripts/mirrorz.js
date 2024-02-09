#!/usr/bin/env node
//@ts-check

const githubPrefix = 'https://raw.githubusercontent.com/mirrorz-org/mirrorz-help/master/contents/'

/**
 * @param {string} doc
 * @returns {Promise<string>}
 */
async function getContent(doc) {
  const url = githubPrefix + doc + '.mdx'
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch, status: " + response.statusText)
  }
  const content = await response.text()
  return content
}


/**
 * 
 * @param {{title: string, items:any[][]}[]} menus 
 */
function generateMenu(menus, hasSudo = false) {

  let identifier = 'a'
  // TODO: only 26 menus
  function nextIdentifier() {
    identifier = String.fromCharCode(identifier.charCodeAt(0) + 1)
    return identifier
  }

  function numToIdentifier(num) {
    return String.fromCharCode(97 + num)
  }

  let bmenu = ""
  if (hasSudo) bmenu += '[ ] (root) 是否为 root 用户\n';

  if (menus) {
    for (const menu of menus) {
      bmenu += `[ ] (${identifier}) { `
      for (let i = 0; i < menu.items.length; i++) {
        const item = menu.items[i]
        bmenu += `${i}:${item[0]}`
        if (i !== menu.items.length - 1) bmenu += ', '
      }
      bmenu += ' } '
      bmenu += menu.title + '\n'
      nextIdentifier()
    }
  }

  let defination = ""
  let code = ""
  let collection = new Set()

  if (hasSudo) code += "const sudo = !root ? 'sudo ' : '';\n"

  if (menus) {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      const id = numToIdentifier(i)

      for (let j = 0; j < menu.items.length; j++) {
        const item = menu.items[j]
        const obj = item[1]

        code += `if(${id} === "${j}") { `

        for (let key in obj) {
          collection.add(key)
          code += `${key} = "${obj[key]}"; `
        }
        code += `}\n`

      }
    }
  }

  //for each collection
  for (let id of Array.from(collection)) {
    defination += `let ${id} = ""\n`
  }

  let result = ""
  result += bmenu
  result += '---\n'
  result += defination
  result += code
  result += '---\n'

  return result
}

/**
 * 
 * @param {String} raw 
 * @param {String} mirrorName
 * @returns {{content: String, lang: String, hasSudo: Boolean}}
 */
function transformContent(raw, mirrorName) {
  let lang = 'plain'
  let sudo = false

  const result = raw.split('\n').map((line) => {
    if (line.startsWith('```')) {
      const match = /```(\w+)/.exec(line)
      if (match) {
        lang = match[1]
      }
      return undefined
    }
    return line.replace(/\{\{(.+?)\}\}/g, (_, match) => {
      if (match === 'sudo') {
        sudo = true
      }
      if (match === 'http_protocol') {
        return '${_http}://'
      }
      if (match === 'mirror') {
        return '${_domain}/' + mirrorName
      }

      return `\${${match}}`
    })
  })
  let isStart = false, isEnd = false;
  const content = result.reduce((acc, line) => {
    if (line === undefined && !isStart) {
      isStart = true;
      return "";
    } else if (line === undefined && isStart && !isEnd) {
      isEnd = true;
      return acc;
    } else if (isStart && !isEnd) {
      return acc + line + '\n';
    } else {
      return acc;
    }
  }, "");

  return {
    content: content,
    lang,
    hasSudo: sudo
  }
}

/**
 * transform mirrorz tsx to hustmirror version
 * @param {String} jsxContent 
 * @param {String} mirrorName 
 * @returns {String}
 */
function transformJSX(jsxContent, mirrorName) {

  const acron = require('acorn')
  const jsx = require('acorn-jsx')
  const parser = acron.Parser.extend(jsx())
  const result = parser.parse(jsxContent, {
    ecmaVersion: 'latest',
  })
  // @ts-ignore
  const openningTag = (result.body[0]?.expression?.openingElement);
  // @ts-ignore
  const closingTag = (result.body[0]?.expression?.closingElement);

  const startIndex = openningTag.end + 1;
  const endIndex = closingTag.start;
  const rawContent = jsxContent.substring(startIndex, endIndex)
  const { content, lang, hasSudo } = transformContent(rawContent, mirrorName);

  const name = openningTag.name.name;
  let menus = undefined;
  let filepath = undefined;

  if (name === 'CodeBlock') {
    openningTag.attributes.forEach((attr) => {
      if (attr.name.name === 'menus') {
        // TODO: use safe eval
        menus = eval(jsxContent.substring(attr.value.expression.start, attr.value.expression.end))
      }
      if (attr.name.name === 'filepath') {
        filepath = attr.value.value
      }
    });
  }


  let ret = "";

  ret += "```" + lang + " varcode" + (filepath ? ` title="${filepath}"` : '') + "\n"
  ret += generateMenu(menus, hasSudo)
  ret += content
  ret += "```"

  return ret
}

async function save(content, filename) {
  const dirname = __dirname + '/../docs/'
  const fs = require('fs/promises')
  const absPath = require('path').resolve(dirname)
  await fs.mkdir(absPath, { recursive: true })

  filename = absPath + '/' + filename + '.md'
  await fs.writeFile(filename, content)
  console.log("File saved to " + filename)
}

/**
 * 
 * @param {String} content 
 * @param {String} mirrorName 
 * @param {String} orignHash 
 * @param {String} upstream 
 */
function transformFrontmatter(content, mirrorName, orignHash, upstream) {
  const yaml = require('yaml')
  const meta = {
    title: mirrorName,
    sidebar_label: mirrorName,
    cname: mirrorName,
    slug: '/' + mirrorName,
    upstream: upstream,
    upstream_sha256: orignHash,
    mirrorz: true
  }
  if (content.startsWith('---')) {
    const start = 3
    const end = content.indexOf('---', 3)

    const nmeta = yaml.parse(content.substring(start, end))
    meta.cname = nmeta.cname || meta.cname
    meta.title = nmeta.title || meta.title

    content = content.substring(end + 3)
  }


  const matter = "---\n" +
    yaml.stringify(meta) +
    "---\n"

  const dateStr = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日`

  const info = ":::tip 该文档来自MirrorZ Help\n" +
    "本文档于*" + dateStr +
    `*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/${upstream})。  \n` +
    "其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。\n" +
    ":::\n"

  return matter + info + content;
}

async function transformLink(markdown) {
  const re = /\[(.*?)\]\(\/(.*?)\)/g
  return markdown.replace(re, "[$1](/docs/$2)")
}

/**
 * Cli entry
 * @param {string} upstreamName 
 * @param {string} localName 
 * @returns Promise<void>
 */
async function mainGenerate(upstreamName, localName) {

  console.log("Processing mirrorz/" + upstreamName + " => " + localName)
  const content = await getContent(upstreamName);

  // compute the hash
  const crypto = require('crypto')
  const hash = crypto.createHash('sha256')
  hash.update(content)
  const orignHash = hash.digest('hex')

  /**
   * @type {RegExpExecArray | null}
   */
  let matchResult;
  let lastIndex = 0;
  let result = ""

  const re = /<CodeBlock[\s\S]*?>[\s\S]+?<\/CodeBlock>/mg
  while (matchResult = re.exec(content)) {
    result += content.substring(lastIndex, matchResult.index)
    lastIndex = matchResult.index + matchResult[0].length
    result += transformJSX(matchResult[0], localName)
  }

  result = transformFrontmatter(result, localName, orignHash, upstreamName)
  result = await transformLink(result)
  await save(result, localName)
}


/**
 * check updates
 * if forceUpdate is true, then update all
 * @param {boolean} forceUpdate 
 * @returns {Promise<{upsteam: string, local: string}[]>}
 */
async function checkUpdates(forceUpdate = false) {
  const path = require('path')
  const dir = path.resolve(__dirname + '/../docs')
  const fs = require('fs/promises')
  const yaml = require('yaml')
  const files = await fs.readdir(dir)
  const update = []
  const list = files.filter(f => f.endsWith('.md'))
  for (const file of list) {
    const lcontent = await fs.readFile(path.join(dir, file), 'utf-8')
    if (!lcontent.startsWith("---")) continue;
    const idx = lcontent.indexOf("---", 3)
    const meta = yaml.parse(lcontent.slice(3, idx))
    if (meta.mirrorz !== true) continue;
    const localName = file.replace('.md', '')
    const upstream = meta.upstream || localName

    if (forceUpdate) {
      update.push({
        upsteam: upstream,
        local: localName
      })
      continue
    }

    const content = await getContent(upstream)
    // compute sha256
    const crypto = require('crypto')
    const hash = crypto.createHash('sha256')
    hash.update(content)
    const sha256 = hash.digest('hex')

    if (meta.upstream_sha256 === sha256) {
      console.log(file + " is up to date.")
    } else {
      console.log(file + " is outdated.")
      update.push({
        upsteam: upstream,
        local: localName
      })
    }
  }
  return update
}

async function mainUpdate(forceUpdate = false, ignorePrompt = false) {
  const result = await checkUpdates(forceUpdate)
  if (result.length === 0) {
    console.error("No document need update.")
    return
  }
  console.log("Following need update:\n" + result.map(u => `mirrorz/${u.upsteam} => ${u.local}`).join('\n'))
  let answer = 'y'
  if (!ignorePrompt) {
    const interface = require('node:readline/promises').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    answer = await interface.question('Do you want to update the mirrorz? (y/n) ');
    interface.close()
  }

  if (answer === 'y') {
    for (const { upsteam, local } of result) {
      await mainGenerate(upsteam, local)
    }
  }
}

function main() {
  const arg = require('arg')
  const gArgs = process.argv.slice(2)
  if (gArgs[0] == 'generate') {
    const args = arg({
      '--local': String
    }, { argv: gArgs.slice(1) })
    const upstream = args._.shift()
    const local = args['--local'] || upstream

    if (!upstream) {
      console.error("Usage: yarn gen-mirrorz <upstream> [--local <local>]")
      return
    }
    mainGenerate(upstream, local)
  }
  else if (gArgs[0] == 'update') {
    const args = arg({
      '-f': Boolean,
      '-a': Boolean,
    }, { argv: gArgs.slice(1) })

    mainUpdate(args['-a'], args['-f'])
  }
  else {
    console.error("Usage: node ./scripts/mirrorz.js <generate|update>")
    console.error("  generate <upstream> [--local <local>]")
    console.error("  update [-f] [-a]")
  }
}

main()