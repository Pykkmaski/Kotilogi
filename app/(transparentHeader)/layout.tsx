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
        {
          href: 'about',
          text: 'Tietoa Meistä',
        },
      ];
    }
  };
  return (
    <div className='flex flex-col bg-white h-screen'>
      <header className='absolute flex w-full items-center justify-between border-b-white border-b-[1px] py-4 px-[100px] z-[10]'>
        <h1 className='text-2xl font-bold text-white'>KOTIDOK</h1>
        <nav className='text-lg text-white font-semibold'>
          <ul className='flex gap-8 items-center'>
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
