import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/UI/Spinner';
import { getEventWorkTypes } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';

export const EventWorkSelector = () => {
  const { mainData, typeData } = useEventFormContext();
  const { data: workTypes, isLoading } = useQuery({
    queryFn: async () => await getEventWorkTypes(typeData.targetId),
    queryKey: [`workTypes-${typeData.targetId}`],
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      boldLabelText
      label='Tehty työ'
      required
      control={
        <ChipRadioGroup
          dataArray={workTypes}
          name='workTypeId'
          currentValue={typeData.workTypeId}
          valueKey='id'
          labelKey='label'
        />
      }
    />
  );
};
