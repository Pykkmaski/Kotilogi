import { useCallback } from 'react';

/**Returns a function that calls e.preventDefault on the received event, before calling the passed action. */
export function usePreventDefault(action: () => Promise<void>) {
  return useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      await action();
    },
    [action]
  );
}
