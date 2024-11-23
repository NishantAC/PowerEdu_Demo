import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  // Test that the App component renders a "Learn React" link
  test('renders a "Learn React" link', async () => {
    render(<App />);
    const linkElement = await screen.findByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
