'use client';

import { IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { DialogControl } from '../Util/DialogControl';
import { useState } from 'react';
import { ProfileCircle } from '../New/ProfileCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Visibility } from '@mui/icons-material';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import React from 'react';
import { VPMenu } from '../UI/VPMenu';

type MobileMenuProps = {
  session?: TODO;
  isVisible?: boolean;
};

export function VPMobileMenu({ session, isVisible }: MobileMenuProps) {
  const getContent = () => {
    if (session) {
      return (
        <VisibilityProvider.Trigger>
          <div className='flex flex-col'>
            <MenuItem>
              <Link href='/dashboard'>Hallintapaneeli</Link>
            </MenuItem>
            <MenuItem>
              <Link href='/logout'>Kirjaudu Ulos</Link>
            </MenuItem>
          </div>
        </VisibilityProvider.Trigger>
      );
    } else {
      return (
        <VisibilityProvider.Trigger>
          <div className='flex flex-col'>
            <MenuItem>
              <Link href='/'>Etusivulle</Link>
            </MenuItem>

            <MenuItem>
              <Link href='/about'>Tietoa Meistä</Link>
            </MenuItem>

            <MenuItem>
              <Link href='/register'>Rekisteröidy</Link>
            </MenuItem>

            <MenuItem>
              <Link href='/login'>Kirjaudu Sisään</Link>
            </MenuItem>
          </div>
        </VisibilityProvider.Trigger>
      );
    }
  };

  return <VPMenu isVisible={isVisible}>{getContent()}</VPMenu>;
}
