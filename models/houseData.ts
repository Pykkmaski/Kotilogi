import db from 'kotilogi-app/dbconfig';
import { HouseDataType } from './types';
import { createProperty, getOwners, updateProperty } from './propertyData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { preparePropertyForClient, preparePropertyForDb } from './utils/preparePropertyForDb';

export async function getHouse(id: string) {
  const [house] = await db('data_houses')
    .where('data_houses.id', '=', id)
    .join('data_objects', 'data_objects.id', '=', 'data_houses.id')
    .join('data_properties', 'data_properties.id', '=', 'data_houses.id');

  const owners = await getOwners(id);
  return {
    ...house,
    owners,
  };
}

export async function getUserHouses(userId: string): Promise<HouseDataType[]> {
  const userPropertyIds = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
  const data = await db('data_properties')
    .whereIn('data_properties.id', userPropertyIds)
    .join('data_objects', 'data_objects.id', '=', 'data_properties.id')
    .join('data_houses', 'data_houses.id', '=', 'data_properties.id');

  return data;
}

export async function createHouse(data: Partial<HouseDataType>) {
  return createProperty(data, async (obj, trx) => {
    const insertObject = preparePropertyForDb(
      filterValidColumns(data, await getTableColumns('data_houses', trx))
    );
    await trx('data_houses').insert({
      id: obj.id,
      ...insertObject,
    });
  });
}

export async function updateHouse(data: Partial<HouseDataType>) {
  return updateProperty(data, async trx => {
    const updateObject = preparePropertyForDb(
      filterValidColumns(data, await getTableColumns('data_houses', trx))
    );

    await trx('data_houses').where({ id: data.id }).update(updateObject);
  });
}
