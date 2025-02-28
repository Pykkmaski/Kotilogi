import z from 'zod';
import { PropertyType } from './PropertyType';
import { RoofDataType } from 'kotilogi-app/features/events/types/RoofDataType';
import { InteriorDataType } from './InteriorDataType';
import { BuildingDataType } from './BuildingDataType';
import { YardDataType } from './YardDataType';

export type PropertyPayloadType = PropertyType & {
  roof?: RoofDataType;
  interior?: InteriorDataType;
  building?: BuildingDataType;
  yard?: YardDataType;
  heating?: string[];
};
