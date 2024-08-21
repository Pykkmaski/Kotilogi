/**
 * Takes a string and appends new characters to it, adding a filler character once every interval.
 * @param currentString
 * @param newInput
 * @param count
 * @param filler
 */

export function formatString(
  currentString: string,
  newInput: string,
  interval: number,
  filler: string
) {
  var newString = currentString;

  if (newString.split(' ').join('').length % interval === 0) {
    newString += filler;
  }

  newString += newInput;

  return newString;
}
