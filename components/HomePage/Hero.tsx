import Link from 'next/link';
import { Group } from 'kotilogi-app/components/Group';
import { PrimaryButton } from 'kotilogi-app/components/Button/PrimaryButton';
import { serviceName } from 'kotilogi-app/constants';
import Button from '../Button/Button';

export async function Hero() {
  return (
    <section className='flex flex-col gap-5 relative text-primary-text'>
      <span className='xl:text-8xl xs:text-5xl text-primary-text xs:text-center xl:text-left'>Talosi huoltokirja</span>
      <p className='text-xl mb-5 xs:text-center xl:text-left'>
        Tallenna talosi remonttitiedot, kulutustiedot, tiedostot ja kuvat kätevästi samaan paikkaan. <br />
        Unohda hukatut kuitit ja hajanaiset asiakirjat - {serviceName} tekee kodin ylläpitämisestä helpompaa ja tehokkaampaa.
      </p>

      <div className='flex flex-1 xs:justify-center lg:justify-start items-center gap-4'>
        <Link href='/register' className='shadow-lg'>
          <Button variant='secondary-filled'>
            <span className='mx-8 text-xl text-primary-text'>Kokeile Ilmaiseksi</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
