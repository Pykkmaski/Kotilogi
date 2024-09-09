import { timestampToISOString } from '../timestampToISOString';

describe('Testing timestampToISOString', () => {
  it('Returns the date without the part after the T', () => {
    const now = new Date();
    const isoString = timestampToISOString(now.getTime().toString());
    const expected = now.toISOString().split('T')[0];
    expect(isoString).toEqual(expected);
  });
});
