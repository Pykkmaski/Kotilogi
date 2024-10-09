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
  const { typeData, updateTypeData, typeDataHasChanges } = useTypeData(eventData, resetMainData);
  const [selectedSurfaceIds, setSelectedSurfaceIds] = useState([]);
  const { extraData, updateExtraData } = useExtraData(initialExtraData);

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
    console.log('Toggling ' + id);
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
  };
}
