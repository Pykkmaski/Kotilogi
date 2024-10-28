import { UtilityDataType } from 'kotilogi-app/dataAccess/types';

/**
 *
 * @param data
 * @returns
 * @deprecated
 */
export const aggregate_old = (data: UtilityDataType[]) => {
  return data.reduce((acc, cur) => {
    const existingEntry = acc.find(e => e.typeLabel == cur.typeLabel);
    if (existingEntry) {
      existingEntry.data.push(cur);
    } else {
      acc.push({
        typeLabel: cur.typeLabel,
        data: [cur],
      });
    }
    return acc;
  }, []);
};

/**Turns aggregated data arrays from the aggregate-function into the total monetaryAmounts. */
export const arraysToValues = (data: { typeLabel: string; data: UtilityDataType[] }[]) => {
  return data.reduce((aggregated, cur) => {
    aggregated.push({
      typeLabel: cur.typeLabel,
      amount: cur.data.reduce((acc, cur) => (acc += cur.monetaryAmount), 0),
    });
    return aggregated;
  }, []);
};

type DataEntryType = {
  month: number;
  total: number;
};

export const getByTypeLabel = (aggregatedData: TODO[], typeLabel) => {
  return aggregatedData.find(d => d.typeLabel == typeLabel)?.data;
};

export const getLongest = (...dataArrays: UtilityDataType[][]) => {
  const maxLenght = Math.max(...dataArrays.map(arr => arr.length));
  return dataArrays.find(arr => arr.length == maxLenght);
};

export const aggregate = (data: UtilityDataType[]) => {
  const aggregatedDataMap = new Map<number, DataEntryType[]>();
  const labels = Array.from(new Set(data.map(d => d.typeLabel)));

  const addMonthData = (q: DataEntryType[], currentMonth: number, entry: UtilityDataType) => {
    const { typeLabel, monetaryAmount } = entry;
    const entryOnMonth = q.find(d => d.month === currentMonth);

    if (entryOnMonth) {
      if (entryOnMonth[typeLabel]) {
        entryOnMonth[typeLabel] += monetaryAmount;
        entryOnMonth.total += monetaryAmount;
      } else {
        entryOnMonth[typeLabel] = monetaryAmount;
        entryOnMonth.total = monetaryAmount;
      }
    } else {
      //Create an entry for the month, and assign the amount for the label.
      const newEntry = {
        month: currentMonth,
        total: monetaryAmount,
      };

      newEntry[typeLabel] = monetaryAmount;
      q.push(newEntry);
    }
  };

  for (const entry of data) {
    const currentDate = new Date(parseInt(entry.time));
    const currentYear = currentDate.getFullYear();

    const q = aggregatedDataMap.get(currentYear);
    if (q) {
      //An array of data exists for the current year.
      addMonthData(q, currentDate.getMonth(), entry);
    } else {
      //Add an entry for the current year, and an entry for the first month, with all labels set to 0.
      const month = currentDate.getMonth();
      const entries: DataEntryType[] = [];
      const newEntry: DataEntryType = {
        month,
        [entry.typeLabel]: entry.monetaryAmount,
        total: entry.monetaryAmount,
      };

      if (month == 0) {
        labels
          .filter(l => l != entry.typeLabel)
          .forEach(label => {
            newEntry[label] = 0;
          });
      } else {
        const firstMonthEntry: DataEntryType = {
          month: 0,
          total: 0,
        };

        labels.forEach(label => (firstMonthEntry[label] = 0));
        entries.push(firstMonthEntry);
      }
      entries.push(newEntry);
      aggregatedDataMap.set(currentYear, entries);
    }
  }

  //Before returning, sort each year's data by month, in ascending order.
  const values = aggregatedDataMap.values();
  for (const value of values) {
    value.sort((a, b) => a.month - b.month);
  }

  return aggregatedDataMap;
};

/**Combines the unprocessed data by month. Optionally combines further by year, if the year argument is provided. */
export const aggregateToMonths = (data: UtilityDataType[], year?: number) => {
  const dataMap = new Map<number, { month: number; year: number; [x: string]: number }[]>();

  for (const entry of data) {
    const currentDate = new Date(parseInt(entry.time));
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const entryOnYear = dataMap.get(currentYear);

    if (entryOnYear) {
      const entryOnMonth = entryOnYear.find(d => d.month == currentMonth);

      if (entryOnMonth) {
        if (entryOnMonth[entry.typeLabel]) {
          entryOnMonth[entry.typeLabel] += entry.monetaryAmount;
        } else {
          entryOnYear.push({
            month: currentMonth,
            year: currentYear,
            [entry.typeLabel]: entry.monetaryAmount,
          });
        }
      }
    } else {
      const labels = Array.from(new Set(data.map(d => d.typeLabel)));
      const newEntry = {
        month: 0,
        year: currentYear,
      };
      labels.forEach(label => (newEntry[label] = 0));
      dataMap.set(currentYear, [newEntry]);
    }
  }
  /*
  const newData = data
    .reduce((acc, cur) => {
      const currentDate = new Date(parseInt(cur.time));
      const currentMonth = currentDate.getMonth();

      if (year && currentDate.getFullYear() != year) return acc;

      const firstMonthEntry = acc.find(d => d.year == year && d.month == currentMonth);
      if (!firstMonthEntry) {
        const entry = { month: 0, year };
        labels.forEach(label => (entry[label] = 0));
        acc.push(entry);
      }

      //Find an entry for the current month.
      const existingEntry = acc.find(entry => entry.month == currentMonth);

      if (existingEntry) {
        //An entry for the current month exists, add data for the current typeLabel.
        if (existingEntry[cur.typeLabel]) {
          existingEntry[cur.typeLabel] += cur.monetaryAmount;
        } else {
          existingEntry[cur.typeLabel] = cur.monetaryAmount;
        }
      } else {
        acc.push({
          month: currentMonth,
          year,
          [cur.typeLabel]: cur.monetaryAmount,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.month - b.month);
  return newData;
  */
};

/**
 * Aggregates the data by year, and by month within a year. Returns the result sorted by year in ascending order.
 */
export const aggregateToYears = (data: UtilityDataType[]) => {
  return data
    .reduce((acc, cur) => {
      const currentYear = new Date(parseInt(cur.time)).getFullYear();
      const existingEntry = acc.find(d => d.year == currentYear);
      if (!existingEntry) {
        acc.push({
          year: currentYear,
          data: aggregateToMonths(data, currentYear),
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);
};
