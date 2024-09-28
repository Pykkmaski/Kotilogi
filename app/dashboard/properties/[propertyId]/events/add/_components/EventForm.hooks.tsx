import { useCallback, useEffect, useState } from 'react';
import { useEventTypeContext } from './EventTypeProvider';
import { useInputData } from '@/hooks/useInputData';

export function useEventForm(eventData: TODO) {
  const { refs, getIdByLabel } = useEventTypeContext();
  /**Some work types, like a window renovation event, take extra data. Store them here. */
  const [additionalData, setAdditionalData] = useState<any[]>([]);
  const { data, updateData, resetData } = useInputData(
    eventData ||
      ({
        targetId: 'null',
        mainTypeId: 'null',
        workTypeId: 'null',
      } as TODO)
  );

  const addExtraData = useCallback(data => {
    setAdditionalData(prev => [...prev, data]);
  }, []);

  const deleteExtraData = useCallback(data => {
    setAdditionalData(prev => prev.filter(d => JSON.stringify(d) != JSON.stringify(data)));
  }, []);

  useEffect(() => {
    resetData({
      ...data,
      targetId: 'null',
      workTypeId: 'null',
    });
  }, [data.mainTypeId]);

  useEffect(() => {
    resetData({
      ...data,
      workTypeId: 'null',
    });
  }, [data.workTargetId]);

  return {
    data,
    additionalData,
    getIdByLabel,
    updateData,
    resetData,
    addExtraData,
    deleteExtraData,
    refs,
  };
}
