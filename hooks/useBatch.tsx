import { useCallback, useId, useRef, useState } from 'react';

export type BatchEntryType<T> = {
  id: string;
  value: T;
};

export function useBatch<T>() {
  const batchId = useId();
  const nextId = useRef(0);

  const [entries, setEntries] = useState<BatchEntryType<T>[]>([]);

  const addEntry = useCallback(
    (item: T) => {
      const id = `${batchId} ${nextId.current++}`;
      const newEntry = {
        id,
        value: item,
      };

      setEntries([...entries, newEntry]);
    },
    [entries, setEntries]
  );

  const removeEntry = useCallback(
    (predicate: (item: BatchEntryType<T>) => boolean) => {
      //Flip the result, as we need to exclude elements that match the predicate.
      setEntries(entries.filter(item => !predicate(item)));
    },
    [entries, setEntries]
  );

  const updateEntry = useCallback(
    (predicate: (item: BatchEntryType<T>) => boolean, action: (valueToUpdate: T) => T) => {
      const newEntries = [...entries];
      const itemToUpdate = newEntries.find(predicate);
      if (itemToUpdate) {
        const index = newEntries.indexOf(itemToUpdate);
        newEntries[index].value = action(itemToUpdate.value);

        setEntries(newEntries);
      } else {
        throw new Error(
          "Couldn't update batch, as an item according to the predicate was not found!"
        );
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
