'use client';

import { VisibilityProvider } from './VisibilityProvider';

type VPProps = {
  trigger: React.ReactElement;
  target: React.ReactElement;
  setTriggerAsReference?: boolean;
};

/**A prefab for constructing VisibilityProviders. */
export function VP({ trigger, target, setTriggerAsReference = false }: VPProps) {
  const Trigger = () => (
    <VisibilityProvider.Trigger setAsAnchorForMUI={setTriggerAsReference}>
      {trigger}
    </VisibilityProvider.Trigger>
  );
  const Target = () => <VisibilityProvider.Target>{target}</VisibilityProvider.Target>;

  return (
    <VisibilityProvider>
      <Trigger />
      <Target />
    </VisibilityProvider>
  );
}
