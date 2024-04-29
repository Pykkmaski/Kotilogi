import { filterIntoObject, getLongest } from '../array';

describe('Testing filterIntoObject', () => {
  it('Returns object with expected properties', () => {
    const array = [{ type: 'heat' }, { type: 'water' }, { type: 'water' }];
    const expected = { water: [{ type: 'water' }, { type: 'water' }] };

    const obj = filterIntoObject(array, 'type', ['water']);
    expect(obj).toEqual(expected);
  });
});

describe('Testing getLongest', () => {
  it('Correctly returns the longest array', () => {
    const g = n => Array(n).fill(0);
    const result = getLongest(g(1), g(3), g(2));
    expect(result.length).toBe(3);
  });
});
