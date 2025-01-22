'use client';

import { ChipRadioGroup } from '@/components/Feature/RadioGroup/ChipRadioGroup';
import { SuspenseFormControl } from '@/components/UI/SuspenseFormControl';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../../app/dashboard/properties/add/_components/PropertyForm/actions';
import { FormControlProps } from '@/components/UI/FormUtils';
import { Notification } from '../UI/Notification';
import { ChipButton } from './RadioGroup/ChipButton';
import { RadioGroupBody } from './RadioGroup/RadioGroup';
import { ReactNode, useEffect } from 'react';
import Spinner from '../UI/Spinner';

type OptionSelectorProps = Omit<FormControlProps, 'control'> & {
  tablename: string;
  labelKey: string;
  valueKey: string;

  /**The name of the property in the source object returned by the provided useContextHook, from which to get the default value of the input. */
  name: string;
  value?: string | number;
  loadingText?: string;
  errorText?: string;

  fetchFn?: () => Promise<any>;
  dataProcessingFn?: (data: TODO[]) => TODO[];
  onChange?: (currentValue: any) => void;
};

/**@deprecated */
export function OptionSelector({
  tablename,
  labelKey,
  valueKey,
  value,
  name,
  fetchFn,
  dataProcessingFn,
  onChange,
  errorText,
  ...props
}: OptionSelectorProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [tablename],
    queryFn: async () => (fetchFn ? await fetchFn() : await getContent(tablename, {})),
  });

  const dataToDisplay = !isLoading && !error && (dataProcessingFn ? dataProcessingFn(data) : data);

  return !error ? (
    <SuspenseFormControl
      {...props}
      isLoading={isLoading}
      control={
        !isLoading ? (
          <ChipRadioGroup
            onChange={onChange}
            dataArray={dataToDisplay}
            labelKey={labelKey}
            valueKey={valueKey}
            currentValue={value}
            name={name}
          />
        ) : null
      }
    />
  ) : (
    <Notification
      position='start'
      variant='error'>
      {errorText || <>Vaihtoehtojen haku epäonnistui!</>}
    </Notification>
  );
}

type BaseSelectorProps = Omit<FormControlProps, 'control' | 'onChange'> & {
  tablename: string;
  loadingText?: string;
  errorText?: string;
  renderFn: (options: any[]) => ReactNode;
  fetchFn?: () => Promise<TODO>;
};

function BaseSelector({
  tablename,
  loadingText = 'Ladataan kohteita...',
  errorText = 'Kohteiden lataus epäonnistui!',
  fetchFn,
  renderFn,
  ...props
}: BaseSelectorProps) {
  const {
    data: options,
    isLoading,
    error,
  } = useQuery({
    queryKey: [tablename],
    queryFn: fetchFn || (async () => await getContent(tablename)),
  });

  useEffect(() => {
    console.log(options);
  }, [isLoading]);
  return (
    <SuspenseFormControl
      {...props}
      isLoading={isLoading}
      loadingText={loadingText}
      control={
        <RadioGroupBody>
          {isLoading ? (
            <Spinner message={loadingText} />
          ) : error ? (
            <Notification>{errorText}</Notification>
          ) : (
            renderFn(options)
          )}
        </RadioGroupBody>
      }
    />
  );
}

type PropKeyProps = {
  labelKey: string;
  valueKey: string;
};

type DerivedSelectorProps = Omit<BaseSelectorProps, 'renderFn'> & PropKeyProps;

type RadioSelectorProps = DerivedSelectorProps & {
  name: string;
  onChange?: React.ComponentProps<'input'>['onChange'];
  value?: TODO;
};

export function RadioSelector({
  name,
  onChange,
  labelKey,
  valueKey,
  value,
  ...props
}: RadioSelectorProps) {
  return (
    <BaseSelector
      {...props}
      renderFn={options => {
        return options.map((opt, i) => {
          return (
            <ChipButton
              key={`${props.tablename}-opt-${i}`}
              type='radio'
              name={name}
              label={opt[labelKey]}
              value={opt[valueKey]}
              onChange={onChange}
              checked={opt[valueKey] == value}
            />
          );
        });
      }}
    />
  );
}

type CheckboxSelectorProps<T> = DerivedSelectorProps & {
  onChange: (target: T) => void;
  values?: T[];
};

export function CheckboxSelector<T>({
  onChange,
  values,
  labelKey,
  valueKey,
  ...props
}: CheckboxSelectorProps<T>) {
  return (
    <BaseSelector
      {...props}
      renderFn={options => {
        return options.map((opt, i) => {
          return (
            <ChipButton
              type='checkbox'
              key={`${props.tablename}-opt-${i}`}
              label={opt[labelKey]}
              value={opt[valueKey]}
              checked={values.includes(opt[valueKey])}
              onChange={e => {
                console.log(values, opt[valueKey]);
                onChange(opt[valueKey]);
              }}
            />
          );
        });
      }}
    />
  );
}
