import Button, { ButtonProps } from './Button';

/**
 * Short-hand component for defining secondary-buttons.
 * @param props
 * @returns
 */
export function SecondaryButton(props: ButtonProps) {
  return (
    <Button
      variant='primary'
      {...props}
    />
  );
}
