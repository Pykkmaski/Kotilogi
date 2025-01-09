import { useCallback, useState } from 'react';

export function useToggleableEntries(initialEntries: number[] = []) {
  const [entries, setEntries] = useState(initialEntries);
  const toggle = useCallback(
    (newEntry: number) => {
      const selected = entries.find(e => e == newEntry);
      if (selected) {
        setEntries(entries.filter(e => e != newEntry));
      } else {
        setEntries([...entries, newEntry]);
      }
    },
    [entries, setEntries]
  );

  const reset = useCallback(() => setEntries([]), [setEntries]);

  return {
    toggle,
    reset,
    entries,
  };
}
