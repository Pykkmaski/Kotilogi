import { useQuery } from '@tanstack/react-query/build/legacy';
import { useEventFormContext } from '../../EventFormContext';
import { OptionSelector } from '@/components/Feature/OptionSelector';
import { getCosmeticRenovationSurfaces, getElectricityJobTargets } from '../actions';
import { Notification } from '@/components/UI/Notification';
import Spinner from '@/components/UI/Spinner';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';

export const TargetSelector = () => {
  const { selectedElectricityRenoTargets, toggleElectricityRenoTarget } = useEventFormContext();
  const {
    data: surfaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['electricity-restoration-targets'],
    queryFn: async () => await getElectricityJobTargets(),
  });

  return isLoading ? (
    <Spinner message='Ladataan kohteita...' />
  ) : error ? (
    <Notification variant='error'>Kohteiden lataus epäonnistui!</Notification>
  ) : (
    surfaces.map((s, i) => {
      return (
        <ChipButton
          key={`electricity-target-${i}`}
          type='checkbox'
          value={s.id}
          label={s.label}
          checked={selectedElectricityRenoTargets.includes(s.id)}
          onChange={e => toggleElectricityRenoTarget(e.target.value)}
        />
      );
    })
  );
};

/**<OptionSelector
      label='Työn kohde'
      labelKey='label'
      valueKey='id'
      tablename='electricity.restoration_work_target_id'
      name='restoration_work_target_id'
      value={eventData.restoration_work_target_id}
    /> */
