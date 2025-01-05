import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Check } from '@mui/icons-material';

export const Checkbox = ({
  type = 'checkbox',
  checked,
  ...props
}: React.ComponentProps<'input'> & { type?: 'checkbox' }) => {
  const [isChecked, setChecked] = useState(checked);
  const customCheckboxRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (customCheckboxRef && customCheckboxRef.current) {
      if (isChecked) {
        customCheckboxRef.current.classList.add(styles.selected);
      } else {
        customCheckboxRef.current.classList.remove(styles.selected);
      }
    }

    const e = new Event('change');
    checkboxRef.current!.dispatchEvent(e);
  }, [isChecked]);

  return (
    <>
      <input
        {...props}
        ref={checkboxRef}
        hidden
        type={type}
        checked={isChecked}
      />
      <div
        ref={customCheckboxRef}
        className={styles.checkbox}
        onClick={() => {
          setChecked(prev => !prev);
        }}>
        {isChecked && (
          <Check
            sx={{ zIndex: 10, color: 'white' }}
            className={styles.checkmark}
          />
        )}
      </div>
    </>
  );
};
