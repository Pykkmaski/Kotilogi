import 'server-only';
import db from 'kotilogi-app/dbconfig';
import { z } from 'zod';

export async function createRoom(data: TODO) {
  z.object({
    floorNumber: z.number(),
    propertyId: z.string().uuid(),
    width: z.number(),
    height: z.number(),
    length: z.number(),
  }).parse(data);

  const [floorCount] = await db('data_properties')
    .where({ id: data.propertyId })
    .pluck('floorCount');
  if (data.floorNumber > floorCount || data.floorNumber < 0) {
    //Prevent adding rooms on floors that don't exist.
    throw new Error('Virheellinen huoneen kerros!');
  }

  await db('data_rooms').insert(data);
}
