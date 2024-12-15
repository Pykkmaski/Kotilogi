import { useBatchForm } from '@/hooks/useBatchForm';
import { useFormOnChange } from '@/hooks/useFormOnChange';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

const mainDataStorageKey = 'kotidok-event-main-data';

function initMainData(eventData: EventPayloadType) {
  const savedData = sessionStorage.getItem(mainDataStorageKey);
  if (savedData) {
    return JSON.parse(savedData);
  }
  if (eventData) {
    const d = {
      ...eventData,
      date: eventData.date && timestampToISOString(eventData.date.getTime().toString()),
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
export const useEventData = (initialEventData: EventPayloadType) => {
  const {
    data: eventData,
    onChange: updateEventData,
    hasChanges: eventDataHasChanges,
    resetData: resetEventData,
    removeFile,
    files,
  } = useFormOnChange(initialEventData, null, 'kotidok-event-payload');

  const {
    addEntry: addWindowEntry,
    removeEntry: removeWindowEntry,
    updateEntry: updateWindowEntry,
    resetBatch: resetWindowBatch,
    entries: windows,
  } = useBatchForm(initialEventData.windows, 'kotidok-event-data-windows');

  useSaveToSessionStorage(mainDataStorageKey, eventData);

  return {
    eventData,
    windows,
    addWindowEntry,
    removeWindowEntry,
    updateWindowEntry,
    updateEventData,
    resetWindowBatch,
    eventDataHasChanges,
    resetEventData,
    files,
    removeFile,
  };
};
