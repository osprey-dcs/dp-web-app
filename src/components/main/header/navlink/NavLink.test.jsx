import { render, screen } from '@testing-library/react';
import NavLink from './NavLink';
import React from 'react';


describe('NavLink', () => {
    it('renders a custom navigation link', () => {
        render(<NavLink href="/">test navlink</NavLink>);
        expect(screen.getByTestId("nav-link")).toHaveTextContent("test navlink");
        expect(screen.getByTestId("nav-link")).toHaveAttribute("href", "/");
    });
})