import { isPropertyIdentifier } from '../isPropertyIdentifier';

describe('Testing isPropertyIdentifier', () => {
  it('Returns true on a valid property identifier', () => {
    const id = '123-123-123-10';
    expect(isPropertyIdentifier(id)).toBe(true);
  });

  it('Returns false on an invalid property identifier', () => {
    const id = '123-123-123';
    expect(isPropertyIdentifier(id)).toBe(false);
  });

  it('Returns false if undefined or null is passed as an argument', () => {
    expect(isPropertyIdentifier(undefined)).toBe(false);
    expect(isPropertyIdentifier(null)).toBe(false);
  });
});
