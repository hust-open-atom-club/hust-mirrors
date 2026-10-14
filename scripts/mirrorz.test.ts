import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { transformContent, transformJSX } = require('./mirrorz.js') as typeof import('./mirrorz.js');

describe('MirrorZ transformations', () => {
  it('extracts only the fenced code and expands mirror variables', () => {
    expect(transformContent('before\n```sh\n{{sudo}}curl {{http_protocol}}{{mirror}}/file\n```\nafter', 'ubuntu'))
      .toEqual({ content: '${sudo}curl ${_http}://${_domain}/ubuntu/file\n', lang: 'sh', hasSudo: true });
    expect(transformContent('no fenced code', 'ubuntu').content).toBe('');
  });

  it('generates menus and a filename from a CodeBlock', () => {
    const output = transformJSX('<CodeBlock filepath="sources.list" menus={[{title:"Version",items:[["Noble",{version:"noble"}]]}]}>' +
      '\n```sh\n{{version}} {{mirror}}\n```\n</CodeBlock>', 'ubuntu');
    expect(output).toContain('```sh varcode title="sources.list"');
    expect(output).toContain('[ ] (a) { 0:Noble } Version');
    expect(output).toContain('version = "noble"');
    expect(output).toContain('${version} ${_domain}/ubuntu');
  });

  it.each(['menus="invalid"', 'filepath={false}'])('rejects invalid attributes: %s', (attribute) => {
    expect(() => transformJSX(`<CodeBlock ${attribute}>\ncode\n</CodeBlock>`, 'ubuntu')).toThrow(/CodeBlock/);
  });
});
