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

export function useEventForm(propertyId: string, eventData: TODO, initialExtraData?: TODO) {
  const { refs } = useEventTypeContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const { mainData, updateMainData, mainDataHasChanges, resetMainData, files } =
    useMainData(eventData);

  const [selectedSurfaceIds, setSelectedSurfaceIds] = useState([]);
  const resetSelectedSurfaceIds = () => setSelectedSurfaceIds([]);
  const { extraData, updateExtraData, resetExtraData } = useExtraData(initialExtraData);

  const { typeData, updateTypeData, typeDataHasChanges } = useTypeData(
    eventData,
    resetMainData,
    resetSelectedSurfaceIds,
    resetExtraData
  );

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const router = useRouter();
  const hasChanges = mainDataHasChanges || typeDataHasChanges;

  const cancel = useCallback(() => {
    if (hasChanges) {
      const c = confirm('Lomake sisältää muutoksia. Haluatko varmasti peruuttaa?');
      if (!c) return;
    }
    localStorage.removeItem('kotidok-event-extra-data');
    router.back();
  }, [hasChanges, router]);

  const toggleSurfaceId = id => {
    const alreadySelected = selectedSurfaceIds.find(selectedId => selectedId == id);
    if (alreadySelected) {
      //Deselect the id by removing it from the array.
      const newSelectedIds = selectedSurfaceIds.filter(selectedId => selectedId != id);
      setSelectedSurfaceIds(newSelectedIds);
    } else {
      setSelectedSurfaceIds([...selectedSurfaceIds, id]);
    }
  };

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();

      setStatus('loading');
      try {
        if (eventData) {
          await updateEventAction(eventData.id, mainData, typeData, extraData);
        } else {
          await createEventAction(
            propertyId,
            mainData,
            typeData,
            extraData,
            selectedSurfaceIds,
            files.map(f => {
              const fd = new FormData();
              fd.append('file', f);
              return fd;
            })
          );
        }
        setStatus('done');
        localStorage.removeItem('kotidok-event-extra-data');
      } catch (err) {
        toast.error(err.message);
      } finally {
        setStatus(prev => (prev != 'done' ? 'idle' : prev));
      }
    },
    [files, selectedSurfaceIds, mainData, typeData, extraData, propertyId, eventData, setStatus]
  );

  const showMainDataForm = () => {
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      return isDefined(typeData.targetId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Huoltotyö')) {
      return isDefined(typeData.targetId) && isDefined(typeData.workTypeId);
    } else if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Pintaremontti')) {
      return isDefined(typeData.targetId);
    } else {
      return false;
    }
  };

  const showExtraDataForm = () => {
    if (typeData.mainTypeId == getIdByLabel(refs.mainEventTypes, 'Peruskorjaus')) {
      return true;
    } else {
      return false;
    }
  };

  return {
    status,
    onSubmit,
    editing: eventData != undefined && eventData != null,
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
    showConfirmationDialog,
    setShowConfirmationDialog,
    resetSelectedSurfaceIds,
    showMainDataForm,
    showExtraDataForm,
  };
}
