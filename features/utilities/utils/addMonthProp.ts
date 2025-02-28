/**Adds a month-property to the prvovided object. */
export const addMonthProp = (entry: TODO, month: number) => {
  return {
    ...entry,
    month: month,
  };
};
