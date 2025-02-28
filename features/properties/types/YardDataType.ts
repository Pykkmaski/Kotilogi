import z from 'zod';
import { yardSchema } from '../schemas/yardSchema';
export type YardDataType = z.infer<typeof yardSchema>;
