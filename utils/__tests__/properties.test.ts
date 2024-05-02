import { properties } from '../properties';
import db from '@/dbconfig';
import { DatabaseTable } from '../databaseTable';
import { Files } from '../files';
import { bills } from '../bills';

jest.mock('@/dbconfig');
jest.mock('@/utils/databaseTable');
jest.mock('@/utils/files');
jest.mock('@/utils/bills');

test('Successfully inserts the data without files, and creates a bill.', async () => {
  (DatabaseTable.prototype.add as jest.Mock).mockResolvedValueOnce([{ id: 'test-id' }]);
  const addFileMock = jest.spyOn(Files.prototype, 'addFile');
  const addBillMock = jest.spyOn(bills, 'addBill');
  (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([{ email: 'customer' }]);

  await properties.addProperty({
    title: 'testProperty',
    refId: 'customer',
  } as Kotidok.PropertyType);

  expect(DatabaseTable.prototype.add).toHaveBeenCalledWith(
    expect.objectContaining({ title: 'testProperty' }),
    expect.anything()
  );

  expect(addBillMock).toHaveBeenCalledWith(
    expect.objectContaining({ amount: 990, targetId: 'test-id', customer: 'customer' }),
    expect.anything()
  );

  expect(addFileMock).not.toHaveBeenCalled();
});
