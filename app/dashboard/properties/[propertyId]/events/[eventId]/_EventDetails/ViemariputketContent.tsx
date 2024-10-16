import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';

export const ViemariputketContent = () => {
  const { extraData } = useEventDetailsContext();
  return (
    <>
      <div className='flex items-center gap-8'>
        <LabelGrid.Entry
          label='Toteutustapa'
          value={extraData.toteutusTapaLabel}
        />
      </div>
    </>
  );
};
