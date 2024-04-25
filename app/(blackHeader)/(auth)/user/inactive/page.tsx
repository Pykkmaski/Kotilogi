import Button from '@/components/UI/Button/Button';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function TrialExpredPage() {
  const session = await getServerSession(options as any);

  return (
    <main className='w-full h-full flex flex-row gap-4 items-center justify-center flex-1'>
      <div className='flex justify-center gap-4'>
        <div className='flex flex-col gap-4 flex-3'>
          <h1 className='text-2xl text-slate-500 font-semibold'>Tilisi on poistettu käytöstä.</h1>
          <p className='text-lg'>
            Olet poistanut tilisi käytöstä. Käytöstä poistetut tilit poistetaan pysyvästi kuukauden
            kuluttua.
            <br />
            Jos muutit mielesi ja haluatkin jatkaa Kotidokin käyttöä, voit vielä aloittaa uuden
            tilauksen.
          </p>

          <div className='mt-4 flex gap-4 items-center font-semibold'>
            <Link href='/checkout'>
              <Button variant='primary'>
                <span className='mx-8 font-semibold'>Siirry Tilaamaan</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
