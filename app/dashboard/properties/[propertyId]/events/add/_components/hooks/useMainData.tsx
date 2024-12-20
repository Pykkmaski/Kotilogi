import { useFormOnChange } from '@/hooks/useFormOnChange';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

const mainDataStorageKey = 'kotidok-event-main-data';

function initMainData(eventData: TODO) {
  const savedData = sessionStorage.getItem(mainDataStorageKey);
  if (savedData) {
    return JSON.parse(savedData);
  }
  if (eventData) {
    const d = {
      ...eventData,
      date: timestampToISOString(eventData.date.getTime()),
    };

    delete d.mainTypeId;
    delete d.targetId;
    delete d.workTypeId;
    return d;
  } else {
    return {};
  }
}

/**Handles the main data of the event form. Should be used within the main useEventForm-hook. */
export const useMainData = (eventData: TODO) => {
  const {
    data: mainData,
    onChange: updateMainData,
    hasChanges: mainDataHasChanges,
    resetData: resetMainData,
    removeFile,
    files,
  } = useFormOnChange(initMainData(eventData));

  useSaveToSessionStorage(mainDataStorageKey, mainData);
  return {
    mainData,
    updateMainData,
    mainDataHasChanges,
    resetMainData,
    files,
    removeFile,
  };
};
