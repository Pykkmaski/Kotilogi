import { useEffect, useState } from 'react';

export function useToggle(initialState: boolean | (() => boolean)) {
  const [state, setState] = useState(initialState);
  const toggleState = (state?: boolean) => setState(prev => state || !prev);
  return { state, toggleState } as const;
}
