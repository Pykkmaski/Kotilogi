import Spinner from '@/components/UI/Spinner';
import { HeatingSystemSelector } from './HeatingSystemSelector';
import { useHeatingRenovationContent } from './hooks/useHeatingRenovationContent';
import { useEventFormContext } from '../../EventFormContext';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export const HeatingRenovationContent = () => {
  const { eventData, updateEventData, editing } = useEventFormContext();
  const { heatingSystems, isLoading, getAdditionalInputs, getBrandAndModelInputs } =
    useHeatingRenovationContent();

  return (
    <RenderOnCondition
      condition={isLoading == false}
      fallback={<Spinner message='Ladataan...' />}>
      <div className='flex flex-col gap-2 w-full'>
        <HeatingSystemSelector
          helper='Jos olemassa oleva järjestelmä vaihdettiin, valitse vanhan järjestelmän tyyppi.'
          required={false}
          name='old_system_id'
          label='Vanha järjestelmä'
          heatingSystems={heatingSystems}
          defaultCheckedValue={null}
          value={eventData.old_system_id}
          includeNullOption
          onChange={updateEventData}
        />

        <HeatingSystemSelector
          required
          name='new_system_id'
          label='Uusi järjestelmä'
          disabled={editing}
          heatingSystems={heatingSystems}
          value={eventData.new_system_id}
          onChange={updateEventData}
        />
      </div>

      <div className='flex flex-col gap-2 w-full'>
        {getAdditionalInputs()}
        {getBrandAndModelInputs()}
      </div>
    </RenderOnCondition>
  );
};
