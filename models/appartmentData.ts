import db from 'kotilogi-app/dbconfig';
import { AppartmentDataType } from './types';
import { createProperty, getOwners, updateProperty } from './propertyData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

export async function getAppartment(id: string) {
  const [apt] = await db('propertyData')
    .where('propertyData.id', '=', id)
    .join('appartmentData', 'appartmentData.id', '=', 'propertyData.id')
    .join('objectData', 'objectData.id', '=', 'propertyData.id');

  const owners = await getOwners(id);
  return {
    ...apt,
    owners,
  };
}

export async function getUserAppartments(userId: string) {
  const userPropertyIds = await db('propertyOwnerData').where({ userId }).pluck('propertyId');
  return db('propertyData')
    .whereIn('propertyData.id', userPropertyIds)
    .join('appartmentData', 'appartmentData.id', '=', 'propertyData.id')
    .join('objectData', 'objectData.id', '=', 'propertyData.id');
}

export async function createAppartment(data: Partial<AppartmentDataType>) {
  return createProperty(data, async (obj, trx) => {
    const insertObject = filterValidColumns(data, await getTableColumns('appartmentData', trx));
    await trx('appartmentData').insert({
      id: obj.id,
      ...insertObject,
    });
  });
}

export async function updateAppartment(data: Partial<AppartmentDataType>) {
  return updateProperty(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('appartmentData', trx));
    console.log(updateObject);
    await trx('appartmentData').where({ id: data.id }).update(updateObject);
  });
}
