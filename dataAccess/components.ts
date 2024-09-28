import db from 'kotilogi-app/dbconfig';
import { z } from 'zod';

export async function addComponent(propertyId: string, data: any) {
  z.object({
    typeId: z.string({
      required_error: 'A typeId is required in the component data!',
      invalid_type_error: 'The typeId of a component must be a string!',
    }),
  }).parse(data);

  if (data.typeLabel == 'Ulkopuoli') {
    await db('data_exteriors').insert({
      propertyId: propertyId,
      mainColorId: data.mainColorId,
      buildingTypeId: data.buildingTypeId,
      buildingMaterialId: data.buildingMaterialId,
    });
  } else if (data.typeLabel == 'Lämmityspiiri') {
    await db('data_heatingCircuits').insert({
      propertyId,
      heatingCircuitTypeId: data.typeId,
    });
  } else {
    throw new Error('Unsupported component type! ' + data.typeLabel);
  }
}
