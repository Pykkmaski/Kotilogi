import { FormControl } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../../EventFormContext';
import { useEventTypeContext } from '../../EventTypeProvider';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const RoofTypeSelector = () => {
  const { extraData } = useEventFormContext();
  const { refs } = useEventTypeContext();

  return (
    <FormControl
      required
      label='Katon tyyppi'
      control={
        <ChipRadioGroup
          name='roofTypeId'
          dataArray={refs.roofTypes}
          labelKey='name'
          valueKey='id'
          currentValue={extraData.roofTypeId}
        />
      }
    />
  );
};