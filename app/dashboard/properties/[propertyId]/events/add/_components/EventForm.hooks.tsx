import { useCallback, useEffect, useReducer, useState } from 'react';
import { useEventTypeContext } from './EventTypeProvider';
import { useInputData } from '@/hooks/useInputData';
import { reducer } from './EventForm.reducer';

function initInputData(eventData: TODO) {
  return (
    eventData ||
    ({
      targetId: 'null',
      mainTypeId: 'null',
      workTypeId: 'null',
    } as TODO)
  );
}

export function useEventForm(eventData: TODO) {
  const { refs, getIdByLabel } = useEventTypeContext();

  const { data, updateData, resetData, setData } = useInputData(initInputData(eventData));
  //const [data, dispatch] = useReducer(reducer, initInputData(eventData));

  const update = useCallback(e => {
    switch (e.target.name) {
      case 'mainTypeId':
        {
          setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            targetId: 'null',
            workTypeId: 'null',
          }));
        }
        break;

      case 'targetId':
        {
          setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            workTypeId: 'null',
          }));
        }
        break;

      default:
        updateData(e);
    }
  }, []);

  return {
    data,
    getIdByLabel,
    update,
    refs,
  };
}
