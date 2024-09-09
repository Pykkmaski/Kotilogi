import stringTimestampToDate from '../stringTimestampToDate';

describe('Testing stringTimestampToDate', () => {
  it('Transforms a string timestamp correctly into a Date-string', () => {
    const now = new Date();
    const timestamp = now.getTime();
    const derivedDate = stringTimestampToDate(timestamp.toString());
    expect(derivedDate).toBe(now.toLocaleDateString('fi-FI'));
  });

  it('Returns null when the passed string length is 0', () => {
    expect(stringTimestampToDate('')).toBeNull();
  });

  it('Returns null when passing undefined or null', () => {
    expect(stringTimestampToDate(undefined)).toBeNull();
    expect(stringTimestampToDate(null)).toBeNull();
  });
});
