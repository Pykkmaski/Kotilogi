import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { ModelAndBrandDetails } from './ModelAndBrandDetails';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

export const HeatingTypeContent = () => {
  const { extraData } = useEventDetailsContext();
  return (
    <>
      <div className='flex items-center gap-8'>
        <RenderOnCondition condition={extraData.oldSystemLabel}>
          <LabelGrid.Entry
            label='Vanha Järjestelmä'
            value={extraData.oldSystemLabel}
          />
        </RenderOnCondition>

        <LabelGrid.Entry
          label='Uusi Järjestelmä'
          value={extraData.newSystemLabel}
        />

        <RenderOnCondition condition={extraData.newSystemLabel == 'Sähkö'}>
          <LabelGrid.Entry
            label='Sähkölämmityksen Tyyppi'
            value={extraData.methodLabel}
          />
        </RenderOnCondition>
      </div>
      <ModelAndBrandDetails />
    </>
  );
};
