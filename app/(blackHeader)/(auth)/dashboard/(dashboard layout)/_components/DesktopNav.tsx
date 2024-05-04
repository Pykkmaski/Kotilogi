import IconLink from '@/components/UI/IconLink';
import { NavBar } from '@/components/UI/NavBar';
import { CartLink } from './CartLink';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';

export async function DesktopNav() {
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
    <nav className='text-white flex flex-col gap-2'>
      <NavBar>
        <IconLink
          imageSrc='/icons/house.png'
          icon='fa-home'
          href='/dashboard/properties'>
          Talot
        </IconLink>
        <IconLink
          imageSrc='/icons/settings.png'
          icon='fa-cog'
          href='/dashboard/settings'>
          Asetukset
        </IconLink>
        <CartLink
          numDueBills={dueBills}
          href='/dashboard/cart'
        />
      </NavBar>
    </nav>
  );
}
