import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { ChipButton } from './ChipButton';
import { RadioGroup } from './RadioGroup';

type ChipRadioGroupProps<T> = {
  name: string;
  dataArray: T[];
  chipType?: 'radio' | 'checkbox';
  valueKey: string;
  labelKey: string;
  currentValue?: number | string;
  isChecked?: <K>(v: K) => boolean;
  required?: boolean;
  disabled?: boolean;
};

/**A prefab radio group that renders its options as ChipButtons. */
export function ChipRadioGroup<T extends Record<string, string | number>>({
  name,
  chipType = 'radio',
  dataArray,
  valueKey,
  labelKey,
  currentValue,
  required,
  disabled,
  isChecked,
}: ChipRadioGroupProps<T>) {
  return (
    <RadioGroup name={name}>
      {putOtherOptionLast(dataArray).map((d, i) => {
        const value = d[valueKey];
        const label = d[labelKey];

        return (
          <ChipButton
            type={chipType}
            disabled={disabled}
            required={required}
            key={`mdk-${d}}`}
            value={value}
            label={label as string}
            checked={(isChecked && isChecked(value)) || currentValue == value}
          />
        );
      })}
    </RadioGroup>
  );
}
