'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

type FooterNavProps = React.ComponentProps<'a'>;

export function FooterNav({ children }: FooterNavProps) {
  return (
    <nav className='rounded-t-[30%] z-20 overflow-x-scroll flex-row gap-10 items-center justify-center w-full fixed bottom-0 xs:flex md:hidden left-0 bg-gray-600 py-2 text-2xl text-white'>
      {children}
    </nav>
  );
}

FooterNav.Link = function ({ children, ...props }: React.ComponentProps<typeof Link>) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const currentPath = pathname.split('/').at(-1);

  useEffect(() => {
    if (linkRef.current) {
      const href = linkRef.current.href.split('/').at(-1).split('?')[0];

      if (href === currentPath) {
        linkRef.current.classList.add('text-orange-400');
      } else {
        linkRef.current.classList.remove('text-orange-400');
      }
    }
  }, [pathname]);

  return (
    <Link {...props} ref={linkRef}>
      {children}
    </Link>
  );
};
