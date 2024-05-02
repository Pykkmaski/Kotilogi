import { getDaysInMilliseconds } from '../getDaysInMilliseconds';

test('Correctly converts to milliseconds a given number of days', () => {
  const n = 10;
  const result = getDaysInMilliseconds(n);
  const expected = 1000 * 60 * 60 * 24 * n;
  expect(result).toBe(expected);
});
