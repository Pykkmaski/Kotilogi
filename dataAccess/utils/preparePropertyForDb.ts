import { PropertyDataType } from '../types';
import { divideByOneHundred, multiplyByOneHundred } from './convertNumeralUnits';

/**Multiplies all area fields of a property by one hundred */
export function preparePropertyForDb<T extends PropertyDataType>(data: Partial<T>) {
  const preparedFields = Object.entries(data)
    .filter(
      ([key, val]) =>
        key == 'livingArea' || key == 'otherArea' || (key == 'yardArea' && typeof val == 'number')
    )
    .reduce((obj, [key, val]) => {
      obj[key] = multiplyByOneHundred(val);
      return obj;
    }, {}) as Partial<{
    livingArea: number;
    otherArea: number;
    yardArea: number;
  }>;

  return {
    ...data,
    ...preparedFields,
  } as Partial<T>;
}

/**Divides all area fields by 100 */
export function preparePropertyForClient<T extends PropertyDataType>(data: T) {
  const preparedFields = Object.entries(data)
    .filter(
      ([key, val]) =>
        (key == 'livingArea' || key == 'otherArea' || key == 'yardArea') && typeof val == 'number'
    )
    .reduce((obj, [key, val]: [string, number]) => {
      obj[key] = divideByOneHundred(val);
      return obj;
    }, {}) as {
    livingArea: number;
    otherArea: number;
    yardArea: number;
  };

  return {
    data,
    ...preparedFields,
  } as unknown as T;
}
