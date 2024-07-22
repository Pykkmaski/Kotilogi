export enum UtilityType {
  ALL = 0,
  HEAT,
  WATER,
  ELECTRIC,
}

export const getUtilityTypeLabel = (val: UtilityType) =>
  val == UtilityType.ELECTRIC
    ? 'electric'
    : val == UtilityType.HEAT
    ? 'heat'
    : val == UtilityType.WATER
    ? 'water'
    : 'all';
