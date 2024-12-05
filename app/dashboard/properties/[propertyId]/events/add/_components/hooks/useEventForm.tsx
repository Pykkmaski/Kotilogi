import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEventData } from './useEventData';
import { useTypeData } from './useTypeData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';
import { createEventAction, updateEventAction } from '../actions';
import toast from 'react-hot-toast';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { isDefined } from '../util';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function useEventForm(propertyId: string, initialEventData?: TODO, initialExtraData?: TODO) {
  const { refs } = useEventTypeContext();
  console.log('initial event data: ', initialEventData);

  const { eventData, updateEventData, eventDataHasChanges, resetEventData, files, removeFile } =
    useEventData(
      initialEventData || {
        property_id: propertyId,
      }
    );

  const [selectedSurfaceIds, setSelectedSurfaceIds] = useState([]);
  const resetSelectedSurfaceIds = () => setSelectedSurfaceIds([]);
  const { extraData, updateExtraData, resetExtraData, ...extraDataProps } =
    useExtraData(initialExtraData);

  const { method: submitMethod, status } = useStatusWithAsyncMethod(async () => {
    if (initialEventData) {
      console.log('updating event...');
      await updateEventAction(eventData.id, eventData, extraData);
    } else {
      await createEventAction(
        propertyId,
        eventData,

        [extraData],
        files.map(f => {
          const fd = new FormData();
          fd.append('file', f);
          return fd;
        })
      ).catch(err => toast.error(err.message));
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

  const toggleSurfaceId = useCallback(
    id => {
      const alreadySelected = selectedSurfaceIds.find(selectedId => selectedId == id);
      if (alreadySelected) {
        //Deselect the id by removing it from the array.
        const newSelectedIds = selectedSurfaceIds.filter(selectedId => selectedId != id);
        setSelectedSurfaceIds(newSelectedIds);
      } else {
        setSelectedSurfaceIds([...selectedSurfaceIds, id]);
      }
    },
    [selectedSurfaceIds, setSelectedSurfaceIds]
  );

  const showMainDataForm = useCallback(() => {
    if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Peruskorjaus')) {
      return isDefined(eventData.target_id);
    } else if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Huoltotyö')) {
      return isDefined(eventData.target_id) && isDefined(eventData.service_work_type_id);
    } else if (eventData.event_type_id == getIdByLabel(refs.eventTypes, 'Pintaremontti')) {
      return isDefined(eventData.target_id);
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

  return {
    ...extraDataProps,
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
    toggleSurfaceId,
    refs,
    removeFile,
    resetSelectedSurfaceIds,
    showMainDataForm,
    showExtraDataForm,
  };
}
