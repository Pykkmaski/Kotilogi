'use client';

import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { DialogControl } from '../Util/DialogControl';
import { useRef, useState } from 'react';
import { HamburgerButton } from '../UI/HamburgerButton';
import { ProfileCircle } from '../New/ProfileCircle';

type MobileMenuProps = {
  session?: TODO;
};

export function MobileMenu({ session }: MobileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  return (
    <DialogControl
      trigger={({ onClick }) => {
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(e.currentTarget);
          onClick();
        };

        return !session ? (
          <Button
            sx={{
              color: 'black',
            }}
            variant='text'
            onClick={handleClick}>
            <HamburgerButton />
          </Button>
        ) : (
          <ProfileCircle
            onClick={handleClick}
            email={session.user.email}
          />
        );
      }}
      control={({ show, handleClose }) => {
        const getContent = () => {
          if (session) {
            return (
              <>
                <MenuItem onClick={handleClose}>
                  <Link href='/logout'>Kirjaudu Ulos</Link>
                </MenuItem>
              </>
            );
          } else {
            return (
              <>
                <MenuItem onClick={handleClose}>
                  <Link href='/'>Etusivulle</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Link href='/about'>Tietoa Meistä</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Link href='/register'>Rekisteröidy</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Link href='/login'>Kirjaudu Sisään</Link>
                </MenuItem>
              </>
            );
          }
        };

        return (
          <Menu
            anchorEl={anchorEl}
            open={show}
            onClose={handleClose}>
            {getContent()}
          </Menu>
        );
      }}
    />
  );
}
