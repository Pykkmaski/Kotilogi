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

/**Handles the main data of the event form. Should be used within the main useEventForm-hook. */
export const useEventData = (initialEventData: EventPayloadType) => {
  const {
    data: eventData,
    updateData: updateEventData,
    hasChanges: eventDataHasChanges,
    resetData: resetEventData,
  } = useFormOnChangeObject(initialEventData, 'kotidok-event-payload');

  const {
    data: payload,
    updateData: updatePayload,
    resetData: resetPayload,
  } = useFormOnChangeObject(initialEventData?.data);

  const { files, removeFile, updateFiles } = useFormOnChangeFiles();

  const {
    addEntry: addWindowEntry,
    removeEntry: removeWindowEntry,
    updateEntry: updateWindowEntry,
    resetBatch: resetWindowBatch,
    entries: windows,
  } = useBatchForm(initialEventData?.data?.windows, 'kotidok-event-data-windows');

  const {
    addEntry: addLockEntry,
    removeEntry: removeLockEntry,
    updateEntry: updateLockEntry,
    resetBatch: resetLocks,
    entries: locks,
  } = useBatchForm(initialEventData?.data?.locks, 'kotidok-event-data-locks');

  const { entries: insulation, resetBatch: resetInsulation } = useBatchForm(
    initialEventData?.data?.insulation,
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
    resetPayload({});
  }, [eventData.target_type]);

  useEffect(() => {
    resetEventData({
      ...eventData,
      target_type: undefined,
    });

    resetPayload({});

    resetSelectedSurfaceIds();
    resetSelectedERTargetIds();
  }, [eventData.event_type]);

  return {
    /**The main event data, excluding the data payload-object.*/
    eventData,
    /**The payload for containing all detailed data about the event, like the specs of roofs, drainage ditches, maintenance_type done, etc. */
    payload,
    updatePayload,
    resetPayload,
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
