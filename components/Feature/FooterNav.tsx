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
          return (
            <HighlightingNavbarProvider.Link href={child.props.href}>
              {child}
            </HighlightingNavbarProvider.Link>
          );
        })}
      </HighlightingNavbarProvider>
    </nav>
  );
}

type LinkProps = React.ComponentProps<typeof Link> & {
  selected?: boolean;
};

FooterNav.Link = function ({ children, selected, ...props }: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cn = 'text-orange-300';

    if (selected) {
      linkRef.current?.classList.add(cn);
    } else {
      linkRef.current?.classList.remove(cn);
    }
  }, [selected]);

  return (
    <Link
      {...props}
      ref={linkRef}>
      {children}
    </Link>
  );
};
