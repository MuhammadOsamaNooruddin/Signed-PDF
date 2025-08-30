import App from "./App"
import { render, screen } from "@testing-library/react"

describe('first test', () => {
    it('should component render', () => {
        render (<App />);
        expect(true).toBeTruthy();

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Welcome to React + TypeScript + Vite');
    })
})