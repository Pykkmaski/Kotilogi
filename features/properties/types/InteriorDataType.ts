import { z } from 'zod';
import { interiorSchema } from '../schemas/interiorSchema';
export type InteriorDataType = z.infer<typeof interiorSchema>;
