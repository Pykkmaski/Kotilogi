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
    street_name: string;
    zip_code: string;
    energy_class_id: number;
    property_type_id: number;
    propertyTypeName: string;
    street_number: number;
    has_garage: boolean;
    heating: HeatingPayloadType[];
    yardArea: number;
    yardOwnershipTypeId: number;
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

export type LockDataType = {
  description?: string;
  id?: string;
  event_id: string;
  model: string;
  brand: string;
  quantity: number;
  lock_type_id: number;
};

export type WindowDataType = {
  description?: string;
  id?: string;
  event_id: string;
  u_value: number;
  min_db_rating: number;
  max_db_rating: number;
  quantity: number;
};

export type RestorationEventType = HasEventId & {
  new_entry_id: string;
  old_entry_id?: string;
};

export type ElectricHeatingRestorationType = {
  electric_heating_method_type_id: number;
};

export type DrainageDitchDataType = {
  toteutusTapaId: number;
};

export type EventPayloadType = ObjectDataType &
  Partial<Omit<WaterPipeRestorationWorkType, 'event_id'>> &
  Partial<Omit<SewerPipeRestorationWorkType, 'event_id'>> &
  Partial<Omit<ElectricityRestorationWorkType, 'event_id'>> &
  Partial<Omit<InsulationRestorationWorkType, 'event_id'>> &
  Partial<Omit<HeatingMethodRestorationWorkType, 'event_id'>> &
  Partial<Omit<RestorationEventType, 'event_id'>> &
  Partial<Omit<DrainageDitchDataType, 'property_id'>> &
  Partial<RoofDataType> & {
    property_id: string;
    date: Date;
    labour_expenses: number;
    material_expenses: number;
    event_type_id: number;
    target_id: number;
    service_work_type_id?: number;
    windows?: WindowDataType[];
    locks?: LockDataType[];
    heating?: HeatingPayloadType[];
    surfaces?: number[];
  };

type HasEventId = { event_id: string };

export type WaterPipeRestorationWorkType = HasEventId & {
  installation_method_id: number;
};

export type SewerPipeRestorationWorkType = HasEventId & {
  restoration_method_type_id: number;
};

export type ElectricityRestorationWorkType = HasEventId & {
  restoration_work_target_id: number;
};

export type InsulationRestorationWorkType = HasEventId & {
  insulation_material_id: number;
  insulation_target_id: number;
};

export type HeatingMethodRestorationWorkType = HasEventId &
  ElectricHeatingRestorationType & {
    old_system_id: number;
    new_system_id: number;
    event_id: string;
  };

export type HeatingDataType = {
  id?: string;
  property_id: string;
  heating_type_id: number;
};

export type HeatingPayloadType = HeatingDataType &
  Omit<Partial<HeatingCenterDataType>, 'heating_id'> &
  Omit<Partial<OilVesselDataType>, 'heating_id'> &
  Omit<Partial<WarmWaterReservoirDataType>, 'heating_id'> & {
    is_primary?: boolean;
    deleted?: boolean;
  };

export type HeatingCenterDataType = {
  heating_id: string;
  model: string;
  brand: string;
};

export type OilVesselDataType = {
  volume: number;
  location: string;
  heating_id: string;
};

export type WarmWaterReservoirDataType = {
  heating_id: string;
  volume: number;
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
