import Spinner from '@/components/UI/Spinner';
import { HeatingSystemSelector } from './HeatingSystemSelector';
import { useHeatingRenovationContent } from './hooks/useHeatingRenovationContent';
import { useEventFormContext } from '../../EventFormContext';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { FormControl } from '@/components/UI/FormUtils';
import { useEffect, useMemo, useState } from 'react';
import { Checkbox } from '@/components/Feature/RadioGroup/Checkbox';

export const HeatingRenovationContent = () => {
  const { eventData, updateEventData, editing, payload, updatePayload } = useEventFormContext();
  const [replacesExisting, setReplacesExisting] = useState(false);
  const {
    heatingSystems,
    isLoading,
    getAdditionalInputs,
    getBrandAndModelInputs,
    currentHeatingSystems,
    currentError,
    currentIsLoading,
  } = useHeatingRenovationContent();

  const optionsToRender = useMemo(
    () => (replacesExisting ? currentHeatingSystems : heatingSystems),
    [replacesExisting, currentHeatingSystems, heatingSystems]
  );
  return (
    <div className='flex flex-col gap-2 w-full'>
      {currentIsLoading ? (
        <Spinner message='Ladataan nykyisiä järjestelmiä...' />
      ) : (
        <>
          <Checkbox
            label='Korjaa olemassa olevan lämmityksen?'
            checked={replacesExisting}
            onChange={() => setReplacesExisting(prev => !prev)}
          />
          <FormControl
            label='Korjattava järjestelmä'
            control={
              <div className='flex flex-row gap-2'>
                {optionsToRender?.map((ch, i) => {
                  return (
                    <ChipButton
                      key={`old-heating-type-${i}`}
                      name='old_heating_type'
                      type='radio'
                      value={ch}
                      label={ch}
                      checked={payload.old_heating_type == ch}
                      onChange={e => {
                        console.log(e.target.name, e.target.value);
                        updatePayload(e);
                      }}
                    />
                  );
                })}
                <ChipButton
                  name='old_heating_type'
                  value={'Ei mitään'}
                  label='Ei mitään'
                  checked={payload.old_heating_type == 'Ei mitään'}
                  onChange={updatePayload}
                />
              </div>
            }
          />
        </>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <HeatingSystemSelector
            required
            name='new_heating_type'
            label='Uusi järjestelmä'
            disabled={editing}
            heatingSystems={heatingSystems}
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
