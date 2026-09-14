import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero', () => {
  render(<App />);
  expect(screen.getByText(/full stack web developer/i)).toBeInTheDocument();
});
