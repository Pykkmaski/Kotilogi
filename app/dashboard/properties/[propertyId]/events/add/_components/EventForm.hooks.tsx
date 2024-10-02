import { useCallback, useEffect, useReducer, useState } from 'react';
import { useEventTypeContext } from './EventTypeProvider';
import { useInputData } from '@/hooks/useInputData';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useRouter } from 'next/navigation';

function initInputData(eventData: TODO) {
  return (
    (eventData && {
      ...eventData,
      date: timestampToISOString(eventData.date.getTime()),
      targetId: eventData.targetId == null ? -1 : eventData.targetId,
      workTypeId: eventData.workTypeId == null ? -1 : eventData.workTypeId,
    }) ||
    ({} as TODO)
  );
}

export function useEventForm(eventData: TODO) {
  const { refs, getIdByLabel } = useEventTypeContext();
  const { data, updateData, resetData, setData, hasChanges } = useInputData(
    initInputData(eventData)
  );
  const router = useRouter();
  //const [data, dispatch] = useReducer(reducer, initInputData(eventData));

  const update = useCallback(
    e => {
      switch (e.target.name) {
        case 'mainTypeId':
          {
            setData(prev => ({
              ...prev,
              [e.target.name]: e.target.value,
              targetId: null,
              workTypeId: null,
            }));
          }
          break;

        case 'targetId':
          {
            setData(prev => ({
              ...prev,
              [e.target.name]: e.target.value,
              workTypeId: null,
            }));
          }
          break;

        default:
          updateData(e);
      }
    },
    [setData, updateData]
  );

  const cancel = useCallback(() => {
    if (hasChanges) {
      const c = confirm('Lomake sisältää muutoksia. Haluatko varmasti peruuttaa?');
      if (!c) return;
    }

    router.back();
  }, [hasChanges, router]);

  return {
    data,
    getIdByLabel,
    update,
    cancel,
    refs,
  };
}
