const modifyChildren = require("unist-util-modify-children");
const nid = require('nanoid');
const nanoid = nid.customAlphabet('_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 15);

/** @type {import("unified").Plugin} */
const plugin = (_) => {
  return (ast) => {
    modifyChildren((node, index, parent) => {
      if (node.type == "code" && node.meta == 'varcode') {
        /** @type {string} */
        const code = node.value;
        const lang = node.lang;
        const blocks = code.split("---\n")
        let optionBlock, transformBlock, codeBlock;
        if (blocks.length == 2) {
          optionBlock = blocks[0];
          codeBlock = blocks[1];
        }
        else if (blocks.length == 3) {
          optionBlock = blocks[0];
          transformBlock = blocks[1];
          codeBlock = blocks[2];
        }
        else {
          codeBlock = blocks[0];
        }

        const newAsts = [];
        const options = [];

        const idOption = nanoid();
        const idCode = nanoid();

        if (optionBlock) {
          const strs = optionBlock.split('\n');

          for (const str of strs) {
            const result = /^\[(.*)\]\s*\((.+?)\)\s*(\{(.*)\}\s*)?(.+)$/.exec(str);
            if (result) {
              const [_all, defValue, key, _itemGroup, items, label] = result;


              if (items) {
                const selectItems = items.split(",").map(u => {
                  const [value, label] = u.trim().split(":");
                  return { value, label };
                })
                options.push({ key, label, type: 'select', items: selectItems })
              }
              else
                options.push({ key, label, type: 'switch', default: defValue == 'x', items: items })
            }
          }

          newAsts.push({
            type: 'export',
            value: `export const options_${idOption} =` + JSON.stringify(options),
            position: node.position
          });
        }
        else{
          newAsts.push({
            type: 'export',
            value: `export const options_${idOption} = []`,
            position: node.position
          });
        }

        if (codeBlock) {
          newAsts.push({
            type: 'export',
            value: `export const code_${idCode} = ({` +
              options.map(u => u.key).concat(['_http', '_domain']).join(",") + // destructure vars
              '}) => {\n' +
              (transformBlock || "") +
              'return (\n' +
              '`' + codeBlock +
              '`);\n' +
              '}',
            position: node.position
          })
        }

        newAsts.push({
          type: "jsx",
          value: `<CodeBlockWithVariables code={code_${idCode}} options={options_${idOption}} blockProps={{language: '${lang}'}}/>`,
          position: node.position
        })

        parent.children.splice(index, 1, ...newAsts);
      }
    })(ast)

  }
}

module.exports = plugin;

