import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';

export const KayttovesiputketContent = () => {
  const { extraData } = useEventDetailsContext();
  return (
    <>
      <div className='flex items-center gap-8'>
        <LabelGrid.Entry
          label='Asennustapa'
          value={extraData.asennusTapaLabel}
        />
      </div>
    </>
  );
};
