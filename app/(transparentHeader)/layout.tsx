'use client';

import Header, { Logo2 } from '@/components/App/Header';
import { MobileMenu } from '@/components/App/MobileMenu';
import { AppHeader } from '@/components/New/AppHeader';
import { Margin } from '@/components/New/Margin';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  const { data, status } = useSession();
  const isLoggedIn = status == 'authenticated';

  const getLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <Link href='/dashboard'>Hallintapaneeli</Link>
          <Link href='/logout'>Kirjaudu Ulos</Link>
        </>
      );
    } else {
      return (
        <>
          <Link href='/login'>Kirjaudu Sisään</Link>
          <Link href='/register'>Rekisteröidy</Link>
          <Link href='/about'>Tietoa Meistä</Link>
        </>
      );
    }
  };
  return (
    <>
      <header className='flex gap-4 absolute top-0 w-full py-2 justify-start xl:items-baseline xs:items-center z-30 xl:px-64 xs:px-2 text-white font-semibold'>
        <div className='mr-4'>
          <Logo2 />
        </div>

        <div className='xs:hidden md:flex gap-4'>{getLinks()}</div>
        <div className='xs:flex xl:hidden w-full justify-end'>
          <MobileMenu session={data} />
        </div>
      </header>
      {children}
    </>
  );
}
