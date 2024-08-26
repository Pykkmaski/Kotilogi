export function formDataToObject(fdata: FormData) {
  return Array.from(fdata.entries()).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}
