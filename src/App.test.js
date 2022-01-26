import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

test('App should render header, input, and list of images', async () => {
  render(<App />);
  await waitForElementToBeRemoved(await screen.findByText('Loading...'), { timeout: 5000 });

  const pageTitle = screen.getByRole('heading', { name: /NASA/i });
  expect(pageTitle).toBeInTheDocument();

  const selectLabel = screen.getByLabelText(/Sort By Date/i);
  expect(selectLabel).toBeInTheDocument();

  const select = screen.getByRole('combobox', { name: /Sort By Date/i });
  expect(select).toBeInTheDocument();
});
