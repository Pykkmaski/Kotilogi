import { PassProps } from '../PassProps';
import { render, screen } from '@testing-library/react';
describe('Testing PassProps', () => {
  const testId = 'pass-props-test-child';
  const child = (
    <div
      data-testid='pass-props-test-child'
      className='test-class'>
      Child
    </div>
  );
  const testPropValue = 'test-name';

  beforeEach(() => {
    render(<PassProps name={testPropValue}>{child}</PassProps>);
  });

  it('Passes all of the provided props to its children.', () => {
    const childElement = screen.getByTestId(testId);
    expect(childElement).toHaveAttribute('name', testPropValue);
  });

  test('The child retains its own props', () => {
    const childElement = screen.getByTestId(testId);
    expect(childElement).toHaveAttribute('class', 'test-class');
  });
});
