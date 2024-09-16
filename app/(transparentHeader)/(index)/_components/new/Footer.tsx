import Link from 'next/link';
import { FinalCallToAction } from './FinalCallToAction';
import { Check } from '@mui/icons-material';
import React from 'react';

const Checkmark = () => {
  return (
    <div className='w-[18px] h-[18px] border-[2px] border-gray-600 flex items-center justify-center rounded-full p-4'>
      <Check />
    </div>
  );
};

const List = ({ children }) => (
  <ul className='flex flex-col gap-4 xs:items-center 2xl:items-start'>
    {React.Children.map(children, child => (
      <li>{child}</li>
    ))}
  </ul>
);

const ListHeading = ({ children }: React.PropsWithChildren) => (
  <h2 className='text-2xl tracking-[5px] mb-6 xs:text-center 3xl:text-start font-semibold'>
    {children}
  </h2>
);

export const Footer = () => {
  return (
    <footer className='relative bg-white w-full 2xl:px-36 xs:px-4 text-gray-700 pt-24 pb-72 flex 3xl:flex-row xs:flex-col-reverse 3xl:justify-evenly xs:justify-none xs:gap-20 3xl:gap-0'>
      <div className='flex flex-col flex-1'>
        <header className='w-full mb-24'>
          <h2 className='text-3xl font-semibold xs:text-center 2xl:text-start text-gray-400'>
            KOTIDOK
          </h2>
        </header>
        <div className='flex gap-40 2xl:flex-row xs:flex-col xs:justify-center 2xl:justify-start'>
          <div className='flex flex-col text-2xl gap-4 xs:items-center 2xl:items-start'>
            <ListHeading>YHTEYSTIEDOT</ListHeading>
            <List>
              <>Kotidok Oy</>
              <>Y-Tunnus: 3426507-4</>
              <>Timontie 13 Vaasa</>
              <>Puh: 0451310749</>
              <>
                <Link
                  href='mailto:kotidok.service@gmail.com'
                  className='text-primary'>
                  Ota yhteyttä sähköpostitse
                </Link>
              </>
            </List>
          </div>

          <div className='flex flex-col text-2xl gap-4 xs:items-center 3xl:items-start'>
            <ListHeading>SOMET</ListHeading>
            <List>
              <>
                <Link
                  href='https://www.instagram.com/kotidok.fi'
                  target='_blank'>
                  Instagram
                </Link>
              </>
            </List>
          </div>
        </div>
      </div>

      <div
        id='index-footer-divider'
        className='3xl:w-[1px] 3xl:h-full xs:h-[1px] xs:w-full bg-gray-300'
      />

      <div className='flex flex-col flex-1 3xl:ml-24 xs:ml-0'>
        <div className='flex flex-col gap-4 mb-8'>
          <h1 className='3xl:text-3xl xs:text-xl xs:text-center 3xl:text-start font-semibold mb-4'>
            Aloita sinäkin Kotidokin käyttö jo tänään.
          </h1>
          <div className='flex 2xl:flex-row xs:flex-col 3xl:gap-20 xs:gap-8 w-full text-xl items-center justify-center'>
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

        <div className='flex 3xl:justify-start xs:justify-center mt-4'>
          <Link href='/register'>
            <button className='text-black font-semibold shadow-md rounded-full bg-gradient-to-r from-[#E3B14B] via-[#FFE5A9] to-[#FFF07C] py-4 px-8'>
              REKISTERÖIDY
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
