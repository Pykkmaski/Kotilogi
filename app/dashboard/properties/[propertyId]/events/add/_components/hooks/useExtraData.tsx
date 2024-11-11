import { useBatch } from '@/hooks/useBatch';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';

export const extraDataStorageKey = 'kotidok-event-extra-data';

const init = (initialData: any) => {
  const savedData = sessionStorage.getItem(extraDataStorageKey);
  return (savedData && JSON.parse(savedData)) || initialData || {};
};

/**Handles the extra data of the event form. Should be used within the main useEventForm-hook. */
export const useExtraData = (initialData: TODO) => {
  /**Only used for certain events, like on window-related renovations. */
  const batchProps = useBatch<any>();

  const {
    data: extraData,
    updateData: updateExtraData,
    resetData,
  } = useFormOnChangeObject(init(initialData));

  useSaveToSessionStorage(extraDataStorageKey, extraData);
  const resetExtraData = (d: any) => resetData(d);

  return {
    ...batchProps,
    extraData,
    updateExtraData,
    resetExtraData,
  };
};
