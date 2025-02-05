import { useBatchForm } from '@/hooks/useBatchForm';
import { useFormOnChange } from '@/hooks/useFormOnChange';
import { useFormOnChangeFiles } from '@/hooks/useFormOnChangeFiles';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { useToggleableEntries } from '@/hooks/useToggleableEntries';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useEffect, useState } from 'react';

const mainDataStorageKey = 'kotidok-event-main-data';

function initMainData(initialEventData: EventPayloadType) {
  const savedData = sessionStorage.getItem(mainDataStorageKey);
  if (savedData) {
    return JSON.parse(savedData);
  }
  if (initialEventData) {
    const d = {
      ...initialEventData,
      date:
        initialEventData.date && timestampToISOString(initialEventData.date.getTime().toString()),
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
    updateData: updateEventData,
    hasChanges: eventDataHasChanges,
    resetData: resetEventData,
  } = useFormOnChangeObject(initialEventData, 'kotidok-event-payload');

  const { files, removeFile, updateFiles } = useFormOnChangeFiles();

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

  const { entries: insulation, resetBatch: resetInsulation } = useBatchForm(
    initialEventData.insulation,
    'kotidok-event-data-insulation'
  );

  const {
    /**Currently selected cosmetic renovation target ids. */
    entries: selectedSurfaceIds,
    /**Toggles a cosmetic renovation target id. */
    toggle: toggleSurfaceId,
    /**De-selects all cosmetic renovation target ids. */
    reset: resetSelectedSurfaceIds,
  } = useToggleableEntries();

  const {
    /**Currently selected electrical restoration target ids. */
    entries: selectedERTargetIds,
    /**Toggles an electrical restoration target id. */
    toggle: toggleERTargetId,
    /**De-selects all electrical restoration target ids. */
    reset: resetSelectedERTargetIds,
  } = useToggleableEntries();

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

    resetSelectedSurfaceIds();
    resetSelectedERTargetIds();
  }, [eventData.event_type_id]);

  return {
    eventData,
    windows,
    locks,
    insulation,
    selectedSurfaceIds,
    selectedERTargetIds,
    resetSelectedSurfaceIds,
    resetSelectedERTargetIds,
    toggleSurfaceId,
    toggleERTargetId,
    resetInsulation,

    updateFiles,
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
