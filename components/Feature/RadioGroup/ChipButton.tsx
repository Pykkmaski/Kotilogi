import Chip from '@mui/material/Chip';
import { useEffect, useRef, useState } from 'react';

/**Renders a chip that functions as a radio-button or a checkbox. */
export function ChipButton({
  label,
  type = 'radio',
  ...props
}: React.ComponentProps<'input'> & { label: string; type?: 'radio' | 'checkbox' }) {
  const [checked, setChecked] = useState(props.checked || false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(inputRef.current?.checked);
  }, [inputRef.current?.checked, props.checked]);

  return (
    <>
      <input
        {...props}
        type={type}
        ref={inputRef}
        hidden
        onChange={e => {
          props.onChange && props.onChange(e);
        }}
      />
      <Chip
        variant={checked ? 'filled' : 'outlined'}
        sx={
          checked && {
            color: 'white',
          }
        }
        color='primary'
        label={label}
        onClick={() => {
          inputRef.current?.click();
        }}
      />
    </>
  );
}
