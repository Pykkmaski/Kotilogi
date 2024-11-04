import { FormControl } from '@/components/UI/FormUtils';
import { useEventTypeContext } from '../../EventTypeProvider';
import { useEventFormContext } from '../../EventFormContext';
import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const RoofMaterialSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Katon materiaali'
      labelKey='name'
      valueKey='id'
      tablename='ref_roofMaterials'
      propertyName='roofMaterialId'
      useContextValue={extraData}
    />
  );
};
