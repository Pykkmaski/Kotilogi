import { FormControl, Label } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../../EventTypeProvider';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
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
