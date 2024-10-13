import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { translateColumnName } from 'kotilogi-app/dataAccess/utils/translateColumnName';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

export const HormiContent = () => {
  const { mainData } = useEventDetailsContext();
  console.log(mainData);
  return Object.entries(mainData).map(([key, value], i) => (
    <LabelGrid.Entry
      key={`extraData-${i}`}
      label={translateColumnName(key)}
      value={typeof value == 'Date' ? timestampToISOString(value.getTime().toString()) : value}
    />
  ));
};
