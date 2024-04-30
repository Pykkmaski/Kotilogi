import { getBills } from '../getBills';
import { DatabaseTable } from '@/utils/databaseTable';

const currentDate = Date.now();
const dueInMonthDate = new Date(currentDate);
dueInMonthDate.setMonth(dueInMonthDate.getMonth() + 1);

const testBills = [
  {
    id: 'expected',
    due: dueInMonthDate.getTime(),
  },

  {
    id: 'expected',
    due: dueInMonthDate.getTime(),
  },

  {
    id: 'unexpected',
    due: dueInMonthDate.getTime() * 2,
  },
];

jest.mock('@/utils/databaseTable');

test('Returns only bills that are due in no more than the specified months.', async () => {
  (DatabaseTable.prototype.get as jest.Mock).mockReturnValue({
    stream: jest.fn(jest.fn().mockResolvedValue(testBills)),
  });

  const bills = await getBills({ user: { email: 'test@email.com' } }, 1);
  expect(bills.length).toBe(2);
  bills.forEach(bill => expect(bill.id).toBe('expected'));
});
