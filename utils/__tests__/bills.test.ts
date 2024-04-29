import { bills } from '../bills';
import { DatabaseTable } from '../databaseTable';

jest.mock('../databaseTable');

describe('Testing the addBill-method.', () => {
  it('Correctly inserts the bill.', async () => {
    const testBill = {
      amount: 990,
      due: 10000,
      customer: 'test',
      targetId: 'test',
    };

    const addMock = jest.spyOn(DatabaseTable.prototype, 'add');
    await bills.addBill(testBill);
    expect(addMock).toHaveBeenCalledWith(testBill);
  });
});
