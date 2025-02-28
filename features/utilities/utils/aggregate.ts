import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { filterUtilityDataByOptions } from './filterUtilityDataByOptions';
import { createTotalsByLabels } from './createTotalsByLabel';

/**@deprecated */
export const aggregate = (data: UtilityDataType[], year?: number) => {
  const filtered = filterUtilityDataByOptions(data, { years: year && [year] });
  const labels = Array.from(new Set(filtered.map(f => f.typeLabel)));
  return createTotalsByLabels(filtered, labels);
};
