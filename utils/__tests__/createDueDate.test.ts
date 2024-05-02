import { createDueDate } from '../createDueDate';

test('Returns correct date.', () => {
  const numDays = 31;
  const d = createDueDate(numDays);
  const expectedTime = 1000 * 60 * 60 * 24 * numDays + Date.now();

  /**Sometimes the expectedTime might be bigger than the due date, because of processing time fluctuations.
   * Check that the result is within an acceptable range instead.
   */
  const result = expectedTime - d;
  expect(result).toBeLessThanOrEqual(100);
});
