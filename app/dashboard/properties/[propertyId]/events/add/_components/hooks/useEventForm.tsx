import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMainData } from './useMainData';
import { useTypeData } from './useTypeData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';

export function useEventForm(eventData: TODO, initialExtraData?: TODO) {
  const { refs } = useEventTypeContext();

  const { mainData, updateMainData, mainDataHasChanges, resetMainData, files } =
    useMainData(eventData);

  const [selectedSurfaceIds, setSelectedSurfaceIds] = useState([]);
  const resetSelectedSurfaceIds = () => setSelectedSurfaceIds([]);

  const { typeData, updateTypeData, typeDataHasChanges } = useTypeData(
    eventData,
    resetMainData,
    resetSelectedSurfaceIds
  );

  const { extraData, updateExtraData } = useExtraData(initialExtraData);
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

  return {
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
  };
}
