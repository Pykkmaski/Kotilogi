export type ObjectDataType = {
  id: string;
  timestamp: string;
  authorId: string;
  title?: string;
  description?: string;
  parentId?: string;
};

export type PropertyDataType = ObjectDataType & {
  streetAddress: string;
  zipCode: string;
  energyClassId: number;
  buildingTypeId: number;
  buildingMaterialId: number;
  roofTypeId: number;
  roofMaterialId: number;
  primaryHeatingSystemId: number;
  secondaryHeatingSystemId: number;
  buildYear: number;
  floorCount: number;
  roomCount: number;
  livingArea: number;
  otherArea: number;
  propertyTypeId: number;
  propertyTypeName: string;
  wcCount: number;
  houseNumber: number;
  mainColorId: number;
  hasGarage: boolean;
};

export type HouseDataType = PropertyDataType & {
  yardOwnershipTypeId: number;
  yardArea: number;
  propertyNumber: string;
};

export type AppartmentDataType = PropertyDataType & {
  appartmentNumber: number;
  floorNumber: number;
  hasBalcony: boolean;
};

export type UtilityDataType = ObjectDataType & {
  monetaryAmount: number;
  unitAmount: number;
  label: string;
  typeId: number;
  typeLabel: string;
  unitSymbol: string;
  time: string;
};

export type HistoryDataType = {
  id: string;
  refId: string;
  columnName: string;
  oldValue: string;
  newValue: string;
  reason?: string;
};

export type EventDataType = ObjectDataType & {
  propertyId: string;
  date: Date;
  labourExpenses: number;
  materialExpenses: number;
  mainTypeId: number;
  targetId: number;
  workTypeId: number;
  mainTypeLabel?: string;
  workTypeLabel?: string;
  targetLabel?: string;
};

export type RoofDataType = {
  roofMaterialId: number;
  roofTypeId: number;
  neliometrit: number;
  kaltevuus: string;
  raystasTyyppiId: number;
  otsalautaTyyppiId: number;
  aluskateTyyppiId: number;
  colorId: number;
  harjatuuletusAluskatteella: boolean;
  suojakasiteltyPuutavara: boolean;
  piipunpellitys: boolean;
  seinatikas: boolean;
  lapetikas: boolean;
  lumieste: boolean;
  kattosilta: boolean;
  turvatikas: boolean;
  kourut: boolean;
  syoksysarja: boolean;
};

export type FileDataType = ObjectDataType & {
  name: string;
  type: string;
  size: number;
};
