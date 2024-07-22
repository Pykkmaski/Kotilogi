/**
 * Filters out all properties of the insert object that are not included in the provided validColumns.
 */
export function filterValidColumns<T extends {}>(insertObj: T, validColumns: string[]) {
  return Object.keys(insertObj)
    .filter(key => validColumns.includes(key))
    .reduce((obj, key) => {
      obj[key] = insertObj[key];
      return obj;
    }, {}) as T;
}
