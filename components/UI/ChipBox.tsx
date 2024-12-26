import { ReactNode } from 'react';
import {
  RadioButtonProvider,
  RadioButtonProviderProps,
} from '../Feature/RadioGroup/RadioButtonProvider';

type ChipBoxProps = RadioButtonProviderProps & {
  icon: ReactNode;
  label: ReactNode;
};

export function ChipBox({ icon, label, ...props }: ChipBoxProps) {
  const { checked: selected } = props;

  const className = [
    'flex flex-row lg:gap-4 xs:gap-2 lg:p-4 xs:p-2 rounded-md border border-slate-200 w-full cursor-pointer',
    selected ? 'bg-secondary text-white' : 'bg-white text-black',
  ].join(' ');

  return (
    <RadioButtonProvider {...props}>
      <div className={className}>
        {icon}
        {label}
      </div>
    </RadioButtonProvider>
  );
}
