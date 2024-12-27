import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getEristeKohteet } from '../actions';

export const TargetSelector = () => {
  const { eventData } = useEventFormContext();

  return (
    <OptionSelector
      label='Eristyskohde'
      labelKey='label'
      valueKey='id'
      tablename='insulation.targets'
      name='insulation_target_id'
      value={eventData.insulation_target_id}
      fetchFn={getEristeKohteet}
    />
  );
};
