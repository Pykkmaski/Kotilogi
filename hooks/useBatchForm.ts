import { useBatch } from './useBatch';
import { useFormOnChangeObject } from './useFormOnChangeObject';

export function useBatchForm<T>(initialData: T = {} as T) {
  const batchProps = useBatch<T>();
  const onChangeObjectProps = useFormOnChangeObject(initialData);
  return {
    ...batchProps,
    ...onChangeObjectProps,
  };
}
