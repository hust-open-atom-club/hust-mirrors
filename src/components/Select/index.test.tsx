import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Select from './index';

describe('Select', () => {
  it('has an accessible name from its visible label', () => {
    render(
      <Select
        label="Select domain"
        value="example.com"
        items={[
          { value: 'example.com', label: 'example.com' },
          { value: 'mirror.example.com', label: 'mirror.example.com' },
        ]}
        onChange={vi.fn()}
      />
    );

    const select = screen.getByRole('combobox', {
      name: 'Select domain',
    });

    expect(select).toBeInTheDocument();
  });
});
