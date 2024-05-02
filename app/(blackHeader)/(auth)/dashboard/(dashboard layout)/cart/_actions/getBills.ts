'use server';
import { DatabaseTable } from '@/utils/databaseTable';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { UserType } from 'kotilogi-app/types/UserType';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { getServerSession } from 'next-auth';

export async function getBills(session, dueInDays: number = 30) {
  const billsTable = new DatabaseTable('bills');
  if (dueInDays == 0) {
    return await billsTable.get({ customer: session.user.email });
  }

  const billStream = await billsTable.get({ customer: session.user.email }).stream();

  const bills = [];

  for await (const bill of billStream) {
    const dueInTime = parseInt(bill.due) - Date.now();
    const displayBillThreshold = getDaysInMilliseconds(dueInDays);

    if (dueInTime <= displayBillThreshold) {
      bills.push(bill);
    }
  }

  return bills;
}
