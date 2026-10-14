import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { fromMarkdown } = require('mdast-util-from-markdown') as typeof import('mdast-util-from-markdown');
const varcode = require('./varcode.js');

describe.each([
  ['LF', '\n'],
  ['CRLF', '\r\n'],
])('varcode with %s line endings', (_, newline) => {
  it.each([
    {
      mirror: 'crates',
      variables: { sparse: true },
      expected: 'registry = "sparse+https://mirrors.hust.edu.cn/crates.io-index/"',
      optionKeys: ['sparse'],
    },
    {
      mirror: 'deepin',
      variables: { version: 'beige', src: false },
      expected: 'deb https://mirrors.hust.edu.cn/deepin/beige beige main community commercial',
      optionKeys: ['version', 'src'],
    },
    {
      mirror: 'rustup',
      variables: { arch: 'x86_64', abi: 'msvc' },
      expected: 'Invoke-WebRequest -OutFile ${env:TEMP}/rustup-init.exe https://mirrors.hust.edu.cn/rustup/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe',
      optionKeys: ['abi', 'arch'],
    },
  ])('compiles $mirror options and commands', ({ mirror, variables, expected, optionKeys }) => {
    const source = readFileSync(`docs/${mirror}.md`, 'utf8')
      .replace(/\r\n/g, '\n').replace(/\n/g, newline);
    const ast = fromMarkdown(source);
    varcode()(ast);

    const exports = ast.children.filter((node): node is import('mdast-util-mdx').MdxjsEsm => node.type === 'mdxjsEsm');
    const evaluate = (node: import('mdast-util-mdx').MdxjsEsm) => {
      const name = node.value.match(/^export const (\w+)/)?.[1];
      expect(name).toBeDefined();
      return new Function(`${node.value.replace(/^export /, '')}; return ${name};`)();
    };

    expect(evaluate(exports[0]).map((option: { key: string }) => option.key)).toEqual(optionKeys);
    const code = evaluate(exports[1]);
    expect(code({ _http: 'https', _domain: 'mirrors.hust.edu.cn', ...variables }))
      .toContain(expected);
  });
});
