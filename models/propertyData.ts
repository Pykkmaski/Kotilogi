import { Knex } from 'knex';
import { createObject, updateObject } from './objectData';

import { AppartmentDataType, HouseDataType, ObjectDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';

export async function getProperty(id: string): Promise<HouseDataType | AppartmentDataType> {
  //Get the type of the property.
  const [type] = await db('data_properties')
    .join('ref_propertyTypes', { 'ref_propertyTypes.id': 'data_properties.propertyTypeId' })
    .where({ 'data_properties.id': id })
    .pluck('ref_propertyTypes.name');

  const baseQuery = db('data_objects')
    .join('data_properties', { 'data_properties.id': 'data_objects.id' })
    .join('ref_propertyTypes', { 'ref_propertyTypes.id': 'data_properties.propertyTypeId' });

  const baseColumnsToSelect = [
    'data_objects.*',
    'data_properties.*',
    'ref_propertyTypes.name as propertyTypeName',
  ];

  const targetTableName = type == 'Kiinteistö' ? 'data_houses' : 'data_appartments';

  const [p] = await baseQuery
    .join(targetTableName, { [`${targetTableName}.id`]: 'data_properties.id' })
    .where({ [`${targetTableName}.id`]: id })
    .select([...baseColumnsToSelect, `${targetTableName}.*`]);
  return p;
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

export async function getUserProperties(
  userId: string
): Promise<(HouseDataType | AppartmentDataType)[]> {
  const ownedProperties = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
  const promises = ownedProperties.map(id => getProperty(id));
  return await Promise.all(promises);
}
