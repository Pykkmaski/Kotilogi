import { Chip, ChipOwnProps, ChipProps, Color } from '@mui/material';

type ChipDataProps = ChipProps & {
  value?: string | number;
  chipColor?: ChipOwnProps['color'];
};

export function ChipData({ label, value, chipColor = 'primary', ...props }: ChipDataProps) {
  return (
    <div className='flex gap-4 items-center'>
      <Chip
        className='text-lg font-semibold'
        label={label}
        color={chipColor}
        {...props}
      />
      <span className='text-right font-semibold text-lg text-slate-500'>{value}</span>
    </div>
  );
}
