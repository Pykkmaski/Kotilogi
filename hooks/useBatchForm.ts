import { useBatch } from './useBatch';
import { useFormOnChangeObject } from './useFormOnChangeObject';

/**Creates a batch, and and object from useFormOnChangeObject as a temporary object before insertions into the batch. */
export function useBatchForm<T>(initialBatch?: T[]) {
  const batchProps = useBatch<T>(initialBatch);
  const onChangeObjectProps = useFormOnChangeObject(initialBatch?.at(0) || ({} as T));

  const addEntry = (item: T) => {
    batchProps.addEntry(item);
    onChangeObjectProps.resetData({} as T);
  };

  const selectEntry = (id: string) => {
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
