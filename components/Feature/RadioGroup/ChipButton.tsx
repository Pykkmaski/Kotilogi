import Chip from '@mui/material/Chip';
import { blue } from '@mui/material/colors';
import colors from 'kotilogi-app/colors';
import { useEffect, useRef, useState } from 'react';

type ChipButtonProps = React.ComponentProps<'input'> & {
  label: string;
  type?: 'radio' | 'checkbox';
};

/**Renders a chip that functions as a radio-button or a checkbox. */
export function ChipButton({ label, type = 'radio', ...props }: ChipButtonProps) {
  const [checked, setChecked] = useState(props.checked || false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(inputRef.current?.checked);
  }, [inputRef.current?.checked, props.checked]);

  const baseChipStyling = {
    color: checked && 'white',
    backgroundColor: checked ? colors.secondary : 'white',
  };

  return (
    <>
      <input
        {...props}
        type={type}
        ref={inputRef}
        hidden
        onChange={e => {
          console.log('Chip button state: ', e.target.checked, e.target.value);
          props.onChange && props.onChange(e);
        }}
      />
      <Chip
        variant={checked ? 'filled' : 'outlined'}
        sx={baseChipStyling}
        label={label}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      />
    </>
  );
}
