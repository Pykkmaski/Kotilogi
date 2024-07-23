import { Chip, ChipOwnProps, Color } from '@mui/material';

type ChipDataProps = {
  label: string;
  value?: string | number;
  chipColor: ChipOwnProps['color'];
};

export function ChipData({ label, value, chipColor = 'primary' }: ChipDataProps) {
  return (
    <div className='flex gap-4 items-baseline'>
      <Chip
        className='text-lg font-semibold'
        label={label}
        color={chipColor}
      />
      <span>{value}</span>
    </div>
  );
}
