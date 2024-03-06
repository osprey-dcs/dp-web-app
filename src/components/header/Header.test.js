import Header from './Header';
import { render } from '@testing-library/react';
import React from 'react';


describe('Header', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Header));
        expect(
            getByTestId("main-header")
        ).toBeDefined();
    });
})