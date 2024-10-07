import { useInputData } from '@/hooks/useInputData';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

function initMainData(eventData: TODO) {
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
    updateData: updateMainData,
    setData: setMainData,
    hasChanges: mainDataHasChanges,
    resetData: resetMainData,
  } = useInputData(initMainData(eventData));

  return {
    mainData,
    updateMainData,
    mainDataHasChanges,
    resetMainData,
  };
};
