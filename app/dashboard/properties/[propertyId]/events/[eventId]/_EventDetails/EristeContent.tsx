import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';

export const EristeContent = () => {
  const { extraData } = useEventDetailsContext();
  return (
    <>
      <div className='flex items-center gap-8'>
        <LabelGrid.Entry
          label='Materiaali'
          value={extraData.materialLabel}
        />

        <LabelGrid.Entry
          label='Kohde'
          value={extraData.targetLabel}
        />
      </div>
    </>
  );
};
