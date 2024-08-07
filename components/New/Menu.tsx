'use client';

import { useState } from 'react';
import { DialogControl } from '../Util/DialogControl';
import React from 'react';
import MuiMenu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';

type MenuProps = React.PropsWithChildren & {
  trigger: React.ReactElement;
};

/**A reusable Menu component. It handles all the anchoring and other logic within. Renders the children inside a toggleable menu. */
export function Menu({ trigger, children }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <DialogControl
      trigger={({ onClick }) => {
        return React.cloneElement(trigger, {
          ...trigger.props,
          sx: {
            ...trigger.props.sx,
            ':hover': {
              cursor: 'pointer',
            },
          },

          onClick: e => {
            setAnchorEl(e.currentTarget);
            onClick(e);
          },
        });
      }}
      control={({ show, handleClose }) => {
        return (
          <MuiMenu
            anchorEl={anchorEl}
            open={show}
            onClose={handleClose}>
            {React.Children.map(children, child => (
              <MenuItem>{child}</MenuItem>
            ))}
          </MuiMenu>
        );
      }}
    />
  );
}
