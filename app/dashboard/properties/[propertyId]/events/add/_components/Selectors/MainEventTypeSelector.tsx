import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const MainEventTypeSelector = () => {
  const {
    refs: { eventTypes },
  } = useEventTypeContext() as {
    refs: {
      eventTypes: { id: number; label: string }[];
    };
  };
  const { typeData } = useEventFormContext();

  return (
    <ChipRadioGroup
      currentValue={typeData.mainTypeId}
      name='mainTypeId'
      valueKey='id'
      labelKey='label'
      dataArray={eventTypes}
    />
  );
};
