import { putOtherOptionLast } from 'kotilogi-app/utils/putOtherOptionLast';
import { ChipButton } from './ChipButton';
import { RadioGroup } from './RadioGroup';
import { useCallback, useMemo } from 'react';
import { useMapArray } from '@/hooks/useMapArray';

type ChipRadioGroupProps<T> = {
  name: string;
  dataArray: T[];
  valueKey: string;
  labelKey: string;
  currentValue?: number | string;
  isChecked?: <K>(v: K) => boolean;
  required?: boolean;
  disabled?: boolean;
  onChange?: (currentValue: any) => void;
};

/**A prefab radio group that renders its options as ChipButtons. */
export function ChipRadioGroup<T extends Record<string, string | number>>({
  name,
  dataArray,
  valueKey,
  labelKey,
  currentValue,
  required,
  disabled,
  isChecked,
  onChange,
}: ChipRadioGroupProps<T>) {
  const renderFn = useCallback(
    item => {
      const value = item[valueKey];
      const label = item[labelKey];

      const checked = (isChecked && isChecked(value)) || currentValue == value;

      return (
        <ChipButton
          onChange={onChange}
          type='radio'
          disabled={disabled}
          required={required}
          value={value}
          label={label as string}
          checked={checked}
          name={name}
        />
      );
    },
    [isChecked, currentValue, disabled, required, name]
  );

  const content = useMapArray(putOtherOptionLast(dataArray), renderFn);
  return <RadioGroup name={name}>{content}</RadioGroup>;
}
