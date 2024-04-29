import { ChangeEvent } from 'react';
import { DateRangeSelector } from '../DateRangeSelector';
import { screen, render, fireEvent } from '@testing-library/react';

jest.mock('next/navigation');

const timestamps = [1, 2];

test('Sets the option to selected, that has the content of the current year-query.', () => {
  const { getByTestId } = render(
    <DateRangeSelector
      timestamps={timestamps}
      currentYear={'1'}
    />
  );

  const options = [];
  for (const stamp of timestamps) {
    options.push(getByTestId(`option-${stamp}`));
  }

  expect(options.length).toBe(timestamps.length);

  const selectedOption = getByTestId(`option-1`);
  expect(selectedOption).toHaveAttribute('selected');
  const unselectedOption = getByTestId('option-2');
  expect(unselectedOption).not.toHaveAttribute('selected');
});
