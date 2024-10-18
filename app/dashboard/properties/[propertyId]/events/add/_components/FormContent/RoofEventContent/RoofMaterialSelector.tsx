import { FormControl } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../../EventTypeProvider';
import { useEventFormContext } from '../../EventFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';

export const RoofMaterialSelector = () => {
  const { refs } = useEventTypeContext();
  const { extraData } = useEventFormContext();

  return (
    <FormControl
      label='Katon materiaali'
      required
      control={
        <ChipRadioGroup
          name='roofMaterialId'
          dataArray={refs.roofMaterials}
          labelKey='name'
          valueKey='id'
          currentValue={extraData.roofMaterialId}
        />
      }
    />
  );
};
