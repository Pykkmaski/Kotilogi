import Button from '@/components/Button/Button';
import { ProPlanCard, RegularPlanCard } from '@/components/HomePage/ProfileText';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { DeleteDataButton } from './DeleteDataButton';

export default async function TrialExpredPage() {
  const session = await getServerSession(options as any);

  return (
    <main className='w-full h-full flex flex-row gap-4 items-center justify-center flex-1'>
      <div className='flex justify-center gap-4'>
        <div className='flex flex-col gap-4 flex-3'>
          <h1 className='text-2xl text-slate-500 font-semibold'>Kokeilujaksosi on päättynyt.</h1>
          <p className='text-lg'>
            Kiitämme kiinnostuksestasi Kotidok:iin. Kotidok:iin tallentamasi talotiedot säilyvät palvelussa, ellet pyydä niiden poistoa.
            <br />
            Jos haluat jatkaa palvelun käyttöä, sinun tulee aloittaa rekisteröityessäsi valitsemasi tilaus.
            <br />
          </p>

          <div className='mt-4 flex gap-4 items-center font-semibold'>
            <Link href='/checkout?cp=trial'>
              <Button variant='primary'>
                <span className='mx-8 font-semibold'>Siirry Tilaamaan</span>
              </Button>
            </Link>

            <DeleteDataButton session={session}>
              <span>Poista tiedot</span>
            </DeleteDataButton>
          </div>
        </div>
      </div>
    </main>
  );
}
