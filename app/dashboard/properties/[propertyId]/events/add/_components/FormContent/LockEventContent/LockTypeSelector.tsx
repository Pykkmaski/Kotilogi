import { useQuery } from '@tanstack/react-query';
import { getLockTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const LockTypeSelector = () => {
  const { data: lockTypes, isLoading } = useQuery({
    queryKey: ['lockTypes'],
    queryFn: async () => getLockTypes(),
  });

  return (
    <SuspenseFormControl
      loadingText='Ladataan lukkotyyppejä...'
      isLoading={isLoading}
      label='Lukituksen tyyppi'
      control={
        <ChipRadioGroup
          name='lockTypeId'
          dataArray={lockTypes}
          valueKey='id'
          labelKey='label'
        />
      }
    />
  );
};
