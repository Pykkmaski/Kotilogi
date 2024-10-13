import { Dialog } from '@mui/material';
import { useVisibilityProviderContext } from '../Util/VisibilityProvider';

type VPDialogProps = React.PropsWithChildren & {
  /**This prop is passed automatically by a VisibilityProvider.Target. Should usually be left undefined. */
  isVisible?: boolean;
};

/**A wrapper component for a Material UI Dialog, to make it work with the VisibilityProvider. */
export function VPDialog({ children, isVisible }: VPDialogProps) {
  const { toggleState } = useVisibilityProviderContext();

  return (
    <Dialog
      open={isVisible}
      onClose={() => toggleState(false)}>
      {children}
    </Dialog>
  );
}
