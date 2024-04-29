import db from '@/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../../_utils/verifyAuthorization';
import { DatabaseTable } from '@/utils/databaseTable';

/**
 * Charges users for every property they have, that are a year old since the last time.
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const authorized = verifyAuthorization(req);
    if (!authorized) {
      return new NextResponse('Request unauthorized!', {
        status: 401,
      });
    }

    const trx = await db.transaction();

    //Stream through all bills that have a status of paid, and if they are due in 30 days or less, update their status to unpaid.
    const billsTable = new DatabaseTable('bills', trx);
    const stream = await billsTable.get({ stamp: 'property', status: 'paid' }).stream();

    const month = 1000 * 60 * 60 * 24 * 30;

    var billsUpdated = 0;

    for await (const bill of stream) {
      const dueDate = new Date(bill.due);
      const today = new Date();
      const timeUntilDue = dueDate.getTime() - today.getTime();

      if (timeUntilDue <= month) {
        await billsTable.update({ status: 'unpaid' }, { id: bill.id });
        billsUpdated++;
      }
    }

    await trx.commit();
    return new NextResponse(`Updated ${billsUpdated} bills!`, {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);

    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
