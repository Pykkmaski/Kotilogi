import { roofSchema } from '../schemas/roofSchema';
import z from 'zod';
export type RoofDataType = z.infer<typeof roofSchema>;
