'use client';

import { useToggle } from '@/hooks/useToggle';
import { Button, ButtonProps } from '../New/Button';
import { useVisibilityProviderContext } from '../Util/VisibilityProvider';
import { useState } from 'react';
import { useToggleProviderContext } from '../Util/ToggleProvider';

type VPCloseButtonProps = ButtonProps & {
  executeAction: TODO;
};

/**A button that closes a VisibilityProvider target when an action finishes. Displays a spinner on the button automatically.*/
export const VPCloseOnActionButton = ({
  children,
  executeAction,
  ...props
}: VPCloseButtonProps) => {
  const { toggleState: toggleVPTargetVisibility } = useToggleProviderContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const loading = status == 'loading';

  return (
    <Button
      {...props}
      loading={loading}
      disabled={loading || status == 'done'}
      onClick={async () => {
        setStatus('loading');
        executeAction &&
          executeAction()
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
