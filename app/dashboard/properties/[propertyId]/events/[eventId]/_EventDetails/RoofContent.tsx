import { Chip } from '@mui/material';
import { useEventDetailsContext } from './EventDetails';

export const RoofContent = () => {
  const { mainData, extraData } = useEventDetailsContext();

  const ChipEntry = ({ label, value }) => (
    <div className='flex flex-col gap-2'>
      <label className='text-sm text-slate-500'>{label}</label>
      <Chip
        label={value}
        color='secondary'
      />
    </div>
  );
  return (
    <>
      <div className='w-full gap-4 items-center'>
        <ChipEntry
          label='Katon tyyppi'
          value={extraData.roofTypeLabel}
        />
      </div>
    </>
  );
};
