import App from './App';
import { render } from '@testing-library/react';
import React from 'react';


describe('App', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(React.createElement(App));
        expect(
            getByTestId("app")
        ).toBeDefined();
    });
})