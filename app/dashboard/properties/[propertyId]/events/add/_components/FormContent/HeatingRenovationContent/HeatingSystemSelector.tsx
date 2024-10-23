import { ChipButton } from '@/components/Feature/RadioGroup/ChipButton';
import { RadioGroup } from '@/components/Feature/RadioGroup/RadioGroup';
import { FormControl } from '@/components/UI/FormUtils';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export const HeatingSystemSelector = ({
  disabled = false,
  name,
  label,
  heatingSystems,
  defaultCheckedValue = undefined,
  required = false,
  helper = null,
  includeNullOption = false,
  value = undefined,
}) => {
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
                label={t.name}
                value={t.id}
                key={`heatingType-${i}`}
                defaultChecked={defaultCheckedValue == t.id}
                checked={value == t.id}
                name={name}
              />
            );
          })}

          <RenderOnCondition condition={includeNullOption}>
            <ChipButton
              disabled={disabled}
              label='Ei mitään'
              value={null}
              defaultChecked={defaultCheckedValue === null}
              name={name}
            />
          </RenderOnCondition>
        </RadioGroup>
      }
    />
  );
};
