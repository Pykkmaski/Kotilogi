import { useCallback, useState } from 'react';

/**A hook for building components for adding multiple objects of the same type in a single batch.*/
export function useBatch<T>() {
  const [entries, setEntries] = useState<T[]>([]);

  const addEntry = useCallback((entry: T) => setEntries(prev => [...prev, entry]), []);
  const deleteEntry = useCallback(
    (entry: T) => setEntries(() => entries.filter(item => item != entry)),
    []
  );

  return {
    entries,
    addEntry,
    deleteEntry,
  };
}
