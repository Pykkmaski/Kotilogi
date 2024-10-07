import { useCallback, useState } from 'react';
import { useEventTypeContext } from './EventTypeProvider';
import { useInputData } from '@/hooks/useInputData';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useRouter } from 'next/navigation';
import { useBatch } from '@/hooks/useBatch';
import { AnyRecord } from 'dns';

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

function initMainData(eventData) {
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

export function useEventForm(eventData: TODO, initialExtraData?: TODO) {
  const { refs, getIdByLabel } = useEventTypeContext();

  const { data: extraData, updateData: updateExtraData } = useInputData(initialExtraData || {});
  const {
    data: typeData,
    updateData: _updateTypeData,
    setData: setTypeData,
    hasChanges: typeDataHasChanges,
  } = useInputData(initTypeData(eventData));

  const {
    data: mainData,
    updateData: updateMainData,
    setData: setMainData,
    hasChanges: mainDataHasChanges,
  } = useInputData(initMainData(eventData));

  const router = useRouter();
  const hasChanges = mainDataHasChanges || typeDataHasChanges;

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
          }
          break;

        case 'targetId':
          {
            setTypeData({
              ...typeData,
              targetId: e.target.value,
              workTypeId: null,
            });
          }
          break;

        default:
          _updateTypeData(e);
      }
    },
    [setTypeData, _updateTypeData]
  );

  const update = useCallback(
    e => {
      switch (e.target.name) {
        case 'mainTypeId':
          {
            setTypeData({
              mainTypeId: e.target.value,
              targetId: null,
              workTypeId: null,
            });
          }
          break;

        case 'targetId':
          {
            console.log(typeData);
            setTypeData({
              ...typeData,
              targetId: e.target.value,
              workTypeId: null,
            });
          }
          break;

        default:
          updateMainData(e);
      }
    },
    [setTypeData, updateMainData]
  );

  const cancel = useCallback(() => {
    if (hasChanges) {
      const c = confirm('Lomake sisältää muutoksia. Haluatko varmasti peruuttaa?');
      if (!c) return;
    }
    localStorage.removeItem('kotidok-event-extra-data');
    router.back();
  }, [hasChanges, router]);

  return {
    mainData,

    extraData,

    updateExtraData,
    getIdByLabel,
    update,
    cancel,

    updateTypeData,
    updateMainData,

    typeData,
    refs,
  };
}
