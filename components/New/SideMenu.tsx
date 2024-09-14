import { Clear } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { ReactElement, useState } from 'react';

type SideMenuProps = React.PropsWithChildren & {
  trigger: ReactElement;
  title: string;
};

export function SideMenu({ children, title, trigger }: SideMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  const menuClasses = [
    'xs:flex flex-col gap-2 md:hidden fixed top-0 right-0 w-[80%] shadow-lg bg-white border-l border-l-slate-200 h-full z-40 transition-transform',
    showMenu ? 'translate-x-0' : 'translate-x-[100%]',
  ];

  return (
    <>
      {React.cloneElement(trigger, {
        ...trigger.props,
        onClick: () => setShowMenu(true),
      })}
      <div
        id='utility-menu'
        className={menuClasses.join(' ')}>
        <div
          id='utility-menu-header'
          className='flex items-center border-b border-slate-200 mb-2'>
          <IconButton
            id='utility-menu-close-btn'
            onClick={() => setShowMenu(false)}>
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
