'use client';

import { useEffect, useState } from 'react';
import { ChipButton } from './RadioGroup/ChipButton';
import { RadioGroupBody } from './RadioGroup/RadioGroup';
import { FormControl, Input, Label } from '../UI/FormUtils';
import { customStringSchema } from 'kotilogi-app/utils/models/customStringSchema';

export function CustomizableSelector({
  options,
  label,
  type = 'radio',
  name,
  placeholder,
  value,
  onChange,
  breakpointValue = 'Muu',
}: TODO) {
  const [selected, setSelected] = useState(() => (options.includes(value) ? value : null));

  const handleSelectorChange = (e: TODO) => {
    const { value } = e.target;
    setSelected(value);
    if (value !== breakpointValue) {
      onChange(e);
    } else {
      e.target.value = '';
      onChange(e);
    }
  };

  useEffect(() => {
    console.log('current selected: ', selected);
  }, [selected]);

  return (
    <FormControl
      label={label}
      control={
        <div className='flex flex-col gap-4'>
          <RadioGroupBody>
            {options.map((opt, i) => {
              return (
                <ChipButton
                  value={opt}
                  type={type}
                  key={`${name}-${opt}-${i}`}
                  checked={selected == opt}
                  label={opt}
                  name={name}
                  onChange={handleSelectorChange}
                />
              );
            })}
          </RadioGroupBody>
          {selected === breakpointValue && (
            <div className='flex flex-col justify-start'>
              <Label>Mikä?</Label>
              <Input
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                minLength={1}
                maxLength={32}
              />
            </div>
          )}
        </div>
      }
    />
  );
}
