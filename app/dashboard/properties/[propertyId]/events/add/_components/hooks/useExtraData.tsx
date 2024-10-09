import { useInputData } from '@/hooks/useInputData';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { useEffect } from 'react';

export const extraDataStorageKey = 'kotidok-event-extra-data';

const init = (initialData: any) => {
  const savedData = sessionStorage.getItem(extraDataStorageKey);
  return (savedData && JSON.parse(savedData)) || initialData || {};
};

/**Handles the extra data of the event form. Should be used within the main useEventForm-hook. */
export const useExtraData = (initialData: TODO) => {
  const { data: extraData, updateData: updateExtraData } = useInputData(init(initialData));
  useSaveToSessionStorage(extraDataStorageKey, extraData);

  return {
    extraData,
    updateExtraData,
  };
};
