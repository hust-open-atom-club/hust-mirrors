//@ts-check

const githubPrefix = 'https://raw.githubusercontent.com/mirrorz-org/mirrorz-help/master/contents/'

/**
 * @param {string} doc
 * @returns {Promise<string>}
 */
async function getContent(doc) {
    const url = githubPrefix + doc + '.mdx'
    // get content from github
    console.log("Fetching content from " + url + " ...")
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Failed to fetch, status: " + response.statusText)
    }
    const content = await response.text()
    console.log("Fetching done.")

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
    if (filepath) {
        ret += "\n**修改 `" + filepath + "` 为下面的配置：**\n\n"
    }

    ret += "```" + lang + " varcode\n"
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
 */
function transformFrontmatter(content, mirrorName, orignHash) {
    const yaml = require('yaml')
    const meta = {
        title: mirrorName,
        sidebar_label: mirrorName,
        cname: mirrorName,
        slug: '/' + mirrorName,
        upstream: orignHash,
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

    const info = ":::info\n" +
        "本文档由 [MirrorZ Help](https://help.mirrors.cernet.edu.cn/) 于*" +
        dateStr +
        "*自动生成，其中可能存在失效链接，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。\n" +
        ":::\n"

    return matter + info + content;
}


async function main() {

    const arg = require('arg')
    const args = arg({
        '--local': String
    })
    const upstreamName = args._[0]
    const localName = args['--local'] || upstreamName
    if (!upstreamName) {
        console.error("Usage: node mirrorz.js <upstreamName> [--local <localName>]")
        return
    }

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

    result = transformFrontmatter(result, localName, orignHash)

    await save(result, localName)
}

main()