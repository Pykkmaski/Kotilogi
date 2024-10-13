import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { ModelAndBrandDetails } from './ModelAndBrandDetails';

export const HeatingTypeContent = () => {
  const { extraData } = useEventDetailsContext();
  return (
    <>
      <div className='flex items-center gap-8'>
        <LabelGrid.Entry
          label='Vanha Järjestelmä'
          value={extraData.oldSystemLabel}
        />
        <LabelGrid.Entry
          label='Uusi Järjestelmä'
          value={extraData.newSystemLabel}
        />

        {extraData.newSystemLabel == 'Sähkö' && (
          <LabelGrid.Entry
            label='Sähkölämmityksen Tyyppi'
            value={extraData.methodLabel}
          />
        )}
      </div>
      <ModelAndBrandDetails />
    </>
  );
};
