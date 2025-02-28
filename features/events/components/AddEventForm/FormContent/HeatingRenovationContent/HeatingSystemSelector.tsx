import { HeatingTypeSelector } from '@/components/Feature/HeatingEditor';
import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl } from '@/components/UI/FormUtils';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useEffect } from 'react';
import { useEventFormContext } from '../../EventFormContext';

export const HeatingSystemSelector = ({
  disabled = false,
  name,
  label,
  heatingSystems,
  required = false,
  helper = null,
  includeNullOption = false,
}) => {
  const { payload, updatePayload, resetPayload, editing } = useEventFormContext();
  useEffect(() => {
    //console.log('Selected heating type: ', payload.new_heating_type);
    /*Reset the rest of the payload if the new system is changed.
    console.log('Resetting payload...');
    resetPayload({
      new_heating_type: payload.new_heating_type,
      old_heating_type: payload.old_heating_type,

    });*/
  }, [payload.new_heating_type]);

  return (
    <FormControl
      helper={helper}
      required={required}
      label={label}
      control={
        <RadioGroup name={name}>
          {heatingSystems.map((t, i) => {
            return (
              <ChipButton
                disabled={disabled}
                label={t}
                value={t}
                key={`heating_type_id-${i}`}
                checked={payload.new_heating_type == t}
                name={'new_heating_type'}
                onChange={e => {
                  console.log(e.target.value);
                  updatePayload(e);
                }}
              />
            );
          })}
        </RadioGroup>
      }
    />
  );
};
