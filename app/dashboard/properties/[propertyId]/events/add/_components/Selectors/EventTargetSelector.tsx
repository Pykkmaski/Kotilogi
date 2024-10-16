import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import { getEventTargets } from '../actions';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';

export const EventTargetSelector = () => {
  const { typeData } = useEventFormContext();

  const { isLoading, data: targets } = useQuery({
    queryKey: [`targets-${typeData.mainTypeId}`],
    queryFn: async () => await getEventTargets(typeData.mainTypeId),
  });

  return (
    <SuspenseFormControl
      isLoading={isLoading}
      boldLabelText
      label='Kohde'
      required
      control={
        <ChipRadioGroup
          name='targetId'
          currentValue={typeData.targetId}
          valueKey='id'
          labelKey='label'
          dataArray={targets}
        />
      }
    />
  );
};
