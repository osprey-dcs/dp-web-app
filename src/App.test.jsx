import App from './App';
import { render, screen } from '@testing-library/react';
import React from 'react';


describe('App', () => {
    it('renders correctly', () => {
        render(<App />);
        expect(screen.getByTestId("app")).toBeInTheDocument();
    });
})