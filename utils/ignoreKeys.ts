export function ignoreKeys<T extends Record<string, any>>(obj: T, keysToIgnore: string[]) {
  const entries = Object.entries(obj).filter(([key]) => !keysToIgnore.includes(key));
  return Object.fromEntries(entries);
}
