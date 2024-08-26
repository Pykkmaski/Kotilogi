import { formDataToObject } from '../formDataToObject';

describe('Testing the formDataToObject utility function.', () => {
  it('Returns all the keys and values of a FormData object, as a plain js-object.', () => {
    const fdata = new FormData();
    fdata.append('key1', '1');
    fdata.append('key2', '2');
    const obj = formDataToObject(fdata);
    expect(obj).toEqual({
      key1: '1',
      key2: '2',
    });
  });
});
