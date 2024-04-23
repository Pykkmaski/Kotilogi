'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import style from './style.module.scss';
import { HighlightingNavbarProvider } from '../Util/HighlightingNavbarProvider';
import React from 'react';

type NavBarProps = React.PropsWithChildren;

export function NavBar({ children }: NavBarProps) {
  return (
    <nav className={style.navbar}>
      <HighlightingNavbarProvider>
        {React.Children.map(children as React.ReactElement, child => {
          if (child && child.props && child.props.href) {
            return (
              <HighlightingNavbarProvider.Link href={child.props.href}>
                {child}
              </HighlightingNavbarProvider.Link>
            );
          } else {
            return child;
          }
        })}
      </HighlightingNavbarProvider>
    </nav>
  );
}
