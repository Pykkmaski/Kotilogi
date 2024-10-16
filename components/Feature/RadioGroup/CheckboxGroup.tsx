import { List } from '@/components/New/List';
import { ChipButton } from './ChipButton';

type CheckboxGroupProps<T extends object> = {
  dataArray: T[];
  getName: <K>(val: K) => string;
  labelKey: string;
  valueKey: string;
};

export function CheckboxGroup<T extends object>({
  dataArray,
  getName,
  valueKey,
  labelKey,
}: CheckboxGroupProps<T>) {
  return (
    <List>
      {dataArray.map(d => {
        return (
          <ChipButton
            type='checkbox'
            label={d[labelKey]}
            value={d[valueKey]}
            name={getName(d)}
          />
        );
      })}
    </List>
  );
}
