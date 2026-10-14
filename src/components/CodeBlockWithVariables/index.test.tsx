import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
