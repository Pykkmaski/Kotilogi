import { z } from 'zod';
import { propertySchema } from '../schemas/propertySchema';

export type PropertyType = z.infer<typeof propertySchema>;
