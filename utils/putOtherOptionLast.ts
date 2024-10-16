/**If an array of data contains an entry with the label 'Muu', it will be put last, and that modified array is returned.
 * @returns An array with the 'other'-option put last if it exists, or the passed data unmodified if such an option is not in the array.
 */
export const putOtherOptionLast = <T extends Record<string, number | string>>(data: T[]) => {
  const otherOption = data.find(d => d.label == 'Muu');
  const dataWithoutOtherOption = data.filter(d => d.label != 'Muu');

  if (otherOption) {
    return [...dataWithoutOtherOption, otherOption];
  } else {
    return data;
  }
};
