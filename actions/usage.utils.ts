import { UtilityDataType } from 'kotilogi-app/dataAccess/types';

//Merges the passed usage data into an array of 12 items corresponding to each month of the year.
export function mergeByMonth(data: UtilityDataType[], accumulate: boolean = false) {
  const merged: number[] = [];

  const getDataForMonth = (month: number, data: UtilityDataType[]) =>
    data.filter(d => {
      const dataMonth = new Date(d.date).getMonth();
      return dataMonth === month;
    });

  for (var month = 0; month < 12; ++month) {
    const dataOnMonth = getDataForMonth(month, data);

    const priceOnMonth = dataOnMonth.reduce((acc, cur) => acc + cur.monetaryAmount, 0);
    const previousPrice = month > 0 ? merged[month - 1] : 0;

    const priceToSave = accumulate ? previousPrice + priceOnMonth : priceOnMonth;
    merged.push(priceToSave);
  }

  for (let i = merged.length - 1; i >= 0; --i) {
    if (merged[i] === 0) {
      merged[i] = null;
    } else {
      break;
    }
  }

  return merged;
}

/**
 * Returns an array of 12 elements. Each element is an array of usage data corresponding to the month represented by the parent array index (0: January - 12: December)
 * @param data
 */
export function splitByMonth(data: UtilityDataType[]) {
  const newData: UtilityDataType[][] = Array(12).fill([]);

  for (let month = 0; month < 12; ++month) {
    const dataOnMonth = data.filter(d => new Date(d.date).getMonth() === month);
    newData[month] = dataOnMonth;
  }

  return newData;
}

export function getYears(data: UtilityDataType[]): number[] {
  const years: number[] = [];

  for (const entry of data) {
    const year = new Date(entry.date).getFullYear();
    if (!years.find(item => item === year)) {
      years.push(year);
    }
  }

  years.sort((a, b) => a - b);

  return years;
}
