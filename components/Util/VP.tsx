'use client';

import { VisibilityProvider } from './VisibilityProvider';

type VPProps = {
  trigger: React.ReactElement;
  target: React.ReactElement;
  setTriggerAsReference?: boolean;
};

/**A prefab for constructing VisibilityProviders. */
export function VP({ trigger, target, setTriggerAsReference = false }: VPProps) {
  return (
    <VisibilityProvider>
      <VisibilityProvider.Trigger setAsAnchorForMUI={setTriggerAsReference}>
        {trigger}
      </VisibilityProvider.Trigger>
      <VisibilityProvider.Target>{target}</VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
