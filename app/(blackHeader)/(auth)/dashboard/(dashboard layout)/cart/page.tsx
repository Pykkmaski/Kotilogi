import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { Header } from '@/components/UI/Header/Header';
import { Heading } from '@/components/UI/Heading';
import { getServerSession } from 'next-auth';
import { UserType } from 'kotilogi-app/types/UserType';
import { Bills } from './_components/Bills';
import { Banner } from './_components/Banner';
import { getBills } from './_actions/getBills';

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
