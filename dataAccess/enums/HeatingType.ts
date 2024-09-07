export enum HeatingType {
  NONE = 0,
  /**Kaukolämpö */
  DISTRICT,
  ELECTRIC,
  FIREPLACE,

  /**Ilmalämpöpumppu */
  AIRHEAT,

  /**Vesi-ilmalämpöpumppu */
  AIR_TO_WATER,

  /**Maalämpö */
  GROUND,
  OIL,
  OTHER,
}
