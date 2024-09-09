export function isPropertyIdentifier(identifier: string) {
  const regexp = new RegExp(/^\d{3}-\d{3}-\d{3}-\d+$/);
  return regexp.test(identifier);
}
