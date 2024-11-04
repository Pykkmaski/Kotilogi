'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Header } from './Header';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '@/components/App/Logo';
import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  const { data, status } = useSession();
  const isLoggedIn = status == 'authenticated';

  const links = useMemo(() => {
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
          href: '/tos',
          text: 'Käyttöehdot',
        },
      ];
    }
  }, [isLoggedIn]);

  const navElement = useMemo(() => {
    const linkElements = links.map(({ href, text }) => <Link href={href}>{text}</Link>);

    return (
      <nav className='2xl:text-lg xs:text-base 2xl:text-white xs:text-black font-semibold'>
        <ul className='2xl:gap-8 xs:gap-4 items-center xs:hidden md:flex'>
          {links.map(({ href, text }) => (
            <li>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>

        <div className='xs:block md:hidden'>
          {/*This is probably causing problems when logging out, when the page loads. */}
          <MenuPrefab
            trigger={<MenuIcon sx={{ color: 'black' }} />}
            target={<VPMenu>{linkElements}</VPMenu>}
          />
        </div>
      </nav>
    );
  }, [links]);

  return (
    <div className='flex flex-col bg-white h-screen'>
      <Header>
        <Logo />
        {navElement}
      </Header>

      {children}
    </div>
  );
}
