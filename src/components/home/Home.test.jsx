import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from './Home';


describe('Home', () => {
    it('renders correctly', () => {
        render(<Home />);
        expect(screen.getByTestId("home")).toBeInTheDocument();
    });
})