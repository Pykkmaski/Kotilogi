import { z } from 'zod';
import { eventSchema } from 'kotilogi-app/utils/models/eventSchema';
import { roofSchema } from 'kotilogi-app/utils/models/roofSchema';
import { buildingSchema } from 'kotilogi-app/utils/models/buildingSchema';

export type ObjectDataType = {
  id: string;
  timestamp: string;
  authorId: string;
  title?: string;
  description?: string;
  parent_id?: string;
};

export type BuildingDataType = z.infer<typeof buildingSchema>;

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
    energy_class_year: number;
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
  property_id: string;
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
  lock_type: number;
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

export type EventPayloadType = z.infer<typeof eventSchema>;

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
    name?: string;
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

export type RoofDataType = z.infer<typeof roofSchema>;

export type FileDataType = ObjectDataType & {
  name: string;
  type: string;
  size: number;
};
