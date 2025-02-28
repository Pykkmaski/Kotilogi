import { buildingSchema } from '../schemas/buildingSchema';
import z from 'zod';
export type BuildingDataType = z.infer<typeof buildingSchema>;
