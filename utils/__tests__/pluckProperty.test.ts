import { pluckProperty } from '../pluckProperty';

describe('Testing the pluckProperty-function', () => {
  const testValue1 = 12;
  const testValue2 = 15;

  const testData = [
    {
      test: testValue1,
      test1: 'kalja',
    },
    {
      test: testValue2,
      test1: 'kilju',
    },
  ];

  it('Returns the correct result without a callback', () => {
    const result = pluckProperty(testData, 'test');
    expect(result.length).toBe(2);
    expect(result.includes(testValue1)).toBeTruthy();
    expect(result.includes(testValue2)).toBeTruthy();
  });

  it('Returns the correct result with a callback', () => {
    const result = pluckProperty([...testData], 'test', items => {
      return items.sort((a, b) => {
        return a - b;
      });
    });

    expect(result.length).toBe(2);
    expect(result).toEqual([testValue1, testValue2]);
  });
});
