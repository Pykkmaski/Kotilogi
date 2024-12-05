import { useCallback } from 'react';
import { useFormOnChangeFiles } from './useFormOnChangeFiles';
import { useFormOnChangeObject } from './useFormOnChangeObject';

/**A hook to store and update data from inputs as they are changed. */
export function useFormOnChange<T extends {}>(initialData: T, initialFiles: File[] = []) {
  const {
    data,
    updateData,
    resetData,
    hasChanges: dataHasChanges,
  } = useFormOnChangeObject(initialData);

  const {
    files,
    updateFiles,
    removeFile,
    resetFiles,
    hasChanges: filesHasChanges,
  } = useFormOnChangeFiles(initialFiles);

  const onChange = useCallback(
    (e: any) => {
      if (e.target.type == 'file') {
        updateFiles(e);
      } else {
        updateData(e);
      }
    },
    [updateData, updateFiles]
  );

  return {
    data,
    files,
    onChange,
    removeFile,
    resetData,
    resetFiles,
    hasChanges: dataHasChanges || filesHasChanges,
  };
}
