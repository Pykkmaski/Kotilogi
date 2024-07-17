import db from 'kotilogi-app/dbconfig';
import { HouseDataType } from './types';
import { createProperty, getOwners, updateProperty } from './propertyData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { preparePropertyForClient, preparePropertyForDb } from './utils/preparePropertyForDb';

export async function getHouse(id: string) {
  const [house] = await db('houseData')
    .where('houseData.id', '=', id)
    .join('objectData', 'objectData.id', '=', 'houseData.id')
    .join('propertyData', 'propertyData.id', '=', 'houseData.id');

  const owners = await getOwners(id);
  return {
    ...house,
    owners,
  };
}

export async function getUserHouses(userId: string): Promise<HouseDataType[]> {
  const userPropertyIds = await db('propertyOwnerData').where({ userId }).pluck('propertyId');
  const data = await db('propertyData')
    .whereIn('propertyData.id', userPropertyIds)
    .join('objectData', 'objectData.id', '=', 'propertyData.id')
    .join('houseData', 'houseData.id', '=', 'propertyData.id');

  return data;
}

export async function createHouse(data: Partial<HouseDataType>) {
  return createProperty(data, async (obj, trx) => {
    const insertObject = preparePropertyForDb(
      filterValidColumns(data, await getTableColumns('houseData', trx))
    );
    await trx('houseData').insert({
      id: obj.id,
      ...insertObject,
    });
  });
}

export async function updateHouse(data: Partial<HouseDataType>) {
  return updateProperty(data, async trx => {
    const updateObject = preparePropertyForDb(
      filterValidColumns(data, await getTableColumns('houseData', trx))
    );

    await trx('houseData').where({ id: data.id }).update(updateObject);
  });
}
