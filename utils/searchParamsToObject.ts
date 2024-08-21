export function searchParamsToObject(searchParams: URLSearchParams) {
  return Array.from(searchParams.entries()).reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {}) as TODO;
}
