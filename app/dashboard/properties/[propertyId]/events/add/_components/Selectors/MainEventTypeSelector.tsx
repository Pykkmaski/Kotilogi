import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { useEventFormContext } from '../EventFormContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const MainEventTypeSelector = () => {
  const {
    refs: { mainEventTypes },
  } = useEventTypeContext() as {
    refs: {
      mainEventTypes: { id: number; label: string }[];
    };
  };
  const { typeData } = useEventFormContext();

  console.log(typeData.mainTypeId);
  return (
    <ChipRadioGroup
      currentValue={typeData.mainTypeId}
      name='mainTypeId'
      valueKey='id'
      labelKey='label'
      dataArray={mainEventTypes}
    />
  );
};
