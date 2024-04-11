export function formatNumber(n: number) {
  return n.toLocaleString('fi', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
