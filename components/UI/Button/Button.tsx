import Spinner from '../Spinner';

export type ButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'primary' | 'accent';
};

/**
 *
 * @deprecated
 * @returns
 */
export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const className = [
    props.className,
    props.hidden ? 'hidden' : '',
    'rounded-md p-2 flex flex-row gap-4 disabled:bg-slate-500',
    variant === 'primary' ? 'bg-primary' : 'bg-accent text-white',
  ];

  return (
    <button
      {...props}
      className={className.join(' ')}>
      {props.loading ? <Spinner size='1.2rem' /> : null}
      {children}
    </button>
  );
}
