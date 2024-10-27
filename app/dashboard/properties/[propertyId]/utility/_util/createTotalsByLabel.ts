import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { totalUtilityDataByTypeLabel } from './totalUtilityDataByLabel';

export const createTotalsByLabels = (data: UtilityDataType[], labels: string[]) => {
  let totals = {};
  for (const label of labels) {
    const totalObj = totalUtilityDataByTypeLabel(data, label);
    totals = {
      ...totals,
      ...totalObj,
    };
  }
  return totals;
};
