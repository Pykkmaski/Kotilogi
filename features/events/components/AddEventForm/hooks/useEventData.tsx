import { useBatchForm } from '@/hooks/useBatchForm';
import { useFormOnChangeFiles } from '@/hooks/useFormOnChangeFiles';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { useToggleableEntries } from '@/hooks/useToggleableEntries';
import { useEffect } from 'react';

const mainDataStorageKey = 'kotidok-event-main-data';

/**Handles the main data of the event form. Should be used within the main useEventForm-hook. */
export const useEventData = (initialEventData: TODO) => {
  const {
    data: eventData,
    updateData: updateEventData,
    hasChanges: eventDataHasChanges,
    resetData: resetEventData,
  } = useFormOnChangeObject(initialEventData);

  console.log('InitialEventData before creation of payload: ', initialEventData?.data);
  const {
    data: payload,
    updateData: updatePayload,
    resetData: resetPayload,
  } = useFormOnChangeObject(initialEventData?.data || ({} as TODO));
  console.log('Payload at useEventData: ', payload);
  const { files, removeFile, updateFiles } = useFormOnChangeFiles();

  const {
    addEntry: addWindowEntry,
    removeEntry: removeWindowEntry,
    updateEntry: updateWindowEntry,
    resetBatch: resetWindowBatch,
    entries: windows,
  } = useBatchForm<TODO>(initialEventData?.data?.windows);

  const {
    addEntry: addLockEntry,
    removeEntry: removeLockEntry,
    updateEntry: updateLockEntry,
    resetBatch: resetLocks,
    entries: locks,
  } = useBatchForm<TODO>(initialEventData?.data?.locks);

  const { entries: insulation, resetBatch: resetInsulation } = useBatchForm<TODO>(
    initialEventData?.data?.insulation
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

  const updateEventType = (e: any) => {
    //Reset the current selected target upon changing event types.
    resetEventData({
      property_id: eventData.property_id,
      target_type: undefined,
    });
    updateEventData(e);
  };

  const updateEventTarget = (e: any) => {
    //Reset the payload, and other peripherals when switching targets.
    resetWindowBatch(null);
    resetInsulation(null);
    resetLocks(null);
    resetSelectedSurfaceIds();
    resetSelectedERTargetIds();
    resetPayload({});
    updateEventData(e);
  };

  return {
    /**The main event data, excluding the data payload-object.*/
    eventData,
    /**The payload for containing all detailed data about the event, like the specs of roofs, drainage ditches, maintenance_type done, etc. */
    payload,
    updatePayload,
    updateEventType,
    updateEventTarget,
    resetPayload,
    windows,
    locks,
    insulation,
    /**The selected surfaces for a cosmetic renovation event. */
    selectedSurfaceIds,
    /**The selected restoration targets for an electric restoration event. */
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
