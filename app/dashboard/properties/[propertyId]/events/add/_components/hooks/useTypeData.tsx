import { useInputData } from '@/hooks/useInputData';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { useCallback } from 'react';
import { useEventFormContext } from '../EventFormContext';

const dataStorageKey = 'kotidok-event-type-data';

function initTypeData(eventData: TODO): {
  mainTypeId: number | null;
  targetId: number | null;
  workTypeId: number | null;
  surfaceId?: number;
} {
  const savedData = sessionStorage.getItem(dataStorageKey);
  if (savedData) {
    return JSON.parse(savedData);
  } else if (eventData) {
    const { mainTypeId, targetId, workTypeId } = eventData;
    return {
      mainTypeId,
      targetId,
      workTypeId,
    };
  } else {
    return {
      mainTypeId: null,
      targetId: null,
      workTypeId: null,
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
    setData: setTypeData,
    hasChanges: typeDataHasChanges,
  } = useInputData(initTypeData(eventData));

  useSaveToSessionStorage(dataStorageKey, typeData);

  const updateTypeData = useCallback(
    e => {
      switch (e.target.name) {
        case 'mainTypeId':
          {
            setTypeData({
              mainTypeId: e.target.value,
              targetId: null,
              workTypeId: null,
            });

            resetMainData({});
          }
          break;

        case 'targetId':
          {
            setTypeData({
              ...typeData,
              targetId: e.target.value,
              workTypeId: null,
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
    [setTypeData, _updateTypeData, resetMainData]
  );

  return {
    typeData,
    updateTypeData,
    typeDataHasChanges,
  };
};
