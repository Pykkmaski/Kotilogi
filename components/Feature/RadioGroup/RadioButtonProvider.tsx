import { useEffect, useRef, useState } from 'react';
import { PassProps } from '../../Util/PassProps';

export type RadioButtonProviderProps = React.PropsWithChildren &
  React.ComponentProps<'input'> & {
    type?: 'checkbox' | 'radio';
  };

export function RadioButtonProvider({
  children,
  type = 'radio',
  ...props
}: RadioButtonProviderProps) {
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
      <PassProps
        checked={checked}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}>
        {children}
      </PassProps>
    </>
  );
}
