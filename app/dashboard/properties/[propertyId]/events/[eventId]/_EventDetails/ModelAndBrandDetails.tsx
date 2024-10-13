import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';

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
    <div className='flex flex-col gap-4'>
      <h1 className='text-sm font-semibold'>{getTitle()}</h1>
      <LabelGrid.Entry
        label='Malli'
        value={extraData.model}
      />
      <LabelGrid.Entry
        label='Merkki'
        value={extraData.brand}
      />
    </div>
  );
};
