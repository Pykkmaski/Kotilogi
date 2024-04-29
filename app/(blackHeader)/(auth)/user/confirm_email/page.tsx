import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { SendEmailButton } from './SendEmailButton';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';

export default async function ConfirmEmailPage() {
  const session = await getServerSession(options as any);

  return (
    <main className='flex flex-col justify-center items-center flex-1 text-slate-600 px-2'>
      <TitleWithParagraphLayout>
        <>Tilin Vahvistus</>
        <>
          Et ole vielä vahvistanut tiliäsi. Lähetimme sinulle rekisteröitymisesi yhteydessä
          vahvistuslinkin sähköpostiisi.
          <br />
          Jos et saanut vahvistusviestiä, paina Lähetä uudelleen-painiketta.
          <br />
          Vahvistamaton tili poistetaan kuukauden kuluttua.
        </>
        <>
          <SendEmailButton session={session}>Lähetä uudelleen</SendEmailButton>
        </>
      </TitleWithParagraphLayout>
    </main>
  );
}
