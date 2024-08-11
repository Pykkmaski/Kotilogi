import db from 'kotilogi-app/dbconfig';
import { AppartmentDataType } from './types';
import { createProperty, getOwners, updateProperty } from './propertyData';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';

export async function getAppartment(id: string) {
  const [apt] = await db('data_properties')
    .join('data_appartments', { 'data_appartments.id': 'data_properties.id' })
    .join('data_objects', { 'data_objects.id': 'data_properties.id' })
    .where({ 'data_properties.id': id });

  return apt;
}

export async function getUserAppartments(userId: string) {
  const userPropertyIds = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
  return db('data_properties')
    .whereIn('data_properties.id', userPropertyIds)
    .join('data_appartments', { 'data_appartments.id': 'data_properties.id' })
    .join('data_objects', { 'data_objects.id': 'data_properties.id' });
}

export async function createAppartment(data: Partial<AppartmentDataType>) {
  return createProperty(data, async (obj, trx) => {
    const insertObject = filterValidColumns(data, await getTableColumns('data_appartments', trx));
    await trx('data_appartments').insert({
      id: obj.id,
      ...insertObject,
    });
  });
}

export async function updateAppartment(data: Partial<AppartmentDataType>) {
  return updateProperty(data, async trx => {
    const updateObject = filterValidColumns(data, await getTableColumns('data_appartments', trx));
    console.log(updateObject);
    await trx('data_appartments').where({ id: data.id }).update(updateObject);
  });
}
