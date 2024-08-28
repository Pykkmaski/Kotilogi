export function isDateValue(val: string) {
  const parts = val.split('-');
  for (const part of parts) {
    const parsedValue = parseInt(part);
    if (isNaN(parsedValue)) return false;
  }

  return true;
}
