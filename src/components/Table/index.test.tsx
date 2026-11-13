import React from 'react';
import { render, screen } from '@testing-library/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { expect, it, vi } from 'vitest';
import SharedContext from '../../utils/SharedContext';
import Table from './index';

const LocaleContext = React.createContext('zh-CN');

vi.mock('@docusaurus/useDocusaurusContext', () => ({
  default: vi.fn(() => ({ i18n: { currentLocale: React.useContext(LocaleContext) } })),
}));
vi.mock('@docusaurus/Link', () => ({ default: () => null }));
vi.mock('@docusaurus/Translate', () => ({
  default: ({ children }: React.PropsWithChildren) => children,
  translate: ({ message }: { message: string }) => message,
}));
vi.mock('@site/src/utils/mirrorUtils', () => ({ useDocMetas: () => [], useMirrorMetas: () => [] }));
vi.mock('@site/static/icons/success.svg', () => ({ default: () => null }));

type Item = React.ComponentProps<typeof Table>['items'][number];

function item(name: string, duration: number): Item {
  return {
    name,
    is_master: true,
    status: 'success',
    last_update: '',
    last_update_ts: 0,
    last_started: '',
    last_started_ts: 100,
    last_ended: '',
    last_ended_ts: 100 + duration,
    next_schedule: '',
    next_schedule_ts: 0,
    upstream: '',
    size: '',
  };
}

it('reads the table locale independently of the number of visible rows', () => {
  const table = (items: Item[], locale = 'zh-CN', search?: string) => (
    <SharedContext.Provider value={{ https: true, domain: 'mirror.example.com', setHttps: vi.fn(), setDomain: vi.fn() }}>
      <LocaleContext.Provider value={locale}>
        <Table items={items} detail search={search} />
      </LocaleContext.Provider>
    </SharedContext.Provider>
  );
  const contextHook = vi.mocked(useDocusaurusContext);
  contextHook.mockClear();
  const { rerender } = render(table([]));
  expect(screen.getAllByRole('row')).toHaveLength(1);
  expect(contextHook).toHaveBeenCalledTimes(1);

  const items = [item('alpha', 30), item('beta', 60)];
  rerender(table(items));
  expect(screen.getByRole('cell', { name: '30 秒' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '1 分钟' })).toBeInTheDocument();

  rerender(table(items, 'en', 'alpha'));
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getByRole('cell', { name: '30 seconds' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'beta' })).not.toBeInTheDocument();
});
