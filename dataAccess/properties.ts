import 'server-only';
import { Knex } from 'knex';
import { createObject, deleteObject, updateObject } from './objects';

import { AppartmentDataType, HouseDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { verifyPassword } from './users';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { z } from 'zod';

const getPropertyDTO = <T extends AppartmentDataType | HouseDataType>(property: T) => {
  return {
    ...property,
    streetAddress:
      property.streetAddress + property.propertyTypeName === 'Huoneisto'
        ? ` ${(property as AppartmentDataType).appartmentNumber}`
        : '',
  };
};

const getPropertyTableNameByType = async (typeId: number, trx: Knex.Transaction) => {
  const [houseTypeId] = await trx('ref_propertyTypes').where({ name: 'Kiinteistö' }).pluck('id');
  return typeId == houseTypeId ? 'data_houses' : 'data_appartments';
};

/**Verifies a property is owned by the user of the current session. Throws an error if not. */
const verifyPropertyOwnership = async (session: { user: { id: string } }, propertyId: string) => {
  const [owner] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
  if (!owner) {
    throw new Error('Vain talon omistaja voi poistaa- tai muokata sitä!');
  }
};

/**Throws an error if the user with the provided id already has the maximum allowed number of properties. */
export const verifyUserPropertyCount = async (session: { user: { id: string } }) => {
  const [{ numProperties }] = await db('data_properties')
    .join('data_objects', { 'data_objects.id': 'data_properties.id' })
    .where({ authorId: session.user.id })
    .count('* as numProperties');

  if (numProperties >= 2) {
    throw new Error('Et voi lisätä enempää taloja!');
  }
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
    .where({ [`data_properties.id`]: id })
    .select([...baseColumnsToSelect, `${targetTableName}.*`]);

  if (!p) {
    console.error(
      `Fetching property ${id}, but got undefined!`,
      `Details: \n
      Property id: ${id}\n
      Target table name: ${targetTableName}
    `
    );
  }
  return p;
}

export async function createProperty(
  data: Partial<PropertyDataType> & Required<Pick<PropertyDataType, 'propertyTypeId'>>,
  callback?: (id: string, trx: Knex.Transaction) => Promise<void>
) {
  //Only allow one property per user.
  const session = await verifySession();
  await verifyUserPropertyCount(session);

  return await createObject(data, async (obj, trx) => {
    const streetAddress =
      'houseNumber' in data ? `${data.streetAddress} ${data.houseNumber}` : data.streetAddress;
    const data_properties = {
      id: obj.id,
      ...filterValidColumns(data, await getTableColumns('data_properties', trx)),
      streetAddress,
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
  const session = await verifySession();
  await verifyPropertyOwnership(session, id);

  return updateObject(id, data, async trx => {
    const propertyUpdateObject = filterValidColumns(
      data,
      await getTableColumns('data_properties', trx)
    );
    await trx('data_properties')
      .where({ id })
      .update({
        ...propertyUpdateObject,
        streetAddress: `${propertyUpdateObject.streetAddress} ${data.houseNumber}`,
      });

    const propTableName = await getPropertyTableNameByType(data.propertyTypeId, trx);
    const propObj = filterValidColumns(data, await getTableColumns(propTableName, trx));
    await trx(propTableName).where({ id }).update(propObj);
  });
}

export async function deleteProperty(id: string, password: string) {
  const session = await verifySession();
  await verifyPropertyOwnership(session, id);

  await verifyPassword(session.user.id, password);

  await deleteObject(id);
}

export async function getOwners(propertyId: string) {
  return await db('data_propertyOwners').where({ propertyId }).pluck('userId');
}

export async function getPropertiesOfUser(
  userId: string
): Promise<(HouseDataType | AppartmentDataType)[]> {
  const ownedProperties = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
  const promises = ownedProperties.map(id => getProperty(id));

  //Filter out undefined properties that may be present due to an error.
  const properties = await Promise.all(promises);
  return properties.filter(property => property !== undefined);
}

export async function getPropertyParts(propertyId: string) {
  const [rooms, heatingCircuits, heatingSystems, [yard], [roof]] = await Promise.all([
    db('data_rooms').where({ propertyId }),
    db('data_heatingCircuits').where({ propertyId }),
    db('data_heatingSystems').where({ propertyId }),
    db('data_yards').where({ propertyId }),
    db('data_roofs').where({ propertyId }),
  ]);

  return {
    rooms,
    heatingCircuits,
    heatingSystems,
    yard,
    roof,
  };
}
