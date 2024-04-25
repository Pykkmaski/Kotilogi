import { Heading } from '@/components/UI/Heading';
import { TransferForm } from './TransferForm';
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

export default async function TransferPage({ params }) {
  const [property] = await db('properties').where({ id: params.property_id });
  const session = (await getServerSession(options as any)) as any;

  return (
    <main className='flex flex-col w-full'>
      <Heading>Siirrä Omistajuus</Heading>

      <span className='text-lg text-red-500'>Tämä toiminto ei ole vielä valmis!</span>
      <p className='text-slate-500 mt-4'>
        Luo tällä lomakkeella varmenne, jolla toinen Kotidokin käyttäjä voi siirtää talon
        omistajuuden itselleen.
        <br />
        Talon omistajuuden siirto on pysyvä, mikäli vastaanottaja käyttää varmenteen ennenkuin se
        umpeutuu.
      </p>
      <div className='mt-8 md:w-[50%]'>
        <TransferForm
          property={property}
          user={session.user}
        />
      </div>
    </main>
  );
}
