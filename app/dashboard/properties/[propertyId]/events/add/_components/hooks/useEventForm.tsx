import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEventData } from './useEventData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';
import { createEventAction, updateEventAction } from '../actions';
import toast from 'react-hot-toast';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { isDefined } from '../util';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import { WindowBatch } from '../FormContent/WindowBatch/WindowBatch';

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
  } = eventDataProps;

  const { extraData, updateExtraData, resetExtraData, ...extraDataProps } =
    useExtraData(initialExtraData);

  const { method: submitMethod, status } = useStatusWithAsyncMethod(async () => {
    if (initialEventData) {
      await updateEventAction(
        eventData.id,
        {
          ...eventData,
          windows: windows.map(w => w.value),
          locks: locks.map(l => l.value),
          surfaces: selectedSurfaceIds.map(s => s),
        },
        extraData
      );
    } else {
      await createEventAction(
        propertyId,
        {
          ...eventData,
          windows: windows.map(w => w.value),
          locks: locks.map(l => l.value),
          surfaces: selectedSurfaceIds,
          //Fix this later: The batches seem to be stacked on top of each other for some reason.
          insulation: insulation.map(i => i.value.value),
          electricalTargets: selectedERTargetIds,
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
    if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus')) {
      return isDefined(eventData.target_id);
    } else if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö')) {
      return eventData.target_id != getIdByLabel(refs.eventTargets, 'Muu')
        ? isDefined(eventData.target_id) && isDefined(eventData.service_work_type_id)
        : isDefined(eventData.target_id);
    } else if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Pintaremontti')) {
      return selectedSurfaceIds.length > 0;
    } else if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Muu')) {
      return isDefined(eventData.target_id);
    } else {
      return false;
    }
  }, [
    eventData.target_id,
    eventData.event_type_id,
    refs.eventTypes,
    eventData.service_work_type_id,
  ]);

  const showExtraDataForm = useCallback(() => {
    if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus')) {
      return true;
    } else {
      return false;
    }
  }, [eventData.service_work_type_id, eventData.event_type_id, refs.eventTypes]);

  const { resetWindowBatch } = eventDataProps;

  const isSubmitDisabled = useMemo(() => {
    return (
      eventData.event_type_id == undefined ||
      eventData.target_id == undefined ||
      eventData.date == undefined ||
      status == 'loading'
    );
  }, [
    eventData.target_id,
    eventData.service_work_type_id,
    eventData.event_type_id,
    eventData.date,
    status,
  ]);

  useEffect(() => {
    if (eventData.target_id != getIdByLabel(refs.eventTargets, 'Ikkunat')) {
      console.log('Resetting window batch.');
      resetWindowBatch();
    }
  }, [eventData.target_id]);

  return {
    ...extraDataProps,
    ...eventDataProps,

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

    refs,
    removeFile,
    resetSelectedSurfaceIds,
    showMainDataForm,
    showExtraDataForm,
    isSubmitDisabled,
  };
}
