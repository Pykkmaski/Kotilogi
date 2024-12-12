import { useBatch } from './useBatch';
import { useFormOnChangeObject } from './useFormOnChangeObject';

/**Creates a batch, and and object from useFormOnChangeObject as a temporary object before insertions into the batch. */
export function useBatchForm<T>(initialBatch?: T[], dataKey?: string) {
  const batchProps = useBatch<T>(initialBatch, dataKey);
  const onChangeObjectProps = useFormOnChangeObject(initialBatch?.at(0));

  const addEntry = (item: T) => {
    batchProps.addEntry(item);
    onChangeObjectProps.resetData({} as T);
  };

  const selectEntry = (id: number) => {
    const entry = batchProps.entries.find(e => e.id == id);
    if (entry) {
      onChangeObjectProps.resetData(entry.value);
    }
  };

  return {
    ...batchProps,
    ...onChangeObjectProps,
    addEntry,
    selectEntry,
  };
}
