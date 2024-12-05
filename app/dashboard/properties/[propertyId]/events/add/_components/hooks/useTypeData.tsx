import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { useCallback } from 'react';
import { useEventFormContext } from '../EventFormContext';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';

const dataStorageKey = 'kotidok-event-type-data';

function initTypeData(eventData: TODO): {
  event_type_id: number | null;
  target_id: number | null;
  work_type_id: number | null;
} {
  const savedData = sessionStorage.getItem(dataStorageKey);
  if (savedData) {
    return JSON.parse(savedData);
  } else if (eventData) {
    const { event_type_id, target_id, work_type_id } = eventData;
    return {
      event_type_id,
      target_id,
      work_type_id,
    };
  } else {
    return {
      event_type_id: null,
      target_id: null,
      work_type_id: null,
    };
  }
}

/**Handles the type data of the event form. Should be used within the main useEventForm-hook. */
export const useTypeData = (
  eventData: TODO,
  resetMainData: (d: any) => void,
  resetSelectedSurfaceIds: () => void,
  resetExtraData: (d: any) => void
) => {
  const {
    data: typeData,
    updateData: _updateTypeData,
    resetData: resetTypeData,
    hasChanges: typeDataHasChanges,
  } = useFormOnChangeObject(initTypeData(eventData));

  useSaveToSessionStorage(dataStorageKey, typeData);

  const updateTypeData = useCallback(
    e => {
      switch (e.target.name) {
        case 'mainTypeId':
          {
            resetTypeData({
              event_type_id: e.target.value,
              target_id: null,
              work_type_id: null,
            });

            resetMainData({});
          }
          break;

        case 'targetId':
          {
            resetTypeData({
              ...typeData,
              target_id: e.target.value,
              work_type_id: null,
            });

            resetMainData({});
            resetSelectedSurfaceIds();
            resetExtraData({});
          }
          break;

        default:
          _updateTypeData(e);
      }
    },
    [resetTypeData, _updateTypeData, resetMainData]
  );

  return {
    typeData,
    updateTypeData,
    typeDataHasChanges,
  };
};
