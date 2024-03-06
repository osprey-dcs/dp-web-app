import NavLink from './NavLink';
import { render } from '@testing-library/react';
import React from 'react';


describe('NavLink', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(React.createElement(NavLink, { text: 'test link', href: '/' }));
        expect(
            getByTestId("nav-link")
        ).toBeDefined()
    });
})