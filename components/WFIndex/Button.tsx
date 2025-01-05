'use client';
import { useMemo } from 'react';

type ButtonProps = Omit<React.ComponentProps<'button'>, 'className'> & {
  variant: 'primary' | 'secondary';
};

function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const className = useMemo(
    () =>
      [
        'px-4 py-2 rounded-lg',
        variant == 'primary'
          ? 'bg-wf-primary text-black hover:wf-primary-light'
          : variant == 'secondary'
          ? 'bg-wf-secondary text-white hover:wf-secondary-light'
          : '',
      ].join(' '),
    [variant]
  );

  return (
    <button
      {...props}
      className={className}>
      {children}
    </button>
  );
}

type DerivedButtonProps = Omit<ButtonProps, 'variant'>;

export function PrimaryButton({ children, ...props }: DerivedButtonProps) {
  return (
    <Button
      {...props}
      variant='primary'>
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, ...props }: DerivedButtonProps) {
  return (
    <Button
      {...props}
      variant='secondary'>
      {children}
    </Button>
  );
}
