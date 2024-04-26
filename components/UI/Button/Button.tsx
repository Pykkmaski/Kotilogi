import Spinner from '../Spinner';

export type ButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'primary' | 'primary-dashboard' | 'secondary' | 'tertiary' | 'secondary-filled';
};

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const className = [
    props.className,
    props.hidden ? 'hidden' : '',
    'rounded-md p-2 flex flex-row gap-4 disabled:bg-slate-500',
    variant === 'primary'
      ? 'bg-primary'
      : variant === 'secondary-filled'
      ? 'bg-secondary'
      : variant === 'primary-dashboard'
      ? 'bg-tertiary '
      : variant === 'tertiary'
      ? 'bg-tertiary'
      : 'bg-transparent text-black',
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