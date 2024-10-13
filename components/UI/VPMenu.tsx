'use client';

import { useEffect, useState } from 'react';
import { DialogControl } from '../Util/DialogControl';
import React from 'react';
import MuiMenu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import { useVisibilityProviderContext } from '../Util/VisibilityProvider';

type MenuProps = React.PropsWithChildren & {
  isVisible?: boolean;
};

/**A reusable Menu component. It handles all the anchoring and other logic within. Renders the children inside a toggleable menu. */
export function VPMenu({ isVisible, children }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleState, trigger, updateTrigger } = useVisibilityProviderContext();

  useEffect(() => {
    if (!trigger) return;
    /*Modify the trigger so the anchor is set when it is clicked. */
    updateTrigger(
      React.cloneElement(trigger, {
        ...trigger.props,

        onClick: e => {
          setAnchorEl(e.currentTarget);
          trigger.props.onClick(e);
        },
      })
    );
  }, [trigger]);

  return (
    <MuiMenu
      anchorEl={anchorEl}
      open={isVisible}
      onClose={() => toggleState(false)}>
      {React.Children.map(children, child => child && <MenuItem>{child}</MenuItem>)}
    </MuiMenu>
  );
}
