'use client';

import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { DialogControl } from '../Util/DialogControl';
import { useRef, useState } from 'react';
import { HamburgerButton } from '../UI/HamburgerButton';
import { ProfileCircle } from '../New/ProfileCircle';
import MenuIcon from '@mui/icons-material/Menu';

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
          <IconButton
            onClick={handleClick}
            sx={{
              color: 'black',
            }}>
            <MenuIcon sx={{ fontSize: '2rem', color: 'white' }} />
          </IconButton>
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
