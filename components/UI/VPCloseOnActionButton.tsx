import { useToggle } from '@/hooks/useToggle';
import { Button, ButtonProps } from '../New/Button';
import { useVisibilityProviderContext } from '../Util/VisibilityProvider';
import { useState } from 'react';

type VPCloseButtonProps = ButtonProps & {
  action: () => Promise<void>;
};

/**A button that closes a VisibilityProvider target when an action finishes. Displays a spinner on the button automatically.*/
export const VPCloseOnActionButton = ({ children, action, ...props }: VPCloseButtonProps) => {
  const { toggleState: toggleVPTargetVisibility } = useVisibilityProviderContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const loading = status == 'loading';

  return (
    <Button
      {...props}
      loading={loading}
      disabled={loading || status == 'done'}
      onClick={async () => {
        setStatus('loading');
        action &&
          action()
            .then(() => {
              setStatus('done');
              toggleVPTargetVisibility(false);
            })
            .finally(() => setStatus(prev => (prev == 'loading' ? 'idle' : prev)));
      }}>
      {children}
    </Button>
  );
};
