export function getEnumAsDigits(en: object) {
  return Object.values(en).filter(val => typeof val == 'number');
}
