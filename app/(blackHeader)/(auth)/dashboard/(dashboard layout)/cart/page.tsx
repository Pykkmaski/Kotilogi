import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { Header } from '@/components/UI/Header/Header';
import { Heading } from '@/components/UI/Heading';
import { getServerSession } from 'next-auth';
import { UserType } from 'kotilogi-app/types/UserType';
import db from 'kotilogi-app/dbconfig';
import { Bills } from './_components/Bills';
import { Banner } from './_components/Banner';

async function getBills(session, dueInMonths: number = 1) {
  const billStream = await db('bills').where({ customer: session.user.email }).stream();
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

export default async function CartPage() {
  const session = (await getServerSession(options as any)) as { user: UserType };
  const bills = await getBills(session, 1);

  return (
    <main className='flex flex-col gap-4 mb-10'>
      <Header>
        <Heading>Erääntyvät maksut</Heading>
      </Header>
      <div className='xs:hidden lg:block'>
        <Banner variant='row' />
      </div>

      <Bills bills={bills} />

      <div className='xs:block lg:hidden'>
        <Banner variant='column' />
      </div>
    </main>
  );
}
