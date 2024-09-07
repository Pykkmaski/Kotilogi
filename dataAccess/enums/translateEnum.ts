export function translateEnum(
  enumName: string,
  lang: string = 'fi',
  callback: () => string | null
) {
  const result = callback();
  if (!result) throw new Error(`Translation for ${enumName} in ${lang} not available!`);
  return result;
}
