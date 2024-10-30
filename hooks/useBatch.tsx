import { useCallback, useId, useRef, useState } from 'react';

export type BatchEntryType<T> = {
  id: string;
  value: T;
};

export function useBatch<T>(initialEntries: T[] = []) {
  const batchId = useId();
  const nextId = useRef(0);
  const createEntry = useCallback(
    (item: T) => {
      const id = `${batchId} ${nextId.current++}`;
      const newEntry = {
        id,
        value: item,
      };
      return newEntry;
    },
    [nextId.current, batchId]
  );

  const [entries, setEntries] = useState<BatchEntryType<T>[]>(() => {
    const batch: BatchEntryType<T>[] = [];
    for (const entry of initialEntries) {
      batch.push(createEntry(entry));
    }
    return batch;
  });

  const addEntry = useCallback(
    (item: T) => {
      setEntries([...entries, createEntry(item)]);
    },
    [entries, setEntries, createEntry]
  );

  const removeEntry = useCallback(
    (id: string) => {
      //Flip the result, as we need to exclude elements that match the predicate.
      setEntries(entries.filter(item => item.id !== id));
    },
    [entries, setEntries]
  );

  const updateEntry = useCallback(
    (
      predicate: (item: BatchEntryType<T>) => boolean,
      updateFn: (valueToUpdate: BatchEntryType<T>) => void
    ) => {
      const newEntries = [...entries];
      const entry = newEntries.find(predicate);
      if (entry) {
        updateFn(entry);
        setEntries(newEntries);
      } else {
        throw new Error('Predicate did not find an element to update!');
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
