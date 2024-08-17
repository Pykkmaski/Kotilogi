import { Knex } from 'knex';
import { createObject, updateObject } from './objectData';

import { ObjectDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import { preparePropertyForDb } from './utils/preparePropertyForDb';
import db from 'kotilogi-app/dbconfig';
import { PropertyType } from './enums/PropertyType';
import { getHouse, getUserHouses } from './houseData';
import { getAppartment, getUserAppartments } from './appartmentData';
import { EnergyClass } from './enums/EnergyClass';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export async function getProperty(id: string) {
  const [type] = await db('data_properties')
    .join('ref_propertyTypes', { 'ref_propertyTypes.id': 'data_properties.propertyTypeId' })
    .where({ 'data_properties.id': id })
    .pluck('ref_propertyTypes.name');

  if (type == 'Kiinteistö') {
    return await getHouse(id);
  } else {
    return await getAppartment(id);
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

export async function getUserProperties(userId: string) {
  const [houses, appartments] = await Promise.all([
    getUserHouses(userId),
    getUserAppartments(userId),
  ]);

  return [...houses, ...appartments];
}
