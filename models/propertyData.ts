import { Knex } from 'knex';
import { createObject, updateObject } from './objectData';

import { ObjectDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import { preparePropertyForDb } from './utils/preparePropertyForDb';
import db from 'kotilogi-app/dbconfig';
import { PropertyType } from './enums/PropertyType';
import { getHouse } from './houseData';
import { getAppartment } from './appartmentData';
import { EnergyClass } from './enums/EnergyClass';

export async function getProperty(id: string) {
  const [type] = await db('data_properties').where({ id }).pluck('propertyType');
  if (type == PropertyType.HOUSE) {
    return await getHouse(id);
  } else if (type == PropertyType.APT) {
    return await getAppartment(id);
  } else {
    throw new Error(`Invalid property type ${type}`);
  }
}

export async function createProperty(
  data: Partial<PropertyDataType>,
  callback: (obj: ObjectDataType, trx: Knex.Transaction) => Promise<void>
) {
  return createObject(data, async (obj, trx) => {
    const data_properties = {
      id: obj.id,
      ...filterValidColumns(data, await getTableColumns('data_properties', trx)),
      energyClass: EnergyClass[data.energyClass != 'Ei Mitään' ? data.energyClass : 'NONE'],
    };

    await trx('data_properties').insert(data_properties);

    await trx('data_propertyOwners').insert({
      propertyId: obj.id,
      userId: obj.authorId,
      timestamp: Date.now(),
    });

    await callback(obj, trx);
  });
}

export async function updateProperty(
  data: Partial<PropertyDataType>,
  callback: (trx: Knex.Transaction) => Promise<void>
) {
  return updateObject(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('data_properties', trx));

    await trx('data_properties').where({ id: data.id }).update(updateObject);
    await callback(trx);
  });
}

export async function getOwners(propertyId: string) {
  return await db('data_propertyOwners').where({ propertyId }).pluck('userId');
}
