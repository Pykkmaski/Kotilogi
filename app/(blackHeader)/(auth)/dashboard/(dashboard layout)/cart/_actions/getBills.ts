'use server';
import { DatabaseTable } from '@/utils/databaseTable';

export async function getBills(session, dueInMonths: number = 1) {
  const billsTable = new DatabaseTable('bills');
  const billStream = await billsTable.get({ customer: session.user.email }).stream();

  const bills = [];

  for await (const bill of billStream) {
    const dueDate = new Date(bill.due);
    const currentDate = new Date();

    if (
      dueDate.getMonth() - currentDate.getMonth() <= dueInMonths &&
      currentDate.getFullYear() >= dueDate.getFullYear()
    ) {
      bills.push(bill);
    }
  }

  return bills;
}
