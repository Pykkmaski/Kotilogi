import Spinner from '../Spinner/Spinner';

export type ButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'primary' | 'primary-dashboard' | 'secondary' | 'secondary-filled';
};

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const className = [
    props.className,
    props.hidden ? 'hidden' : '',
    'rounded-md p-2 flex flex-row gap-4',
    variant === 'primary'
      ? 'bg-primary disabled:bg-slate-500'
      : variant === 'secondary-filled'
      ? 'bg-secondary disabled:bg-slate-500'
      : variant === 'primary-dashboard'
      ? 'bg-orange-300 disabled:bg-slate-500'
      : 'bg-transparent text-black',
  ];

  return (
    <button {...props} className={className.join(' ')}>
      {props.loading ? <Spinner size='1.2rem' /> : null}
      {children}
    </button>
  );
}
