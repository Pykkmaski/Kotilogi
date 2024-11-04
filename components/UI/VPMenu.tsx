'use client';

import { ReactNode, useMemo } from 'react';
import React from 'react';
import MuiMenu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import { ToggleProvider } from '../Util/ToggleProvider';
import { ElementReferenceProvider } from '../Util/ElementReferenceProvider copy';

type MenuProps = React.PropsWithChildren & {
  isToggled?: boolean;
  reference?: HTMLElement;
  onClose?: () => void;
};

/**
 * A wrapper for a Material UI Menu. Should be wrapped by a ToggleProvider.MUITarget and a ElementReferenceProvider.Element.
 * @param param0
 * @returns
 */
export function VPMenu({ isToggled, reference, onClose, children }: MenuProps) {
  const content = useMemo(
    () => React.Children.map(children, child => child && <MenuItem>{child}</MenuItem>),
    [children]
  );

  return (
    <MuiMenu
      anchorEl={reference}
      open={isToggled}
      onClose={onClose}>
      {content}
    </MuiMenu>
  );
}

type MenuPrefabProps = {
  trigger: ReactNode;
  target: ReactNode;
};

/**A prefab for creating menus that are anchored to their trigger element.
 * Wraps the trigger as a MUITarget, within an ElementReferenceProvider.Element*/
export function MenuPrefab({ trigger, target }: MenuPrefabProps) {
  return (
    <ToggleProvider>
      <ElementReferenceProvider>
        <ElementReferenceProvider.Element>
          <ToggleProvider.Trigger>{trigger}</ToggleProvider.Trigger>
        </ElementReferenceProvider.Element>

        <ElementReferenceProvider.Target>
          <ToggleProvider.MUITarget>{target}</ToggleProvider.MUITarget>
        </ElementReferenceProvider.Target>
      </ElementReferenceProvider>
    </ToggleProvider>
  );
}
