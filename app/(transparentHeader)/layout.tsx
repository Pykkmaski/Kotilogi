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
      <header className='absolute flex w-full items-center justify-between lg:border-b-white xs:border-b-black border-b-[1px] py-4 lg:px-48 xs:px-4 z-[20] xs:backdrop-blur-md lg:backdrop-blur-none'>
        <Link
          href='/'
          className='lg:text-2xl xs:text-xl font-bold lg:text-white xs:text-black flex gap-2 items-baseline hover:no-underline'>
          KOTIDOK
          <small className='text-xs'>BETA</small>
        </Link>
        <nav className='lg:text-lg xs:text-base lg:text-white xs:text-black font-semibold'>
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
