import db from 'kotilogi-app/dbconfig';
import { z } from 'zod';

export async function createHeatingCircuit(data: TODO) {
  z.object({
    propertyId: z.string().uuid(),
    typeId: z.number(),
    isPrimary: z.boolean(),
  }).parse(data);

  if (data.isPrimary == true) {
    //Prevent adding of two primary heating circuits.
    const [primaryHeatingCircuit] = await db('data_heatingCircuits')
      .where({
        propertyId: data.propertyId,
        isPrimary: true,
      })
      .select('id');

    if (primaryHeatingCircuit) {
      throw new Error('Talolla on jo päälämmityspiiri!');
    }
  }

  await db('data_heatingCircuits').insert(data);
}
