/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CodeBlockWithVariables from "@site/src/components/CodeBlockWithVariables";
import {SelectItem} from "@site/src/components/Select";
import {Props as CBProps} from "@theme/CodeBlock";
type DefaultValue = boolean | string | number;

type OptionType = 'switch' | 'select';

type Option = {
  key: string,
  label: string,
  type: OptionType,
  items?: SelectItem[],
  default?: DefaultValue
}

type Variables = {
  [key: string]: any
}

type Props = {
  code: (vars: Variables) => string,
  options: Option[],
  blockProps?: CBProps
}

export default function MDXCodeBlockWithVariables(node): JSX.Element {
    let title = undefined;
    const otherMeta = node?.metastring?.split(/\s+/g).slice(1);
    for (const meta of otherMeta) {
      if(meta.startsWith("title=")){
        title = meta.split("=")[1];
        title = title.replace(/["']/g, "");
      }
    }

    /** @type {string} */
    const code = node.children;
    const lang = node.className?.split('language-')?.[1] || 'text';
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

    const idOption = Date.now();
    const idCode = Date.now() ;
    let codeStr = '',optionStr = '',blockStr = '';

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

      optionStr = `export const options_${idOption} =` + JSON.stringify(options);

    } else {
      optionStr = `export const options_${idOption} = []`;
    }

    if (codeBlock) {
      codeStr = `(function ({` +
        options.map(u => u.key).concat(['_http', '_domain']).join(",") + // destructure vars
        '}) {\n' +
        (transformBlock || "") +
        'return (\n' +
        '`' + codeBlock +
        '`);\n' +
        '})'
    }

    const params:Props = {
      code:eval(codeStr),
      options,
      blockProps: {
        ...node,
        title:JSON.stringify(title),
        language: lang,
      }
    }
    return CodeBlockWithVariables(params)
}
