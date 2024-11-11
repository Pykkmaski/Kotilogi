'use client';

import Link from 'next/link';
import { ToggleProvider } from '../Util/ToggleProvider';
import React, { useMemo } from 'react';
import { VPMenu } from '../UI/VPMenu';

type MobileMenuProps = {
  session?: TODO;
  [x: string]: any;
};

export function VPMobileMenu({ session, ...props }: MobileMenuProps) {
  const content = useMemo(() => {
    const loggedInLinks = [
      {
        href: '/dashboard',
        content: 'Hallintapaneeli',
      },
      {
        href: '/logout',
        content: 'Kirjaudu Ulos',
      },
    ];

    const loggedOutLinks = [
      {
        href: '/',
        content: 'Etusivulle',
      },
      {
        href: '/about',
        content: 'Tietoja Meistä',
      },
      {
        href: '/register',
        content: 'Rekisteröidy',
      },
      {
        href: '/login',
        content: 'Kirjaudu Sisään',
      },
    ];

    const TriggerWithLink = ({ link }) => (
      <ToggleProvider.Trigger>
        <Link href={link.href}>{link.content}</Link>
      </ToggleProvider.Trigger>
    );

    if (session) {
      return loggedInLinks.map(link => <TriggerWithLink link={link} />);
    } else {
      return loggedOutLinks.map(link => <TriggerWithLink link={link} />);
    }
  }, [session]);

  return <VPMenu {...props}>{content}</VPMenu>;
}
