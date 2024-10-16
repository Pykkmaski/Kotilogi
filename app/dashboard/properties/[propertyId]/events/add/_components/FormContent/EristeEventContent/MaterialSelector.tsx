import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useEventFormContext } from '../../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEristeMateriaalit } from '../actions';

export const MaterialSelector = () => {
  const { extraData } = useEventFormContext();
  const { data, isLoading } = useQuery({
    queryKey: ['eristemateriaalit'],
    queryFn: async () => getEristeMateriaalit(),
  });
  return (
    <SuspenseFormControl
      isLoading={isLoading}
      loadingText='Ladataan materiaaleja...'
      label='Materiaali'
      required
      control={
        <ChipRadioGroup
          name='materiaaliId'
          dataArray={!isLoading ? data : []}
          labelKey='label'
          valueKey='id'
          currentValue={extraData.materiaaliId}
        />
      }
    />
  );
};
