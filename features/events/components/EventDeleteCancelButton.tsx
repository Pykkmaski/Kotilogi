'use client';

import { Button } from '@/components/New/Button';
import { ToggleProvider } from '@/components/Util/ToggleProvider';

export const EventDeleteCancelButton = () => (
  <ToggleProvider.Trigger>
    <Button
      variant='text'
      color='secondary'>
      Peruuta
    </Button>
  </ToggleProvider.Trigger>
);
