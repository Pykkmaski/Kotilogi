'use client';

import { Clear } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { ReactElement, useState } from 'react';
import { useVisibilityProviderContext } from '../Util/VisibilityProvider';

type SideMenuProps = React.PropsWithChildren & {
  title: string;
  isToggled?: boolean;
  onToggle?: (state: boolean) => void;
};
/**A side-menu to be used as a VisibilityProvider target, that slides in from the right, when triggered. */
export function VPSideMenu({ children, title, isToggled, onToggle }: SideMenuProps) {
  const menuClasses = [
    'xs:flex flex-col gap-2 md:hidden fixed top-0 right-0 w-[80%] shadow-lg bg-white border-l border-l-slate-200 h-full z-40 transition-transform',
    isToggled ? 'translate-x-0' : 'translate-x-[100%]',
  ];

  return (
    <>
      <div
        id='utility-menu'
        className={menuClasses.join(' ')}>
        <div
          id='utility-menu-header'
          className='flex items-center border-b border-slate-200 mb-2'>
          <IconButton
            id='utility-menu-close-btn'
            onClick={() => onToggle(false)}>
            <Clear sx={{ color: 'black' }} />
          </IconButton>

          <span>{title}</span>
        </div>
        <div
          id='utility-menu-body'
          className='flex flex-col gap-4 px-2'>
          {children}
        </div>
      </div>
    </>
  );
}
