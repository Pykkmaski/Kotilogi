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
  const iconSize = '1.2rem';

  const containerClassName = [
    'flex gap-2 p-2 rounded-md items-center cursor-pointer relative border border-gray-200',
    checked ? 'bg-gray-500 text-white' : `bg-white text-black`,
  ].join(' ');

  return (
    <RadioButtonProvider
      {...props}
      type={type}>
      <div className={containerClassName}>
        {checked && (
          <Check
            sx={{ fontSize: '1.2rem', fontStyle: 'bold' }}
            className='transition-transform duration-100'
          />
        )}
        <span>{label}</span>
      </div>
    </RadioButtonProvider>
  );
}
