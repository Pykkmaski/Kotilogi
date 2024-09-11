import Link from 'next/link';
import { FinalCallToAction } from './FinalCallToAction';
import { Check } from '@mui/icons-material';

const Checkmark = () => {
  return (
    <div className='w-[18px] h-[18px] text-white border-[2px] border-white flex items-center justify-center rounded-full p-4'>
      <Check />
    </div>
  );
};
export const Footer = () => {
  return (
    <footer className='relative bg-blue-950 w-full px-24 text-white pt-24 pb-72 flex justify-evenly'>
      <div className='flex flex-col flex-1'>
        <header className='w-full mb-24'>
          <h2 className='text-3xl font-semibold'>KOTIDOK</h2>
        </header>
        <div className='flex gap-40'>
          <div className='flex flex-col text-2xl gap-4'>
            <h3 className='text-2xl tracking-[5px] mb-6'>YHTEYSTIEDOT</h3>
            <span>Kotidok Oy</span>
            <span>Timontie 13 Vaasa</span>
          </div>

          <div className='flex flex-col text-2xl gap-4'>
            <h3 className='text-2xl tracking-[5px] mb-6'>SOMET</h3>
            <Link
              href='https://www.instagram.com/kotidok.fi'
              target='_blank'>
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className='w-[1px] h-full bg-gray-500' />

      <div className='flex flex-col flex-1 ml-24'>
        <div className='flex flex-col gap-4 mb-8'>
          <h3 className='text-3xl'>Aloita sinäkin Kotidokin käyttö jo tänään.</h3>
          <div className='flex gap-20 w-full text-xl items-center'>
            <div className='flex items-center gap-4'>
              <Checkmark /> Yhden talon tiedot.
            </div>

            <div className='flex items-center gap-4'>
              <Checkmark /> 100 Tapahtumaa.
            </div>

            <div className='flex items-center gap-4'>
              <Checkmark /> Kulutustiedot.
            </div>
          </div>
        </div>

        <div className='flex justify-start'>
          <button className='rounded-full bg-black py-4 px-8'>REKISTERÖIDY</button>
        </div>
      </div>
    </footer>
  );
};
