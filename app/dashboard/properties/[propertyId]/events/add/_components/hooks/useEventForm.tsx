import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMainData } from './useMainData';
import { useTypeData } from './useTypeData';
import { useExtraData } from './useExtraData';
import { useEventTypeContext } from '../EventTypeProvider';

export function useEventForm(eventData: TODO, initialExtraData?: TODO) {
  const { refs, getIdByLabel } = useEventTypeContext();
  const { mainData, updateMainData, mainDataHasChanges, resetMainData } = useMainData(eventData);
  const { typeData, updateTypeData, typeDataHasChanges } = useTypeData(eventData, resetMainData);
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

  return {
    mainData,
    updateMainData,
    typeData,
    updateTypeData,
    extraData,
    updateExtraData,
    getIdByLabel,
    cancel,
    refs,
  };
}
