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
      date: eventData.date && timestampToISOString(eventData.date.getTime()),
    };

    delete d.event_type_id;
    delete d.target_id;
    delete d.service_work_type_id;
    return d;
  } else {
    return {};
  }
}

/**Handles the main data of the event form. Should be used within the main useEventForm-hook. */
export const useEventData = (initialEventData: TODO) => {
  const {
    data: eventData,
    onChange: updateEventData,
    hasChanges: eventDataHasChanges,
    resetData: resetEventData,
    removeFile,
    files,
  } = useFormOnChange(initMainData(initialEventData));

  useSaveToSessionStorage(mainDataStorageKey, eventData);

  console.log('event data at useEventData: ', eventData);
  return {
    eventData,
    updateEventData,
    eventDataHasChanges,
    resetEventData,
    files,
    removeFile,
  };
};
