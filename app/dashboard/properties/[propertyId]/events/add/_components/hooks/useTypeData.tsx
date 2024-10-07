import { useInputData } from '@/hooks/useInputData';
import { useCallback } from 'react';

function initTypeData(eventData: TODO) {
  if (eventData) {
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
export const useTypeData = (eventData: TODO, resetMainData: (d: any) => void) => {
  const {
    data: typeData,
    updateData: _updateTypeData,
    setData: setTypeData,
    hasChanges: typeDataHasChanges,
  } = useInputData(initTypeData(eventData));

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
