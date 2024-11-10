import 'server-only';
import { Knex } from 'knex';

import { AppartmentDataType, HouseDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { verifyPassword } from './users';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from './objects';

/**Accesses property data on the db. All accesses to that data should be done through this class. */
class Properties {
  private async getTableNameByType(typeId: number, trx: Knex.Transaction) {
    const [houseTypeId] = await trx('ref_propertyTypes').where({ name: 'Kiinteistö' }).pluck('id');
    return typeId == houseTypeId ? 'data_houses' : 'data_appartments';
  }

  /**Verifies a property is owned by the user of the current session. Throws an error if not. */
  private async verifyPropertyOwnership(session: { user: { id: string } }, propertyId: string) {
    const [owner] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
    if (!owner) {
      throw new Error('Vain talon omistaja voi poistaa- tai muokata sitä!');
    }
  }

  /**Throws an error if the user with the provided id already has the maximum allowed number of properties. */
  private async verifyUserPropertyCount(session: { user: { id: string } }) {
    const [{ numProperties }] = await db('data_properties')
      .join('data_objects', { 'data_objects.id': 'data_properties.id' })
      .where({ authorId: session.user.id })
      .count('* as numProperties');

    if (numProperties >= 2) {
      throw new Error('Et voi lisätä enempää taloja!');
    }
  }

  async get(id: string): Promise<HouseDataType | AppartmentDataType> {
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

  async create(
    data: Partial<PropertyDataType> & Required<Pick<PropertyDataType, 'propertyTypeId'>>,
    callback?: (id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    //Only allow one property per user.
    const session = await verifySession();
    await this.verifyUserPropertyCount(session);

    return await objects.create(data, async (obj, trx) => {
      const streetAddress =
        'houseNumber' in data ? `${data.streetAddress} ${data.houseNumber}` : data.streetAddress;
      const data_properties = {
        id: obj.id,
        ...filterValidColumns(data, await getTableColumns('data_properties', trx)),
        streetAddress,
      };

      await trx('data_properties').insert(data_properties);

      const propTableName = await this.getTableNameByType(data.propertyTypeId, trx);
      console.log(propTableName);
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

  /**Updates the property and the underlaying object. */
  async update(
    id: string,
    data: Partial<PropertyDataType> & Required<Pick<PropertyDataType, 'propertyTypeId'>>
  ) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);

    return objects.update(id, data, async trx => {
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

      const propTableName = await this.getTableNameByType(data.propertyTypeId, trx);
      const propObj = filterValidColumns(data, await getTableColumns(propTableName, trx));
      await trx(propTableName).where({ id }).update(propObj);
    });
  }

  async del(id: string, password: string) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);
    await verifyPassword(session.user.id, password);
    await objects.del(id);
  }

  async getOwners(propertyId: string) {
    return await db('data_propertyOwners').where({ propertyId }).pluck('userId');
  }

  async getPropertiesOfUser(userId: string): Promise<(HouseDataType | AppartmentDataType)[]> {
    const ownedProperties = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
    const promises = ownedProperties.map(id => this.get(id));

    //Filter out undefined properties that may be present due to an error.
    const properties = await Promise.all(promises);
    return properties.filter(property => property !== undefined);
  }
}

/**Accesses property data on the db. All accesses to that data should be done through this object. */
export const properties = new Properties();
