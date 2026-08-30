import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SearchInput from './SearchInput';

function TestSearchInput() {
    const [value, setValue] = useState('');

    return (
        <SearchInput
            value={value}
            onChange={setValue}
            ariaLabel="Search mirrors"
        />
    );
}

describe('SearchInput', () => {
    it('has an accessible name independent of the placeholder', () => {
        render(
            <SearchInput
                value=""
                onChange={() => { }}
                ariaLabel="Search mirrors"
            />
        );

        const search = screen.getByRole('textbox', {
            name: 'Search mirrors',
        });

        expect(search).toBeInTheDocument();
        expect(search).toHaveAttribute(
            'placeholder',
            '按下 / 开始搜索'
        );
    });

    it('updates the search value when typing', async () => {
        const user = userEvent.setup();

        render(<TestSearchInput />);

        const search = screen.getByRole('textbox', {
            name: 'Search mirrors',
        });

        await user.type(search, 'ubuntu');

        expect(search).toHaveValue('ubuntu');
    });

    it('clears the search when Escape is pressed', async () => {
        const user = userEvent.setup();

        function EscapeTest() {
            const [value, setValue] = useState('ubuntu');

            return (
                <SearchInput
                    value={value}
                    onChange={setValue}
                    ariaLabel="Search mirrors"
                />
            );
        }

        render(<EscapeTest />);

        const search = screen.getByRole('textbox', {
            name: 'Search mirrors',
        });

        search.focus();
        await user.keyboard('{Escape}');

        expect(search).toHaveValue('');
    });
});