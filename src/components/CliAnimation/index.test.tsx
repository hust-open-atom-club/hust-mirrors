import React from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import CliAnimation from './index';

vi.mock('@docusaurus/useIsBrowser', () => ({ default: () => true }));
vi.mock('@docusaurus/router', () => ({ useLocation: () => ({ search: '' }) }));

beforeAll(() => { HTMLElement.prototype.scrollTo = vi.fn(); });
beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); });

describe('CliAnimation', () => {
  it('completes an input block without text', async () => {
    const onDone = vi.fn();
    render(<CliAnimation blocks={[{}]} onDone={onDone} />);
    await act(async () => { await vi.advanceTimersByTimeAsync(5200); });
    expect(onDone).toHaveBeenCalledOnce();
  });

  it('finishes an empty animation even when replay is enabled', async () => {
    const onDone = vi.fn();
    render(<CliAnimation blocks={[]} onDone={onDone} autoReplay />);
    await act(async () => { await vi.advanceTimersByTimeAsync(10000); });
    expect(onDone).toHaveBeenCalledOnce();
  });
});
