import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const cgit = require('./cgit.js');

describe('cgit postBuild', () => {
  it.each(['', '<nav>Navigation</nav>'])('handles absent navigation or a missing language selector', async (navigation) => {
    const siteDir = await mkdtemp(join(tmpdir(), 'hust-cgit-'));
    try {
      const outDir = join(siteDir, 'build');
      const srcDir = join(siteDir, 'src/pages/cgit');
      await mkdir(join(outDir, 'cgit'), { recursive: true });
      await mkdir(srcDir, { recursive: true });
      await writeFile(join(outDir, 'cgit/index.html'), `<html><body>${navigation}<footer>Footer</footer></body></html>`);
      await writeFile(join(srcDir, '_head.html'), '<meta name="fixture" content="cgit">');
      await writeFile(join(srcDir, '_cgit.css'), 'body { color: black; }');
      await writeFile(join(srcDir, '_client.js'), 'console.log("cgit");');
      await cgit().postBuild({ siteDir, outDir });
      expect(await readFile(join(outDir, 'cgit/header.html'), 'utf8')).toBe(navigation);
      expect(await readFile(join(outDir, 'cgit/footer.html'), 'utf8')).toContain('<script defer src="/cgit/cgit.');
    } finally {
      await rm(siteDir, { recursive: true, force: true });
    }
  });
});
