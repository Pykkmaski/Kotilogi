import { ErrorText } from '../Text';
import { screen, render } from '@testing-library/react';

test('The error text passes a data-testid to the element it renders.', () => {
  const { getByTestId } = render(<ErrorText data-testid='test-id'>Error</ErrorText>);
  const textElement = getByTestId('test-id');
  expect(textElement).toHaveAttribute('data-testid', 'test-id');
});
