import { useCallback, useId, useRef, useState, useTransition } from 'react';
import { useSaveToSessionStorage } from './useSaveToSessionStorage';

function getInitialEntries<T>(initialEntries: T[], dataKey?: string) {
  if (dataKey) {
    const savedEntries = sessionStorage.getItem(dataKey);
    if (savedEntries && savedEntries != 'undefined') {
      return JSON.parse(savedEntries);
    }
  }

  return initialEntries || [];
}

export type BatchEntryType<T> = {
  id: number;
  value: T;
};

export function useBatch<T>(initialEntries: T[] = [], dataKey?: string) {
  const nextId = useRef(0);

  /**Modifies an added item into a batch entry containing an id and the item. */
  const createEntry = useCallback(
    (item: T) => {
      const id = nextId.current++;
      const newEntry = {
        id,
        value: item,
      };
      return newEntry;
    },
    [nextId.current]
  );

  const [entries, setEntries] = useState<BatchEntryType<T>[]>(() => {
    const batch: BatchEntryType<T>[] = [];
    const ie = getInitialEntries(initialEntries, dataKey);
    for (const entry of ie) {
      batch.push(createEntry(entry));
    }
    return batch;
  });

  useSaveToSessionStorage(
    dataKey,
    entries.map(e => e.value),
    { enabled: !!dataKey }
  );

  /**Appends a new entry to the batch. */
  const addEntry = useCallback(
    (item: T) => {
      setEntries([...entries, createEntry(item)]);
    },
    [entries, setEntries, createEntry]
  );

  /**Removes an entry from the batch. */
  const removeEntry = useCallback(
    (id: number) => {
      //Flip the result, as we need to exclude elements that match the predicate.
      setEntries(entries.filter(item => item.id !== id));
    },
    [entries, setEntries]
  );

  /**Updates an entry in the batch. */
  const updateEntry = useCallback(
    (
      /**A function by which to search for the entry to be updated. */
      predicate: (item: BatchEntryType<T>) => boolean,
      updatedValue: T
    ) => {
      setEntries(prev => {
        console.log('entries before update: ', prev);
        const newEntries = prev.map(item => {
          if (predicate(item)) {
            const newValue =
              typeof updatedValue == 'object'
                ? {
                    ...item.value,
                    ...updatedValue,
                  }
                : updatedValue;

            const updatedEntry = {
              ...item,
              value: newValue,
            };

            return updatedEntry;
          }
          return item;
        });

        console.log('New batch entries before updating: ', newEntries);
        return newEntries;
      });
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
