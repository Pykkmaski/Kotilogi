import { Knex } from 'knex';
import { createObject, updateObject } from './objectData';

import { AppartmentDataType, HouseDataType, ObjectDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { PropertyType } from './enums/PropertyType';

const getPropertyTableNameByType = async (typeId: number, trx: Knex.Transaction) => {
  const [houseTypeId] = await trx('ref_propertyTypes').where({ name: 'Kiinteistö' }).pluck('id');
  return typeId == houseTypeId ? 'data_houses' : 'data_appartments';
};

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
  data: Partial<PropertyDataType> & Required<Pick<PropertyDataType, 'propertyTypeId'>>,
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  return createObject(data, async (obj, trx) => {
    const data_properties = {
      id: obj.id,
      ...filterValidColumns(data, await getTableColumns('data_properties', trx)),
    };

    await trx('data_properties').insert(data_properties);

    const propTableName = await getPropertyTableNameByType(data.propertyTypeId, trx);
    const propObj = filterValidColumns(data, await getTableColumns(propTableName, trx));
    await trx(propTableName).insert({
      ...propObj,
      id: obj.id,
    });

    await trx('data_propertyOwners').insert({
      propertyId: obj.id,
      userId: obj.authorId,
      timestamp: Date.now(),
    });

    callback && (await callback(obj.id, trx));
  });
}

export async function updateProperty(
  id: string,
  data: Partial<PropertyDataType> & Required<Pick<PropertyDataType, 'propertyTypeId'>>
) {
  return updateObject({ id, ...data }, async trx => {
    const propertyUpdateObject = filterValidColumns(
      data,
      await getTableColumns('data_properties', trx)
    );
    await trx('data_properties').where({ id }).update(propertyUpdateObject);

    const propTableName = await getPropertyTableNameByType(data.propertyTypeId, trx);
    const propObj = filterValidColumns(data, await getTableColumns(propTableName, trx));
    await trx(propTableName).where({ id }).update(propObj);
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
