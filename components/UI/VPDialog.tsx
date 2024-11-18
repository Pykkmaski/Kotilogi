'use client';

import { Dialog, DialogProps } from '@mui/material';
import { ReactNode } from 'react';
import { ToggleProvider } from '../Util/ToggleProvider';

type VPDialogProps = Partial<DialogProps> &
  React.PropsWithChildren & {
    /**This prop is passed automatically by a VisibilityProvider.Target. Should usually be left undefined. */
    isToggled?: boolean;
    onClose?: () => void;
  };

/**A wrapper component for a Material UI Dialog. Should be used as a MUITarget for ToggleProviders.*/
export function VPDialog({ children, isToggled, onClose }: VPDialogProps) {
  return (
    <Dialog
      open={isToggled}
      onClose={onClose}>
      {children}
    </Dialog>
  );
}

type DialogPrefabProps = {
  trigger: ReactNode;
  target: ReactNode;
};

export function DialogPrefab({ trigger, target }: DialogPrefabProps) {
  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>{trigger}</ToggleProvider.Trigger>
      <ToggleProvider.MUITarget>{target}</ToggleProvider.MUITarget>
    </ToggleProvider>
  );
}
