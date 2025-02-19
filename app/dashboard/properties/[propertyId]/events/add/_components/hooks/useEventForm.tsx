import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useEventData } from './useEventData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';
import { createEventAction, updateEventAction } from '../actions';
import toast from 'react-hot-toast';
import { isDefined } from '../util';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { EventType } from 'kotilogi-app/types/EventType';
import { TargetType } from 'kotilogi-app/types/TargetType';

export function useEventForm(
  propertyId: string,
  initialEventData?: EventPayloadType,
  initialExtraData?: TODO
) {
  const { refs } = useEventTypeContext();
  const eventDataProps = useEventData(
    initialEventData ||
      ({
        property_id: propertyId,
      } as EventPayloadType)
  );

  const {
    eventData,
    updateEventData,
    eventDataHasChanges,
    resetEventData,
    files,
    removeFile,
    windows,
    insulation,
    locks,
    selectedSurfaceIds,
    resetSelectedSurfaceIds,
    selectedERTargetIds,
    payload,
  } = eventDataProps;

  const { extraData, updateExtraData, resetExtraData, ...extraDataProps } =
    useExtraData(initialExtraData);

  const { method: submitMethod, status } = useStatusWithAsyncMethod(async () => {
    let data = payload;
    if (windows.length) {
      data.windows = windows.map(w => w.value);
    } else if (locks.length) {
      data.locks = locks.map(l => l.value);
    } else if (insulation.length) {
      data.insulation = insulation.map(i => i.value.value);
    } else if (selectedSurfaceIds.length) {
      data.surfaces = selectedSurfaceIds;
    } else if (selectedERTargetIds.length) {
      data.electrical_targets = selectedERTargetIds;
    }

    if (initialEventData) {
      await updateEventAction(
        eventData.id,
        {
          ...eventData,
          data,
        },
        extraData
      );
    } else {
      await createEventAction(
        propertyId,
        {
          ...eventData,
          data,
        },
        files.map(f => {
          const fd = new FormData();
          fd.append('file', f);
          return fd;
        })
      ).catch(err => {
        if (!err.message.includes('NEXT_REDIRECT')) {
          toast.error(err.message);
        }
      });
    }
    localStorage.removeItem('kotidok-event-extra-data');
  });

  const onSubmit = usePreventDefault(submitMethod);

  const router = useRouter();
  const hasChanges = eventDataHasChanges;

  const cancel = useCallback(() => {
    if (hasChanges) {
      const c = confirm('Lomake sisältää muutoksia. Haluatko varmasti peruuttaa?');
      if (!c) return;
    }
    //localStorage.removeItem('kotidok-event-extra-data');
    router.back();
  }, [hasChanges, router]);

  const showMainDataForm = useMemo(() => {
    if (eventData.event_type == EventType.PERUSKORJAUS) {
      return isDefined(eventData.target_type);
    } else if (eventData.event_type == EventType.HUOLTOTYÖ) {
      return eventData.target_type != TargetType.MUU
        ? isDefined(eventData.target_type) && isDefined(payload?.maintenance_type)
        : isDefined(eventData.target_type);
    } else if (eventData.event_type == EventType.PINTAREMONTTI) {
      return selectedSurfaceIds.length > 0;
    } else if (eventData.event_type == EventType.MUU) {
      return isDefined(eventData.target_type);
    } else {
      return false;
    }
  }, [eventData.target_type, eventData.event_type, payload?.maintenance_type, refs.eventTargets]);

  const showExtraDataForm = useCallback(() => {
    if (eventData.event_type == EventType.PERUSKORJAUS) {
      return true;
    } else {
      return false;
    }
  }, [payload?.maintenance_type, eventData.event_type]);

  const { resetWindowBatch } = eventDataProps;

  const isSubmitDisabled = useMemo(() => {
    return (
      eventData.event_type == undefined ||
      eventData.target_type == undefined ||
      eventData.date == undefined ||
      status == 'loading' ||
      status == 'done'
    );
  }, [
    eventData.target_type,
    payload?.maintenance_type,
    eventData.event_type,
    eventData.date,
    status,
  ]);

  useEffect(() => {
    if (eventData.target_type != TargetType.IKKUNAT) {
      console.log('Resetting window batch.');
      resetWindowBatch();
    }
  }, [eventData.target_type]);

  return {
    ...extraDataProps,
    ...eventDataProps,
    refs,
    status,
    onSubmit,
    editing: isDefined(initialEventData),
    eventData,
    updateEventData,
    extraData,
    updateExtraData,
    files,
    cancel,
    selectedSurfaceIds,
    removeFile,
    resetSelectedSurfaceIds,
    showMainDataForm,
    showExtraDataForm,
    isSubmitDisabled,
  };
}
