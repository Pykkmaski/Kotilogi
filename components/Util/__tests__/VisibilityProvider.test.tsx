import { VisibilityProvider } from '../VisibilityProvider';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

test('It toggles the hidden property of its target', () => {
  const vp = (
    <VisibilityProvider>
      <VisibilityProvider.Trigger>
        <button data-testid='trigger'>trigger</button>
      </VisibilityProvider.Trigger>
      <VisibilityProvider.Target>
        <div data-testid='target' />
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );

  render(vp);

  const trigger = screen.getByTestId('trigger');
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('hidden');

  fireEvent.click(trigger);

  expect(target).not.toHaveAttribute('hidden');

  fireEvent.click(trigger);

  expect(target).toHaveAttribute('hidden');
});
