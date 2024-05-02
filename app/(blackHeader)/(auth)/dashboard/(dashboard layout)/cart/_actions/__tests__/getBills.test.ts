import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { getBills } from '../getBills';
import { DatabaseTable } from '@/utils/databaseTable';

const currentDate = Date.now();
const dueInTime = getDaysInMilliseconds(30);
const testBills = [
  {
    id: 'expected',
    due: currentDate + dueInTime,
  },

  {
    id: 'expected',
    due: currentDate + dueInTime,
  },

  {
    id: 'unexpected',
    due: currentDate + dueInTime * 2,
  },
];

(DatabaseTable.prototype.get as jest.Mock).mockReturnValue({
  stream: jest.fn(jest.fn().mockResolvedValue(testBills)),
});
jest.mock('@/utils/databaseTable');

test('Returns only bills that are due in no more than the specified number of days.', async () => {
  const bills = await getBills({ user: { id: 0 } }, 30);
  expect(bills.length).toBe(2);
  bills.forEach(bill => expect(bill.id).toBe('expected'));
});

test('Does not return any bills if they are outside the range.', async () => {
  const bills = await getBills({ user: { id: 0 } }, 1);
  expect(bills.length).toBe(0);
});
