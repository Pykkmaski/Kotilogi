import { useCallback, useState } from 'react';
import { useHasChanges } from './useHasChanges';

/**Provides a data-object, and an update function to be used as the onChange-method of forms.
 * @param initialData The object to initialize the data with.
 */
export function useFormOnChangeObject<T extends {}>(initialData?: T) {
  const [data, setData] = useState(initialData || ({} as T));
  const { hasChanges, markAsChanged } = useHasChanges();

  const updateData = useCallback(
    (e: any) => {
      if (e.target.type == 'file') {
        throw new Error('Cannot update form data using a file!');
      }

      setData({ ...data, [e.target.name]: e.target.value });
      markAsChanged();
    },
    [setData, markAsChanged, data]
  );

  const resetData = useCallback(
    (data?: T) => {
      if (data) {
        setData(data);
      } else {
        setData(initialData || ({} as T));
      }
    },
    [setData, initialData]
  );

  return {
    data,
    updateData,
    resetData,
    hasChanges,
  };
}
