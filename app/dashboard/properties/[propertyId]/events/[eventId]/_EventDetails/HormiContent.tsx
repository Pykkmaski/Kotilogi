import { LabelGrid } from '@/components/New/LabelGrid';
import { useEventDetailsContext } from './EventDetails';
import { translateColumnName } from 'kotilogi-app/dataAccess/utils/translateColumnName';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

export const HormiContent = () => {
  const { mainData } = useEventDetailsContext();
  console.log(mainData);
  return null;
};
