import { UtilityDataType } from 'kotilogi-app/models/types';

export const aggregate = (data: UtilityDataType[]) => {
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

export const getByTypeLabel = (aggregatedData: TODO[], typeLabel) => {
  return aggregatedData.find(d => d.typeLabel == typeLabel)?.data;
};

export const getLongest = (...dataArrays: UtilityDataType[][]) => {
  const maxLenght = Math.max(...dataArrays.map(arr => arr.length));
  return dataArrays.find(arr => arr.length == maxLenght);
};

/**Combines the unprocessed data by month. */
export const aggregateToMonths = (data: UtilityDataType[]) => {
  return data
    .reduce((acc, cur) => {
      const currentDate = new Date(parseInt(cur.time));
      const currentMonth = currentDate.getMonth();

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
          [cur.typeLabel]: cur.monetaryAmount,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.month - b.month);
};
