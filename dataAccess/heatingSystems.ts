import 'server-only';
import db from 'kotilogi-app/dbconfig';
import { z } from 'zod';

export async function createHeatingSystem(data: TODO) {
  z.object({
    propertyId: z.string().uuid(),
    circuitId: z.string().uuid(),
    typeId: z.number(),
  }).parse(data);

  await db('data_heatingSystems').insert(data);
}
