/**
 * Plucks the passed properties from an array of objects. Optionally takes a callback to run on the result.
 * @param data
 * @param propertyName
 * @param callback
 */
export function pluckProperty<T extends {}, K extends keyof T, F extends (items: T[K][]) => T[K][]>(data: T[], propertyName: K, callback?: F): ReturnType<F> | T[K][] {
  let items: T[K][] = [];

  for (const item of data) {
    const property = item[propertyName];
    const itemExists = items.includes(property);
    if (!itemExists) {
      items.push(property);
    }
  }

  if (callback) {
    items = callback(items);
  }

  return items;
}
