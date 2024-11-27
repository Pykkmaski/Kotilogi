import 'server-only';
import { Knex } from 'knex';

import { AppartmentDataType, HouseDataType, PropertyDataType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from './objects';
import { users } from './users';
import { tablenames } from 'kotilogi-app/constants/tablenames';

/**Accesses property data on the db. All accesses to that data should be done through this class. */
class Properties {
  /**Throws an error if the user already has the maximum number of allowed events for a property. */
  async verifyEventCount(propertyId: string) {
    const [{ numEvents }] = await db('events.data')
      .join('objects.data', { 'objects.data.id': 'events.data.id' })
      .where({ 'objects.data.parentId': propertyId })
      .count('* as numEvents');

    if (numEvents >= 100) {
      throw new Error('Et voi lisätä talolle enempää tapahtumia!');
    }
  }

  private async getTableNameByType(typeId: number, trx: Knex.Transaction) {
    const [{ result: types }] = await db('properties.get_property_types');
    return typeId == types['Kiinteistö'] ? 'properties.houses' : 'properties.appartments';
  }

  /**Verifies a property is owned by the user of the current session. Throws an error if not. */
  private async verifyPropertyOwnership(session: { user: { id: string } }, propertyId: string) {
    const [owner] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
    if (!owner) {
      throw new Error('Vain talon omistaja voi poistaa- tai muokata sitä!');
    }
  }

  /**Throws an error if the user with the provided id already has the maximum allowed number of properties. */
  async verifyUserPropertyCount(session: { user: { id: string } }) {
    const [{ numProperties }] = await db('properties.base')
      .join('objects.data', { 'objects.data.id': 'properties.base.id' })
      .where({ authorId: session.user.id })
      .count('* as numProperties');

    if (numProperties >= 2) {
      throw new Error('Et voi lisätä enempää taloja!');
    }
  }

  async get(id: string): Promise<HouseDataType | AppartmentDataType> {
    //Get the type of the property.
    const [type] = await db(tablenames.properties)
      .join(tablenames.propertyTypes, {
        [`${tablenames.propertyTypes}.id`]: `${tablenames.properties}.propertyTypeId`,
      })
      .where({ [`${tablenames.properties}.id`]: id })
      .pluck(`${tablenames.propertyTypes}.name`);

    const baseQuery = db('objects.data')
      .join(tablenames.properties, { [tablenames.properties + '.id']: 'objects.data.id' })
      .join(tablenames.propertyTypes, {
        [tablenames.propertyTypes + '.id']: `${tablenames.properties}.propertyTypeId`,
      });

    const baseColumnsToSelect = [
      'objects.data.*',
      'properties.base.*',
      'properties.propertyTypes.name as propertyTypeName',
    ];

    const targetTableName = type == 'Kiinteistö' ? 'properties.houses' : 'properties.appartments';

    const [p] = await baseQuery
      .join(targetTableName, { [`${targetTableName}.id`]: 'properties.base.id' })
      .where({ [`properties.base.id`]: id })
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
    //await this.verifyUserPropertyCount(session);

    return await objects.create(data, async (obj, trx) => {
      const streetAddress =
        'houseNumber' in data ? `${data.streetAddress} ${data.houseNumber}` : data.streetAddress;

      const data_properties = filterValidColumns(
        data,
        await getTableColumns('base', trx, 'properties')
      );

      await trx('properties.base').insert({
        ...data_properties,
        streetAddress,
        id: obj.id,
      });

      const [propertySchema, propertyTablename] = (
        await this.getTableNameByType(data.propertyTypeId, trx)
      ).split('.');
      const propObj = {
        ...filterValidColumns(data, await getTableColumns(propertyTablename, trx, propertySchema)),
      };

      const property = data as any;
      await trx([propertySchema, propertyTablename].join('.')).insert({
        id: obj.id,
        yardArea: property.yardArea,
        propertyNumber: property.propertyNumber,
        yardOwnershipTypeId: property.yardOwnershipTypeId,
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
        await getTableColumns('base', trx, 'properties')
      );

      await trx('properties.base')
        .where({ id })
        .update({
          ...propertyUpdateObject,
        });

      const [propertySchema, propertyTablename] = (
        await this.getTableNameByType(data.propertyTypeId, trx)
      ).split('.');
      console.log(propertyTablename, propertySchema);
      const propObj = filterValidColumns(
        data,
        await getTableColumns(propertyTablename, trx, propertySchema)
      );
      await trx([propertySchema, propertyTablename].join('.')).where({ id }).update(propObj);
    });
  }

  async del(id: string, password: string) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);
    await users.verifyPassword(session.user.id, password);
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

  /**Updates an owner of a property. */
  async updateOwner(oldOwnerId: string, newOwnerId: string, propertyId: string) {
    await db('data_propertyOwners').where({ userId: oldOwnerId, propertyId }).update({
      userId: newOwnerId,
    });
  }
}

/**Accesses property data on the db. All accesses to that data should be done through this object. */
export const properties = new Properties();
