import { useInputData } from '@/hooks/useInputData';

/**Handles the extra data of the event form. Should be used within the main useEventForm-hook. */
export const useExtraData = (initialData: TODO) => {
  const { data: extraData, updateData: updateExtraData } = useInputData(initialData || {});
  return {
    extraData,
    updateExtraData,
  };
};
