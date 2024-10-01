'use client';

import { useCallback, useState } from 'react';

/**
 * A hook to store the data of inputs as they are changed.
 * @param initialData
 * @returns
 */
export function useInputData<T extends {}>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [files, setFiles] = useState<File[]>([]);

  /**Updates the property with the name of the event in the stored data.*/

  const updateData = useCallback((e: TODO) => {
    if (!e.target.name) return;

    if (e.target.type == 'file') {
      setFiles(prev => [...prev, ...e.target.files]);
    } else {
      setData(prev => ({
        ...prev,
        [e.target.name]:
          e.target.type === 'number'
            ? (!isNaN(e.target.valueAsNumber) && e.target.valueAsNumber) || undefined
            : e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value,
      }));
    }
  }, []);

  const updateDataViaProperty = useCallback((name: string, value: string | number) => {
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**Resets the stored data back to what was passed as the initial data. */
  const resetData = useCallback((data?: T) => {
    if (data) {
      setData(() => data);
    } else {
      setData(initialData);
    }
  }, []);

  return {
    data,
    files,
    updateData,
    setData,
    updateDataViaProperty,
    resetData,
  };
}
