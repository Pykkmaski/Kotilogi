export function isUUID(val: string) {
  const sequences = val.split('-');
  if (sequences.length !== 5) return false;

  const pattern = [8, 4, 4, 4, 12];
  for (let i = 0; i < sequences.length; ++i) {
    const current = sequences.at(i);
    if (current.length !== pattern.at(i)) {
      return false;
    }
  }

  return true;
}
