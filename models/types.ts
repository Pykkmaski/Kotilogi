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
  type: number;
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
  startTime: string;
  endTime: string;
};

export type EventStepDataType = ObjectDataType & {
  eventId: string;
  time: string;
  finished?: boolean;
};

export type FileDataType = ObjectDataType & {
  name: string;
  type: string;
  size: number;
};
