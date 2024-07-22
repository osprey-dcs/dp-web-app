import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import PopoverMenu from './PopoverMenu';

describe('PopoverMenu', () => {
    it('renders correctly', async () => {
        render(<PopoverMenu />);
        await act(async () => { });

        expect(screen.getByTestId("popover-menu-container")).toBeInTheDocument();
        expect(screen.getByTestId("popover-menu-container").children.length).toBe(1);
    });

    it('shows menu on button click', async () => {
        render(<PopoverMenu />);
        await act(async () => { });

        fireEvent.click(screen.getByTestId("popover-menu-trigger"));
        expect(screen.getByTestId("popover-menu")).toBeInTheDocument();
    })

    it('changes active link on link click', async () => {
        render(<PopoverMenu />);
        await act(async () => { });

        fireEvent.click(screen.getByTestId("popover-menu-trigger"));
        fireEvent.click(screen.getAllByTestId("popover-nav-link")[1]);
        expect(screen.getAllByTestId("popover-nav-link")[1]).toHaveClass("text-foreground");
    })
})