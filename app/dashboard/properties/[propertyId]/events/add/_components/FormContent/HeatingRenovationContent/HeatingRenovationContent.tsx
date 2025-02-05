import Spinner from '@/components/UI/Spinner';
import { HeatingSystemSelector } from './HeatingSystemSelector';
import { useHeatingRenovationContent } from './hooks/useHeatingRenovationContent';
import { useEventFormContext } from '../../EventFormContext';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { FormControl } from '@/components/UI/FormUtils';

export const HeatingRenovationContent = () => {
  const { eventData, updateEventData, editing } = useEventFormContext();
  const {
    heatingSystems,
    isLoading,
    getAdditionalInputs,
    getBrandAndModelInputs,
    currentHeatingSystems,
    currentError,
    currentIsLoading,
  } = useHeatingRenovationContent();

  return (
    <div className='flex flex-col gap-2 w-full'>
      {currentIsLoading ? (
        <Spinner message='Ladataan nykyisiä järjestelmiä...' />
      ) : (
        <FormControl
          label='Vanha järjestelmä'
          control={
            <div className='flex flex-row gap-2'>
              {currentHeatingSystems.map(ch => {
                return (
                  <ChipButton
                    name='old_system_id'
                    value={ch.id}
                    label={ch.name || ch.heating_type_label}
                    checked={eventData.old_system_id == ch.id}
                    onChange={updateEventData}
                  />
                );
              })}
              <ChipButton
                name='old_system_id'
                value={-1}
                label='Ei mitään'
                checked={eventData.old_system_id == -1 || eventData.old_system_id == undefined}
                onChange={updateEventData}
              />
            </div>
          }
        />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <HeatingSystemSelector
            required
            name='new_system_id'
            label='Uusi järjestelmä'
            disabled={editing}
            heatingSystems={heatingSystems}
            value={eventData.new_system_id}
            onChange={updateEventData}
          />
          <div className='flex flex-col gap-2 w-full'>
            {getAdditionalInputs()}
            {getBrandAndModelInputs()}
          </div>
        </>
      )}
    </div>
  );
};
