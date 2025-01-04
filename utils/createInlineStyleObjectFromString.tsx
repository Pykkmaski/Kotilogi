export function createInlineStyleObjectFromString(inlineString: string) {
  return inlineString
    .split(';')
    .filter(Boolean) // Remove any empty strings
    .reduce((style, rule) => {
      const [property, value] = rule.split(':').map(str => str.trim());
      if (property && value) {
        style[toCamelCase(property)] = value;
      }
      return style;
    }, {});
}

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}
