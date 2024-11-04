'use client';
import { MoreVert } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';

type CardMenuButtonProps = React.ComponentProps<typeof IconButton> & {
  variant?: 'dots' | 'lines';
};

/**A button with three lines.*/
export function MenuButton({ onClick, variant = 'lines' }: CardMenuButtonProps) {
  const icon = useMemo(() => {
    switch (variant) {
      default:
        return <MenuIcon sx={{ color: 'white' }} />;
    }
  }, [variant]);

  return <IconButton onClick={onClick}>{icon}</IconButton>;
}
