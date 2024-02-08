const githubPrefix = 'https://raw.githubusercontent.com/mirrorz-org/mirrorz-help/master/contents/'

/**
 * @param {string} doc
 * @returns {Promise<string>}
 */
async function getContent(doc) {
    const url = githubPrefix + doc + '.mdx'
    // get content from github
    console.log("Checking update for " + doc + " ...")
    const response = await fetch(url)
    const content = await response.text()

    return content
}

async function checkUpdates() {
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

        const content = await getContent(file.replace('.md', ''))
        // compute sha256
        const crypto = require('crypto')
        const hash = crypto.createHash('sha256')
        hash.update(content)
        const sha256 = hash.digest('hex')

        if (meta.upstream === sha256) {
            console.log(file + " is up to date.")
        } else {
            console.log(file + " is outdated.")
            update.push(file.replace('.md', ''))
            // console.log(`local sha256: ${meta.upstream}, upstream sha256: ${sha256}`)
        }
    }
    return update
}

function genMirrorz(list) {
    for (const f of list) {
        const child_process = require('child_process')
        child_process.execSync('npm run gen-mirrorz ' + f, { stdio: 'inherit' })
    }
}

async function main() {
    const result = await checkUpdates()
    if (result.length === 0) {
        console.error("No mirrorz need update.")
        return
    }
    console.log("Following need update:\n" + result.join(', '))
    const interface = require('node:readline/promises').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const answer = await interface.question('Do you want to update the mirrorz? (y/n) ');
    if (answer === 'y') {
        genMirrorz(result)
        interface.close()
    }
}

main()