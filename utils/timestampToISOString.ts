export function timestampToISOString(timestamp: string) {
  return new Date(parseInt(timestamp)).toISOString().split('T').at(0);
}
