'use client';

import Link from 'next/link';
import { ToggleProvider } from '../Util/ToggleProvider';
import React, { useMemo } from 'react';
import { VPMenu } from '../UI/VPMenu';
import { useIndexPageContext } from 'kotilogi-app/app/(wf)/(index)/IndexPageProvider';
import { usePathname } from 'next/navigation';

type MobileMenuProps = {
  session?: TODO;
  [x: string]: any;
};

export function VPMobileMenu({ session, ...props }: MobileMenuProps) {
  const pathname = usePathname();
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
        href: '/blog',
        content: 'Blogi',
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
      return loggedInLinks.map((link, i) => (
        <TriggerWithLink
          key={`vp-mobile-menu-li-link-${i}`}
          link={link}
        />
      ));
    } else {
      return loggedOutLinks.map((link, i) => (
        <TriggerWithLink
          key={`vp-mobile-menu-lo-link-${i}`}
          link={link}
        />
      ));
    }
  }, [session]);

  const ContactLink = () => {
    const { contactRef } = useIndexPageContext();

    return pathname == '/' ? (
      <button
        onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
        className='hover:underline'>
        Ota Yhteyttä
      </button>
    ) : (
      <Link href='/#contact-section'>Ota Yhteyttä</Link>
    );
  };

  return (
    <VPMenu {...props}>
      {content}
      {!pathname.includes('/dashboard') && (
        <ToggleProvider.Trigger>
          <ContactLink />
        </ToggleProvider.Trigger>
      )}
    </VPMenu>
  );
}
