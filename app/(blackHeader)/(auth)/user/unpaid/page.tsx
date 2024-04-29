import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { PaymentButton } from './PaymentButton';
import db from 'kotilogi-app/dbconfig';
import { formatNumber } from 'kotilogi-app/utils/formatNumber';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';

export default async function UnpaidCartPage() {
  const session = (await getServerSession(options as any)) as any;
  const bills = await db('carts')
    .where({ customer: session.user.email })
    .then(async ([cart]) => {
      if (!cart) {
        return [];
      }

      return await db('cartItems').where({ cartId: cart.id });
    });

  const totalBill = bills.reduce((acc, cur) => (acc += cur.amount), 0);

  return (
    <main className='flex flex-col justify-center items-center flex-1 text-slate-600'>
      <TitleWithParagraphLayout>
        <>Ostoskorisi on maksamatta</>
        <>
          Ostoskorisi on erääntynyt. Ei kuitenkaan hätää.
          <br />
          Voit jatkaa Kotidokin käyttöä heti kun olet suorittanut maksun.
        </>
        <>
          <PaymentButton>
            <span className='mx-4 font-semibold text-slate-600'>Maksa nyt</span>
          </PaymentButton>
        </>
      </TitleWithParagraphLayout>
    </main>
  );
}
