import { UtilityDataType } from 'kotilogi-app/dataAccess/types';

/**Filters the provided utility data and returns the result sorted by date in ascending order.
 * @param data An array of utility data.
 * @param options An object taking arrays of years and labels, used to filter the data by.
 */
export const filterUtilityDataByOptions = (
  data: UtilityDataType[],
  options?: {
    years?: number[];
    months?: number[];
    labels?: string[];
  }
) => {
  const { years, labels, months } = options;
  return data
    .filter(d => {
      const date = d.date;
      let result = true;

      if (years) {
        result = result && years.includes(date.getFullYear());
      }

      if (months) {
        result = result && months.includes(date.getMonth());
      }

      if (labels) {
        result = result && labels.includes(d.typeLabel);
      }

      return result;
    })
    .sort((a, b) => {
      const ats = a.date.getTime();
      const bts = b.date.getTime();
      return ats - bts;
    });
};
