import Home from './Home';
import { render } from '@testing-library/react';
import React from 'react';


describe('Home', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(React.createElement(Home));
        expect(
            getByTestId("home")
        ).toBeDefined();
    });
})