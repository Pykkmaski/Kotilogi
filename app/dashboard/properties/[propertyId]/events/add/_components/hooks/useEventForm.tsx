import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMainData } from './useMainData';
import { useTypeData } from './useTypeData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';
import { createEventAction, updateEventAction } from '../actions';
import toast from 'react-hot-toast';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { isDefined } from '../util';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function useEventForm(propertyId: string, eventData: TODO, initialExtraData?: TODO) {
  const { refs } = useEventTypeContext();
  const { mainData, updateMainData, mainDataHasChanges, resetMainData, files, removeFile } =
    useMainData(eventData);

  const [selectedSurfaceIds, setSelectedSurfaceIds] = useState([]);
  const resetSelectedSurfaceIds = () => setSelectedSurfaceIds([]);
  const { extraData, updateExtraData, resetExtraData, ...extraDataProps } =
    useExtraData(initialExtraData);

  const { typeData, updateTypeData, typeDataHasChanges } = useTypeData(
    eventData,
    resetMainData,
    resetSelectedSurfaceIds,
    resetExtraData
  );

  const { method: submitMethod, status } = useStatusWithAsyncMethod(async () => {
    if (eventData) {
      await updateEventAction(eventData.id, mainData, typeData, extraData);
    } else {
      await createEventAction(
        propertyId,
        mainData,
        typeData,
        [extraData],
        selectedSurfaceIds,
        files.map(f => {
          const fd = new FormData();
          fd.append('file', f);
          return fd;
        })
      );
    }
    localStorage.removeItem('kotidok-event-extra-data');
  });

  const onSubmit = usePreventDefault(submitMethod);

  const router = useRouter();
  const hasChanges = mainDataHasChanges || typeDataHasChanges;

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
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      return isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Huoltotyö')) {
      return isDefined(typeData.targetId) && isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Pintaremontti')) {
      return isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Muu')) {
      return isDefined(typeData.targetId);
    } else {
      return false;
    }
  }, [typeData.targetId, typeData.mainTypeId, refs.mainEventTypes, typeData.workTypeId]);

  const showExtraDataForm = useCallback(() => {
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      return true;
    } else {
      return false;
    }
  }, [typeData.workTypeId, typeData.mainTypeId, refs.mainEventTypes]);

  return {
    ...extraDataProps,
    status,
    onSubmit,
    editing: isDefined(eventData),
    mainData,
    updateMainData,
    typeData,
    updateTypeData,
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
