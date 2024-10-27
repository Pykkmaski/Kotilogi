export const totalByKey = <T extends object>(
  data: T[],
  keyToFilterByOptions: {
    key: string;
    value: string;
  },
  keyToTotalBy: string
) => {
  const total = data
    .filter(d => d[keyToFilterByOptions.key] === keyToFilterByOptions.value)
    .reduce((acc, cur) => (acc += cur[keyToTotalBy]), 0);
  return {
    [keyToFilterByOptions.value]: total,
  };
};
