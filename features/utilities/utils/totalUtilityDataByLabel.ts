import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { totalByKey } from 'kotilogi-app/utils/totalByKey';

/**Totals the monetary amount of utility entries by type label.
 * @returns An object containing the total keyed by the type label.
 */
export const totalUtilityDataByTypeLabel = (data: UtilityDataType[], typeLabel: string) => {
  return totalByKey(
    data,
    {
      key: 'type',
      value: typeLabel,
    },
    'monetaryAmount'
  );
};
