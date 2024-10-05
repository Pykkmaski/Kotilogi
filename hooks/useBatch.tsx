import { useCallback, useRef, useState } from 'react';
import { useInputData } from './useInputData';

/**A hook for building components for adding multiple objects of the same type in a single batch.*/
export function useBatch<T>(initBatch?: () => any) {
  const nextId = useRef(0);
  const {
    data: currentCommit,
    updateData,
    resetData,
  } = useInputData<T & { batchId: number }>({
    batchId: nextId.current,
  } as any);

  const [entries, setEntries] = useState<(T & { batchId: number })[]>(
    (initBatch && initBatch()) || []
  );

  /**Commits the current unsaved data into the entries. */
  const commit = useCallback(() => {
    setEntries(prev => [...prev, currentCommit]);
    resetData({
      batchId: nextId.current++,
    } as any);
  }, [nextId.current, setEntries]);

  const updateEntry = useCallback(
    (batchId: number, key: string, value: any) => {
      setEntries(prev => {
        const newData = [...prev];
        const e = newData.find(d => d.batchId == batchId);
        if (e) {
          e[key] = value;
        }
        return newData;
      });
    },
    [setEntries]
  );

  const deleteEntry = useCallback(
    (entry: T) => setEntries(() => entries.filter(item => item != entry)),
    []
  );

  return {
    entries,
    /**The current unsaved data, that has yet to be committed into a batch. */
    currentCommit,
    nextId: nextId.current,
    commit,
    updateCurrentCommit: updateData,
    updateEntry,
    deleteEntry,
  };
}
