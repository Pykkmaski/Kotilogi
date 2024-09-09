export function isPropertyIdentifier(identifier: string) {
  const regexp = new RegExp(/^\d+-\d+-\d+-\d+$/);
  return regexp.test(identifier);
}
