import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SharedContext from '../../utils/SharedContext';
import CodeBlockWithVariables from './index';

vi.mock('@theme/CodeBlock', () => ({ default: ({ children }: React.PropsWithChildren) => <pre>{children}</pre> }));

describe('CodeBlockWithVariables defaults', () => {
  it('keeps an explicit empty default and handles an empty select', () => {
    render(
      <SharedContext.Provider value={{ https: true, domain: 'mirror.example.com', setHttps: vi.fn(), setDomain: vi.fn() }}>
        <CodeBlockWithVariables
          options={[
            { key: 'choice', label: 'Choice', type: 'select', default: '', items: [{ value: 'first', label: 'First' }] },
            { key: 'empty', label: 'Empty', type: 'select', items: [] },
          ]}
          code={(vars) => JSON.stringify([vars.choice, vars.empty])}
        />
      </SharedContext.Provider>
    );
    expect(screen.getByText('["",""]')).toBeInTheDocument();
  });

  it('keeps selections by key and resets them when an option is removed or its default changes', async () => {
    const user = userEvent.setup();
    const first = { key: 'first', label: 'First', type: 'switch' as const };
    const second = { key: 'second', label: 'Second', type: 'switch' as const };
    const extra = { key: 'extra', label: 'Extra', type: 'switch' as const, default: true };
    const block = (options: React.ComponentProps<typeof CodeBlockWithVariables>['options']) => (
      <SharedContext.Provider value={{ https: true, domain: 'mirror.example.com', setHttps: vi.fn(), setDomain: vi.fn() }}>
        <CodeBlockWithVariables options={options} code={vars => JSON.stringify([vars.first, vars.second, vars.extra])} />
      </SharedContext.Provider>
    );
    const { rerender } = render(block([first, second]));

    await user.click(screen.getByRole('switch', { name: 'First' }));
    expect(screen.getByText('[true,false,null]')).toBeInTheDocument();
    rerender(block([second, first]));
    expect(screen.getByText('[true,false,null]')).toBeInTheDocument();
    rerender(block([second, first, extra]));
    expect(screen.getByText('[true,false,true]')).toBeInTheDocument();
    rerender(block([second, extra]));
    expect(screen.getByText('[null,false,true]')).toBeInTheDocument();
    rerender(block([first, second, extra]));
    expect(screen.getByText('[false,false,true]')).toBeInTheDocument();

    await user.click(screen.getByRole('switch', { name: 'First' }));
    rerender(block([{ ...first, default: true }, second, extra]));
    await user.click(screen.getByRole('switch', { name: 'First' }));
    rerender(block([first, second, extra]));
    expect(screen.getByText('[false,false,true]')).toBeInTheDocument();
    rerender(block([{ ...first, default: true }, second, extra]));
    expect(screen.getByText('[true,false,true]')).toBeInTheDocument();
  });

  it('falls back when a selected item is removed', async () => {
    const user = userEvent.setup();
    const first = { value: 'first', label: 'First' };
    const second = { value: 'second', label: 'Second' };
    const block = (items: typeof first[]) => (
      <SharedContext.Provider value={{ https: true, domain: 'mirror.example.com', setHttps: vi.fn(), setDomain: vi.fn() }}>
        <CodeBlockWithVariables
          options={[{ key: 'choice', label: 'Choice', type: 'select', items }]}
          code={vars => `choice: ${vars.choice}`}
        />
      </SharedContext.Provider>
    );
    const { rerender } = render(block([first, second]));

    await user.click(screen.getByRole('combobox', { name: 'Choice' }));
    await user.click(screen.getByRole('option', { name: 'Second' }));
    expect(screen.getByText('choice: second')).toBeInTheDocument();
    rerender(block([first]));
    expect(screen.getByText('choice: first')).toBeInTheDocument();
    rerender(block([first, second]));
    expect(screen.getByText('choice: first')).toBeInTheDocument();
  });
});
