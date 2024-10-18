import { useState } from 'react';

export function useHasChanges(initialState: boolean = false) {
  const [hasChanges, setHasChanges] = useState(initialState);
  const markAsChanged = () => setHasChanges(true);
  const resetChangedStatus = () => setHasChanges(false);

  return {
    hasChanges,
    markAsChanged,
    resetChangedStatus,
  };
}
