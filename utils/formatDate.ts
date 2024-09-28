export const formatDate = (date: Date) => {
  if (!date) return undefined;

  return `
    ${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}
  `;
};
