import { Chip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { List } from '../New/List';
import { Spacer } from '../New/Spacer';

type RadioGroupProps = React.PropsWithChildren & {
  name: string;
};

/**Renders its provided radio-inputs inside a ul, automatically adding the name-prop on each child. */
export function RadioGroup({ children, name }: RadioGroupProps) {
  return (
    <List
      direction='row'
      gap={2}
      alignItems='center'>
      {React.Children.map(children as React.ReactElement, (child, index) => {
        if (!child) return null;

        return React.cloneElement(child, {
          ...child.props,
          name,
        });
      })}
    </List>
  );
}

export function RadioButton({
  name,
  value,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <Spacer gap={4}>
      <input
        name={name}
        value={value}
        {...props}
        type='radio'
      />
      <label>{label}</label>
    </Spacer>
  );
}

export function ChipButton({
  label,
  type = 'radio',
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  const [checked, setChecked] = useState(props.checked);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(inputRef.current?.checked);
  }, [inputRef.current?.checked, props.checked]);

  return (
    <>
      <input
        {...props}
        type='radio'
        ref={inputRef}
        hidden
        onChange={e => {
          props.onChange && props.onChange(e);
        }}
      />
      <Chip
        variant={checked ? 'filled' : 'outlined'}
        color='primary'
        label={label}
        onClick={() => {
          inputRef.current?.click();
        }}
      />
    </>
  );
}
