import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { SendEmailButton } from './SendEmailButton';

export default async function ConfirmEmailPage() {
  const session = await getServerSession(options as any);

  return (
    <main className='flex flex-col justify-center items-center flex-1 text-slate-600'>
      <div className='flex justify-center gap-4'>
        <div className='flex flex-col gap-4 flex-3'>
          <h1 className='text-2xl text-slate-500 font-semibold'>Tilin Vahvistus</h1>
          <p className='text-lg'>
            Et ole vielä vahvistanut tiliäsi. Lähetimme sinulle rekisteröitymisesi yhteydessä vahvistuslinkin sähköpostiisi.
            <br />
            Jos et saanut vahvistusviestiä, paina Lähetä uudelleen-painiketta.
            <br />
            Vahvistamaton tili poistetaan kuukauden kuluttua.
          </p>

          <div className='mt-4 flex gap-4 items-center font-semibold'>
            <SendEmailButton session={session}>Lähetä uudelleen</SendEmailButton>
          </div>
        </div>
      </div>
    </main>
  );
}
