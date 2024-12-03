import Header from './Header';
import { render, screen } from '@testing-library/react';
import React from 'react';


describe('Header', () => {
    it('renders correctly', () => {
        render(<Header />);
        expect(screen.getByTestId("main-header")).toHaveTextContent("Data Platform");
    });
})