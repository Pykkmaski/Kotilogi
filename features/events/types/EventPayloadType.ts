import { eventSchema } from '../schemas/eventSchema';
import z from 'zod';
export type EventPayloadType = z.infer<typeof eventSchema>;
