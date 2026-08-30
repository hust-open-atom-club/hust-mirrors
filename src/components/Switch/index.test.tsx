import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Switch from './index';

describe('Switch', () => {
  it('has the correct accessible role, name, and checked state', () => {
    render(
      <Switch
        label="Enable HTTPS"
        value={true}
        onChange={vi.fn()}
      />
    );

    const switchControl = screen.getByRole('switch', {
      name: 'Enable HTTPS',
    });

    expect(switchControl).toHaveAttribute('aria-checked', 'true');
  });

  it('updates when Space is pressed once', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Switch
        label="Enable HTTPS"
        value={false}
        onChange={onChange}
      />
    );

    const switchControl = screen.getByRole('switch', {
      name: 'Enable HTTPS',
    });

    await user.click(switchControl);
    onChange.mockClear();

    switchControl.focus();
    await user.keyboard(' ');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('updates when Enter is pressed once', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Switch
        label="Enable HTTPS"
        value={false}
        onChange={onChange}
      />
    );

    const switchControl = screen.getByRole('switch', {
      name: 'Enable HTTPS',
    });

    switchControl.focus();
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('updates when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Switch
        label="Enable HTTPS"
        value={false}
        onChange={onChange}
      />
    );

    const switchControl = screen.getByRole('switch', {
      name: 'Enable HTTPS',
    });

    await user.click(switchControl);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});