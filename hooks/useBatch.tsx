import { useCallback, useState } from 'react';

export function useBatch<T>() {
  const [entries, setEntries] = useState([]);
  const addEntry = useCallback(
    (item: T) => {
      setEntries([...entries, item]);
    },
    [entries, setEntries]
  );

  const removeEntry = useCallback(
    (predicate: (item: T) => boolean) => {
      //Flip the result, as we need to exclude elements that match the predicate.
      setEntries(entries.filter(item => !predicate(item)));
    },
    [entries, setEntries]
  );

  const updateEntry = useCallback(
    (predicate: (item: T) => boolean, action: (item: T) => void) => {
      const newEntries = [...entries];
      const itemToUpdate = newEntries.find(predicate);
      if (itemToUpdate) {
        action(itemToUpdate);
        setEntries(newEntries);
      }
    },
    [entries, setEntries]
  );

  return {
    entries,
    addEntry,
    removeEntry,
    updateEntry,
  };
}
