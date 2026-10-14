import React, { useState } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SharedContext, { useSharedContext } from '../utils/SharedContext';
import WithVariables from './WithVariables';

const value = { https: true, domain: 'mirror.example.com', setHttps: vi.fn(), setDomain: vi.fn() };
const wrapper = ({ children }: React.PropsWithChildren) => <SharedContext.Provider value={value}>{children}</SharedContext.Provider>;

describe('shared variables', () => {
  it('requires a provider and returns its state', () => {
    expect(() => renderHook(useSharedContext)).toThrow('SharedContext provider is missing');
    expect(renderHook(useSharedContext, { wrapper }).result.current).toBe(value);
  });

  it('renders components with independent hook state when their number changes', async () => {
    function Counter({ http, domain }: { http: string; domain: string }) {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>{http}://{domain}: {count}</button>;
    }
    const user = userEvent.setup();
    const { rerender } = render(<WithVariables component={Counter} />, { wrapper });
    rerender(<WithVariables component={[Counter, Counter]} />);
    const buttons = screen.getAllByRole('button', { name: 'https://mirror.example.com: 0' });
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(': 1');
    expect(buttons[1]).toHaveTextContent(': 0');
  });
});
