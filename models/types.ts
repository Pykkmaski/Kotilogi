import { PropertyType } from './enums/PropertyType';

export type ObjectDataType = {
  id: string;
  timestamp: number;
  authorId: string;
  title?: string;
  description?: string;
  parentId?: string;
};

export type PropertyDataType = ObjectDataType & {
  streetAddress: string;
  zipCode: string;
  energyClass: string;
  buildingType: number;
  buildingMaterial: number;
  roofType: number;
  roofMaterial: number;
  primaryHeatingSystem: number;
  secondaryHeatingSystem: number;
  buildYear: number;
  floorCount: number;
  roomCount: number;
  livingArea: number;
  otherArea: number;
  propertyType: number;
  wcCount: number;
  houseNumber: number;
  color: number;
  hasGarage: boolean;
};

export type HouseDataType = PropertyDataType & {
  propertyType: PropertyType.HOUSE;
  yardOwnershipType: number;
  yardArea: number;
  propertyNumber: string;
};

export type AppartmentDataType = PropertyDataType & {
  propertyType: PropertyType.APT;
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
  time: number;
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
  startTime: number;
  endTime: number;
};

export type EventStepDataType = ObjectDataType & {
  eventId: string;
  time: number;
  finished?: boolean;
};

export type FileDataType = ObjectDataType & {
  name: string;
  type: string;
  size: number;
};
