import { useCallback, useState } from 'react';
import { useHasChanges } from './useHasChanges';
import { useSaveToSessionStorage } from './useSaveToSessionStorage';

function initData<T>(initialData?: T, dataKey?: string) {
  if (dataKey) {
    const savedData = sessionStorage.getItem(dataKey);
    if (savedData && savedData != 'undefined') {
      return JSON.parse(savedData) as T;
    }
  }

  return initialData || null;
}

/**Provides a data-object, and an update function to be used as the onChange-method of forms.
 * @param initialData The object to initialize the data with.
 * @param dataKey An optional key that if defined, saves the data into the session storage.
 */
export function useFormOnChangeObject<T extends {}>(initialData?: T, dataKey?: string) {
  const [data, setData] = useState(initData(initialData, dataKey));

  useSaveToSessionStorage(dataKey, data, {
    enabled: dataKey != undefined,
  });

  const { hasChanges, markAsChanged } = useHasChanges();

  const updateData = useCallback(
    (e: any) => {
      if (e.target.type == 'file') {
        throw new Error('Cannot update form data using a file!');
      }

      const value =
        e.target.type == 'number'
          ? e.target.valueAsNumber
          : e.target.type == 'checkbox'
          ? e.target.checked
          : e.target.value;

      setData((prev: TODO) => {
        if (prev) {
          return { ...prev, [e.target.name]: value };
        } else {
          return { [e.target.name]: value };
        }
      });

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
