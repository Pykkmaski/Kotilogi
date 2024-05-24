'use client';

import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { theme } from 'kotilogi-app/muiTheme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';

type BottomNavProps = React.PropsWithChildren & {
  hideAboveScreenSize: 'xs' | 'sm' | 'lg';
};

export function BottomNav({ children, hideAboveScreenSize }: BottomNavProps) {
  const matchesMediaQuery = useMediaQuery(theme.breakpoints.up(hideAboveScreenSize));
  const pathname = usePathname();
  const currentPath = pathname.split('/').at(-1);

  const getHref = (children: React.ReactElement[]): string => {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    for (const child of childArray) {
      if (child.props.href) {
        return child.props.href;
      } else if (child.props.children) {
        return getHref(child.props.children);
      }
    }

    throw new Error('No href-prop present in BottomNav-child!');
  };

  if (matchesMediaQuery) {
    return null;
  } else
    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
        }}>
        <BottomNavigation
          sx={{ backgroundColor: 'black' }}
          showLabels
          value={React.Children.toArray(children).findIndex(
            (child: React.ReactElement) => getHref([child]).split('?')[0] === currentPath
          )}>
          {children}
        </BottomNavigation>
      </Paper>
    );
}

type NavActionProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function NavAction({ href, icon, label }: NavActionProps) {
  return (
    <BottomNavigationAction
      sx={{ color: 'white' }}
      component={Link}
      href={href}
      icon={icon}
      label={label}
    />
  );
}
