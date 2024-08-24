/*
  @jest-environment node
*/
import { createDueDate } from '@/utils/createDueDate';
import { POST } from '../route';
import { verifyAuthorization } from '../../../../_utils/verifyAuthorization';
import { DatabaseTable } from '@/utils/databaseTable';
import { NextResponse } from 'next/server';

//jest.mock('@/dbconfig');
jest.mock('@/app/api/admin/_utils/verifyAuthorization');
jest.mock('@/utils/databaseTable');

describe('Testing updating of property-bills.', () => {
  var testBills = [
    {
      status: 'paid',
      due: createDueDate(30),
      stamp: 'property',
      id: 0,
    },

    {
      status: 'paid',
      due: createDueDate(200),
      stamp: 'property',
      id: 1,
    },

    {
      status: 'unpaid',
      due: createDueDate(4),
      stamp: 'property',
      id: 1,
    },
  ];

  const updateMock = jest.spyOn(DatabaseTable.prototype, 'update');
  (DatabaseTable.prototype.get as jest.Mock).mockReturnValue({
    stream: jest.fn(jest.fn().mockResolvedValue(testBills.filter(bill => bill.status === 'paid'))),
  });

  var response: NextResponse = null;

  describe('Testing scenario when the authorization fails.', () => {
    beforeEach(async () => {
      (verifyAuthorization as jest.Mock).mockReturnValueOnce(false);
      response = await POST({} as any);
    });

    it('Responds with code 401.', () => {
      expect(response.status).toBe(401);
    });
  });

  describe('Testing scenario with valid authorization.', () => {
    beforeEach(async () => {
      (verifyAuthorization as jest.Mock).mockReturnValueOnce(true);

      response = await POST({} as any);
    });

    describe('Testing updating of bill-status when the bills are due in no more than 30 days.', () => {
      it('Calls the db-updates with the correct arguments.', async () => {
        //Only one of the test bills should be due, so expect 1 call.
        expect(updateMock).toHaveBeenCalledTimes(1);

        //The test bill with the id of 0 is the one that is due.
        expect(updateMock).toHaveBeenCalledWith({ status: 'unpaid' }, { id: 0 });
      });
    });
  });
});
