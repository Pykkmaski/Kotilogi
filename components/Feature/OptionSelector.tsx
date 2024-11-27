'use client';

import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../../app/dashboard/properties/add/_components/PropertyForm/actions';
import { FormControlProps } from '@/components/UI/FormUtils';

type OptionSelectorProps<T> = Omit<FormControlProps, 'control'> & {
  tablename: string;
  labelKey: string;
  valueKey: string;

  /**The name of the property in the source object returned by the provided useContextHook, from which to get the default value of the input. */
  propertyName: string;

  useContextValue: T;
  loadingText?: string;
  fetchFn?: () => Promise<any>;
  dataProcessingFn?: (data: TODO[]) => TODO[];
  onChange?: (currentValue: any) => void;
};

export function OptionSelector<T extends Record<string, any>>({
  tablename,
  labelKey,
  valueKey,
  propertyName,
  useContextValue,
  fetchFn,
  dataProcessingFn,
  onChange,
  ...props
}: OptionSelectorProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: [tablename],
    queryFn: async () => (fetchFn ? await fetchFn() : await getContent(tablename)),
  });

  const dataToDisplay = !isLoading && dataProcessingFn ? dataProcessingFn(data) : data;

  return (
    <SuspenseFormControl
      {...props}
      isLoading={isLoading}
      control={
        !isLoading && (
          <ChipRadioGroup
            onChange={onChange}
            dataArray={dataToDisplay}
            labelKey={labelKey}
            valueKey={valueKey}
            currentValue={useContextValue[propertyName]}
            name={propertyName}
          />
        )
      }
    />
  );
}
