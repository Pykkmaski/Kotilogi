'use client';

import { MobileMenu } from '@/components/App/MobileMenu';
import { AppHeader } from '@/components/New/AppHeader';
import { Margin } from '@/components/New/Margin';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Header } from './Header';
import { useMediaQuery } from '@mui/material';
import { Menu } from '@/components/New/Menu';
import { HamburgerButton } from '@/components/UI/HamburgerButton';
import MenuIcon from '@mui/icons-material/Menu';

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

  const getNavElement = () => {
    const links = getLinks();
    const linkElements = links.map(({ href, text }) => <Link href={href}>{text}</Link>);

    if (window.outerWidth <= 400) {
      return (
        <nav>
          <Menu trigger={<MenuIcon sx={{ color: 'black' }} />}>{linkElements}</Menu>
        </nav>
      );
    } else {
      return (
        <nav className='2xl:text-lg xs:text-base 2xl:text-white xs:text-black font-semibold'>
          <ul className='flex 2xl:gap-8 xs:gap-4 items-center'>
            {links.map(({ href, text }) => (
              <li>
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      );
    }
  };

  return (
    <div className='flex flex-col bg-white h-screen'>
      <Header>
        <Link
          href='/'
          className='2xl:text-2xl xs:text-xl font-bold 2xl:text-white xs:text-black flex gap-2 items-baseline hover:no-underline'>
          KOTIDOK
          <small className='text-xs text-primary'>BETA</small>
        </Link>
        {getNavElement()}
      </Header>

      {children}
    </div>
  );
}
