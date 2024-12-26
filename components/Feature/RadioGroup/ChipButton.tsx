import Chip from '@mui/material/Chip';
import colors from 'kotilogi-app/colors';
import { RadioButtonProvider } from './RadioButtonProvider';
import { Check } from '@mui/icons-material';

export type ChipButtonProps = React.ComponentProps<'input'> & {
  label: string;
  type?: 'radio' | 'checkbox';
};

/**Renders a chip that functions as a radio-button or a checkbox. */
export function ChipButton({ label, type = 'radio', checked, ...props }: ChipButtonProps) {
  const borderColor = 'border-slate-300';
  const iconSize = '1.2rem';

  const containerClassName = [
    'flex gap-2 p-2 rounded-md border items-center cursor-pointer relative',
    checked ? 'bg-secondary text-white border-secondary' : `bg-white text-black ${borderColor}`,
  ].join(' ');

  const checkmarkContainerClassName = [
    `w-[1.2rem] h-[1.2rem] border flex items-center justify-center rounded-full`,
    borderColor,
    checked ? 'bg-white' : 'bg-white',
  ].join(' ');

  return (
    <RadioButtonProvider
      {...props}
      type={type}>
      <div className={containerClassName}>
        {checked ? (
          <Check sx={{ fontSize: '1.2rem', fontStyle: 'bold' }} />
        ) : (
          <div className={checkmarkContainerClassName} />
        )}
        <span>{label}</span>
      </div>
    </RadioButtonProvider>
  );
}
