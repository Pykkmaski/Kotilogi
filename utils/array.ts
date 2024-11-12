/**
 * Splits the contents of an object array by the defined key, into an object containing arrays of all objects with the
 * value of the key set to a value contained in the values-array.
 */

export function filterIntoObject<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K,
  values: T[K][]
): Record<T[K], T[]> {
  const obj = {} as Record<T[K], T[]>;

  for (const val of values) {
    if (val in obj) continue;
    obj[val] = arr.filter(item => item[key] === val);
  }

  return obj as Record<T[K], T[]>;
}

/**Finds the first longest array and returns it. */
export function getLongest<T extends []>(...args: T[]) {
  var longest = args[0];

  for (const arr of args) {
    if (arr.length > longest.length) {
      longest = arr;
    }
  }

  return longest;
}
