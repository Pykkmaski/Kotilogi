import { RadioButtonProvider, RadioButtonProviderProps } from './RadioButtonProvider';

type BigButtonProps = RadioButtonProviderProps;

export function BigButton({ children, ...props }: BigButtonProps) {
  const { checked: selected } = props;
  const className = [
    'flex flex-col p-16 rounded-lg shadow-md w-full items-center justify-center cursor-pointer active:bg-secondary active:text-white',
    selected ? 'bg-secondary shadow-secondary' : 'bg-white',
  ].join(' ');

  return (
    <RadioButtonProvider {...props}>
      <div className={className}>{children}</div>
    </RadioButtonProvider>
  );
}
