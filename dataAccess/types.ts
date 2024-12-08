export type ObjectDataType = {
  id: string;
  timestamp: string;
  authorId: string;
  title?: string;
  description?: string;
  parentId?: string;
};

export type BuildingDataType = {
  property_id: string;
  color_id: number;
  building_type_id: string;
  building_material_id: string;
  build_year: number;
};

export type ResidenceDataType = ObjectDataType & {
  id?: string;
  building_id: string;
  floor_count: number;
  room_count: number;
  bathroom_count: number;
  living_area: number;
  other_area: number;
  residence_number: number;
  has_garage: boolean;
};

/**
 * @todo Remove columns that have been moved under separate tables.
 */
export type PropertyPayloadType = ObjectDataType &
  Omit<InteriorDataType, 'property_id'> &
  Omit<BuildingDataType, 'property_id'> &
  Omit<RoofDataType, 'property_id'> & {
    streetAddress: string;
    zipCode: string;
    energyClassId: number;
    primaryHeatingSystemId: number;
    secondaryHeatingSystemId: number;
    propertyTypeId: number;
    propertyTypeName: string;
    houseNumber: number;
    hasGarage: boolean;
    heating: TODO;
  };

export type HousePayloadType = PropertyPayloadType & {
  yardOwnershipTypeId: number;
  yardArea: number;
  propertyNumber: string;
};

/**
 * @todo Should extend the residence type in the future.
 */
export type AppartmentPayloadType = PropertyPayloadType & {
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
  date: Date;
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
  property_id: string;
  date: Date;
  labour_expenses: number;
  material_expenses: number;
  event_type_id: number;
  target_id: number;
  service_work_type_id?: number;
};

type HasEventId = { event_id: string };

export type WaterPipeRestorationWorkType = HasEventId & {
  installation_method_id: number;
};

export type SewerPipeRestorationWorkType = HasEventId & {
  restoration_method_id: number;
};

export type ElectricityRestorationWorkType = HasEventId & {
  restoration_work_target_id: number;
};

export type InsulationRestorationWorkType = HasEventId & {
  insulation_material_id: number;
  insulation_target_id: number;
};

export type HeatingMethodRestorationWorkType = HasEventId & {
  old_system_id: number;
  new_system_id: number;
  heating_id: string;
};

export type HeatingDataType = {
  id?: string;
  property_id: string;
  heating_type_id: number;
};

export type OilVesselDataType = {
  volume: number;
  location: string;
  heating_id: string;
};

export type InteriorDataType = {
  property_id?: number;
  room_count: number;
  floor_count: number;
  living_area: number;
  other_area: number;
  bathroom_count: number;
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
