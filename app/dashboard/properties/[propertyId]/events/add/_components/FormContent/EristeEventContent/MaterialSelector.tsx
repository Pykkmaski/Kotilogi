import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getEristeMateriaalit } from '../actions';

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
      fetchFn={getEristeMateriaalit}
    />
  );
};
