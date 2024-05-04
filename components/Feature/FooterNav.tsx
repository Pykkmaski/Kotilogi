'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { HighlightingNavbarProvider } from '../Util/HighlightingNavbarProvider';

type FooterNavProps = React.ComponentProps<'a'>;

export function FooterNav({ children }: FooterNavProps) {
  return (
    <nav className='rounded-t-[30%] z-20 overflow-x-scroll flex-row gap-10 items-center justify-center w-full fixed bottom-0 xs:flex md:hidden left-0 bg-gray-600 py-2 text-2xl text-white'>
      <HighlightingNavbarProvider>
        {React.Children.map(children as React.ReactElement, child => {
          return <HighlightingNavbarProvider.Link>{child}</HighlightingNavbarProvider.Link>;
        })}
      </HighlightingNavbarProvider>
    </nav>
  );
}

type LinkProps = React.ComponentProps<typeof Link> & {
  selected?: boolean;
};

FooterNav.Link = function ({ children, selected, href, ...props }: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cn = 'text-orange-300';
    if (linkRef.current) {
      const classList = linkRef.current.classList;
      if (selected === true) {
        classList.add(cn);
      } else {
        classList.remove(cn);
      }
    }
  }, [selected]);

  return (
    <Link
      {...props}
      href={href}
      ref={linkRef}>
      {children}
    </Link>
  );
};
