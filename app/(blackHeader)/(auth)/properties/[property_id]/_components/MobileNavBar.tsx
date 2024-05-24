'use client';

import { FooterNav } from '@/components/Feature/FooterNav';
import { Bolt, Event, FileCopy, Image, Info } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNavBar() {
  return (
    <FooterNav>
      <FooterNav.Link href='info'>
        <i className='fa fa-info-circle' />
      </FooterNav.Link>

      <FooterNav.Link href='events'>
        <i className='fa fa-history' />
      </FooterNav.Link>

      <FooterNav.Link href='usage?type=all'>
        <i className='fa fa-bolt' />
      </FooterNav.Link>

      <FooterNav.Link href='images'>
        <i className='fa fa-image' />
      </FooterNav.Link>

      <FooterNav.Link href='files'>
        <i className='fa fa-copy' />
      </FooterNav.Link>
    </FooterNav>
  );
}

export function MobileNavBar2() {
  const pathname = usePathname();
  const currentPath = pathname.split('/').at(-1);

  type ActionType = BottomNavigationActionProps & { path: string };

  const actions: ActionType[] = [
    {
      label: 'Tiedot',
      icon: <Info />,
      path: 'info',
    },

    {
      label: 'Tapahtumat',
      icon: <Event />,

      path: 'events',
    },

    {
      label: 'Kulutus',
      icon: <Bolt />,

      path: 'usage?type=all&year=all',
    },

    {
      label: 'Kuvat',
      icon: <Image />,

      path: 'images',
    },

    {
      label: 'Tiedostot',
      icon: <FileCopy />,

      path: 'files',
    },
  ];

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
      elevation={3}>
      <BottomNavigation
        sx={{ backgroundColor: 'black' }}
        showLabels
        value={actions.findIndex(act => act.path.split('?')[0] === currentPath)}>
        {actions.map((act, i) => (
          <BottomNavigationAction
            sx={{ color: 'white' }}
            component={Link}
            href={act.path}
            {...act}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
