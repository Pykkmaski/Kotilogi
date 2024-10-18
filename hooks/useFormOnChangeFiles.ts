import { useCallback, useState } from 'react';
import { useHasChanges } from './useHasChanges';

/**Provides an array files, and an update-function to be used as a form onChange-method. */
export function useFormOnChangeFiles(initialFiles?: File[]) {
  const [files, setFiles] = useState(initialFiles || []);
  const { hasChanges, markAsChanged } = useHasChanges();

  const updateFiles = useCallback(
    (e: { target: { type: 'file'; files: File[] } }) => {
      if (e.target.type != 'file') {
        throw new Error('Only file-inputs can be used as a source for updates!');
      }

      setFiles([...files, ...e.target.files]);
      markAsChanged();
    },
    [setFiles, files, markAsChanged]
  );

  const removeFile = useCallback(
    (filename: string) => {
      setFiles(prev => prev.filter(f => f.name != filename));
    },
    [setFiles]
  );

  const resetFiles = useCallback(
    (newFiles?: File[]) => {
      if (newFiles) {
        setFiles(newFiles);
      } else {
        setFiles(initialFiles || []);
      }
    },
    [setFiles]
  );

  return {
    files,
    updateFiles,
    removeFile,
    resetFiles,
    hasChanges,
  };
}
