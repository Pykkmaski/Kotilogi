import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

/**All heating events refer to a model and a brand, of whatever is producing or distributing the heat, like the oil-vessel in oil heating. */
export const ModelAndBrandDetails = () => {
  const { extraData } = useEventDetailsContext();
  const getTitle = () => {
    //These should refer to the id in the db instead to prevent bugs in the future if the names are changed.
    switch (extraData.newSystemLabel) {
      case 'Sähkö':
        return 'Lämminvesivaraaja';
    }
  };

  return (
    <div className='flex flex-row gap-8 w-full'>
      <LabelGrid.Entry
        label='Malli'
        value={(extraData && extraData.model) || 'Ei määritelty'}
      />

      <LabelGrid.Entry
        label='Merkki'
        value={(extraData && extraData.brand) || 'Ei määritelty'}
      />
    </div>
  );
};
