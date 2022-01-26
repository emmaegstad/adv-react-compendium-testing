import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Select should click ascending and descending', async () => {
  render(<App />);
  await waitForElementToBeRemoved(await screen.findByText('Loading...'), { timeout: 5000 });

  const controls = await screen.findByRole('combobox');
  userEvent.selectOptions(controls, [screen.getByText('Ascending')]);
  expect(screen.getByRole('option', { name: 'Ascending' }).selected).toBe(true);
});
