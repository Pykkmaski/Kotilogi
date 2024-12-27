import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getEristeMateriaalit } from '../actions';

export const MaterialSelector = () => {
  const { eventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Eristemateriaali'
      labelKey='label'
      valueKey='id'
      tablename='insulation.materials'
      name='insulation_material_id'
      value={eventData.insulation_material_id}
      fetchFn={getEristeMateriaalit}
    />
  );
};
