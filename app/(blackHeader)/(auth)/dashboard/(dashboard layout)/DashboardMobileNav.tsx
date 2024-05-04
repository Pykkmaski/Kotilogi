import { FooterNav } from '@/components/Feature/FooterNav';
import Link from 'next/link';
import { CartLink } from './_components/CartLink';
import { getServerSession } from 'next-auth';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { MobileNavLink } from './_components/MobileNavLink';

export async function DashboardMobileNav() {
  const session = (await getServerSession(options as any)) as any;
  const now = Date.now();
  const stream = await new DatabaseTable('bills').get({ customer: session.user.email }).stream();
  const t = getDaysInMilliseconds(30);

  var dueBills = 0;

  for await (const bill of stream) {
    if (parseInt(bill.due) - now <= t) {
      dueBills++;
    }
  }

  return (
    <FooterNav>
      <MobileNavLink href='/dashboard/settings'>
        <i className='fa fa-cog' />
      </MobileNavLink>

      <MobileNavLink href='/dashboard/properties'>
        <i className='fa fa-home' />
      </MobileNavLink>

      <CartLink
        href='/dashboard/cart'
        numDueBills={dueBills}
        variant='mobile'
      />
    </FooterNav>
  );
}
