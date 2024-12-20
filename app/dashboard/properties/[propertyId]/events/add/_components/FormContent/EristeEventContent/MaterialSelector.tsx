import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';

export const MaterialSelector = () => {
  const { extraData } = useEventFormContext();

  return (
    <OptionSelector
      label='Eristemateriaali'
      labelKey='label'
      valueKey='id'
      tablename='insulation.materials'
      propertyName='materiaaliId'
      useContextValue={extraData}
    />
  );
};
