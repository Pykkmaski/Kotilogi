'use client';

import Header, { Logo2 } from '@/components/App/Header';
import { MobileMenu } from '@/components/App/MobileMenu';
import { AppHeader } from '@/components/New/AppHeader';
import { Margin } from '@/components/New/Margin';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  const { data, status } = useSession();
  const isLoggedIn = status == 'authenticated';

  const getLinks = () => {
    if (isLoggedIn) {
      return [
        {
          href: '/dashboard',
          text: 'Hallintapaneeli',
        },

        {
          href: '/logout',
          text: 'Kirjaudu Ulos',
        },
      ];
    } else {
      return [
        {
          href: '/login',
          text: 'Kirjaudu Sisään',
        },

        {
          href: '/register',
          text: 'Rekisteröidy',
        },
      ];
    }
  };
  return (
    <div className='flex flex-col bg-white h-screen'>
      <header className='absolute flex w-full items-center justify-between border-b-white border-b-[1px] py-4 lg:px-[100px] xs:px-4 z-[10]'>
        <h1 className='lg:text-2xl xs:text-xl font-bold text-white flex gap-2 items-baseline'>
          KOTIDOK
          <small className='text-sm'>BETA</small>
        </h1>
        <nav className='lg:text-lg xs:text-base text-white font-semibold'>
          <ul className='flex lg:gap-8 xs:gap-4 items-center'>
            {getLinks().map(({ href, text }) => (
              <Link href={href}>{text}</Link>
            ))}
          </ul>
        </nav>
      </header>

      {children}
    </div>
  );
}
