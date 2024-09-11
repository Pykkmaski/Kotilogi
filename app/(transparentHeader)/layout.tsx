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
    <div className='flex flex-col bg-white h-screen'>
      <header className='absolute flex w-full items-center justify-between border-b-white border-b-[1px] py-4 px-[100px] z-[10]'>
        <h1 className='text-[36px] font-[700] text-white'>KOTIDOK</h1>
        <div className='flex items-center gap-8 text-[18px] text-white font-[600]'>
          {getLinks()}
        </div>
      </header>

      {children}
    </div>
  );
}
