import { useCallback, useId, useRef, useState } from 'react';

export type BatchEntryType<T> = {
  id: string;
  value: T;
};

export function useBatch<T>(initialEntries: T[] = []) {
  /**Unique id for the batch. */
  const batchId = useId();

  const nextId = useRef(0);

  /**Modifies an added item into a batch entry containing an id and the item. */
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

  /**Appends a new entry to the batch. */
  const addEntry = useCallback(
    (item: T) => {
      setEntries([...entries, createEntry(item)]);
    },
    [entries, setEntries, createEntry]
  );

  /**Removes an entry from the batch. */
  const removeEntry = useCallback(
    (id: string) => {
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

      /**A function to update the entry with. */
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
