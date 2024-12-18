import { useBatchForm } from '@/hooks/useBatchForm';
import { useFormOnChange } from '@/hooks/useFormOnChange';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useEffect } from 'react';

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

  const {
    addEntry: addLockEntry,
    removeEntry: removeLockEntry,
    updateEntry: updateLockEntry,
    resetBatch: resetLocks,
    entries: locks,
  } = useBatchForm(initialEventData.locks, 'kotidok-event-data-locks');

  useSaveToSessionStorage(mainDataStorageKey, eventData);

  useEffect(() => {
    resetEventData({
      ...eventData,
      service_work_type_id: undefined,
    });
  }, [eventData.target_id]);

  useEffect(() => {
    resetEventData({
      ...eventData,
      target_id: undefined,
    });
  }, [eventData.event_type_id]);

  return {
    eventData,
    windows,
    locks,
    addWindowEntry,
    addLockEntry,
    removeWindowEntry,
    removeLockEntry,
    updateWindowEntry,
    updateLockEntry,
    updateEventData,
    resetWindowBatch,
    resetLocks,
    eventDataHasChanges,
    resetEventData,
    files,
    removeFile,
  };
};
