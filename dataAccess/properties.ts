import 'server-only';
import { Knex } from 'knex';

import {
  AppartmentPayloadType,
  BuildingDataType,
  HousePayloadType,
  InteriorDataType,
  PropertyPayloadType,
} from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from './objects';
import { users } from './users';
import { insertViaFilter, updateViaFilter } from './utils/insertViaFilter';
import { heating } from './heating';
import { buildings } from './buildings';
import { interiors } from './interiors';
import { roofs } from './roofs';
import { events } from './events';

/**Accesses property data on the db. All accesses to that data should be done through this class. */
class Properties {
  /**Throws an error if the user already has the maximum number of allowed events for a property. */
  async verifyEventCount(propertyId: string) {
    const [{ numEvents }] = await db('event')
      .join('object', { 'object.id': 'event.id' })
      .where({ 'object.parentId': propertyId })
      .count('* as numEvents');

    if ((numEvents as TODO) >= 75) {
      throw new Error('Et voi lisätä talolle enempää tapahtumia!');
    }
  }

  /**Returns the name of the database-table that contains the specific data related to a property, depending on its type. */
  private async getTableNameByType(typeId: number, trx: Knex.Transaction) {
    const [{ result: types }] = (await trx('types.property_type').select(
      db.raw('json_object_agg(name, id) as result')
    )) as TODO;

    return typeId == types['Kiinteistö'] ? 'house' : 'appartment';
  }

  /**Verifies a property is owned by the user of the current session. Throws an error if not. */
  private async verifyPropertyOwnership(session: { user: { id: string } }, propertyId: string) {
    const [owner] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
    if (!owner) {
      throw new Error('Vain talon omistaja voi poistaa- tai muokata sitä!');
    }
  }

  /**Throws an error if the user with the provided id already has the maximum allowed number of property. */
  async verifyUserPropertyCount(session: { user: { id: string } }) {
    const [{ numProperties }] = (await db('property')
      .join('object', { 'object.id': 'property.id' })
      .where({ authorId: session.user.id })
      .count('* as numProperties')) as [{ numProperties: number }];

    if (numProperties >= 2) {
      throw new Error('Et voi lisätä enempää taloja!');
    }
  }

  async getTypes() {
    const [{ result }] = (await db('types.property_type').select(
      db.raw('json_object_agg(name, id) as result')
    )) as TODO;
    return result;
  }

  async getPropertyType(property_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('property').where({ id: property_id }).pluck('property_type_id');
  }

  /**Fetches a property from the database, by joining it's building, roof, interior, yard and heating data. */
  async get(id: string): Promise<HousePayloadType | AppartmentPayloadType> {
    //The base property data.
    const overviewPromise = db('property')
      .join('object', { 'object.id': 'property.id' })
      .join('types.property_type', {
        'types.property_type.id': 'property.property_type_id',
      })
      .where({ 'property.id': id })
      .select('object.*', 'property.*', 'types.property_type.name as propertyTypeName');

    const interiorPromise = interiors.get(id, db);
    const buildingPromise = buildings.get(id, db);
    const heatingPromise = heating.get(id, db);
    const roofPromise = roofs.get(id, db);

    const [[overview], [interior], [building], heatingMethods, [roof]] = await Promise.all([
      overviewPromise,
      interiorPromise,
      buildingPromise,
      heatingPromise,
      roofPromise,
    ]);

    const [type_id] = await this.getPropertyType(id, db);
    const propertyTypes = await this.getTypes();

    /**Properties can be either houses or appartments. Determine the table from which to fetch the rest of the data. */
    const targetTableName = type_id == propertyTypes['Kiinteistö'] ? 'house' : 'appartment';

    const [p] = await db(targetTableName)
      .where({ id: overview.id })
      .select([`${targetTableName}.*`]);

    if (!p) {
      console.error(
        `Fetching property ${id}, but got undefined!`,
        `Details: \n
        Property id: ${id}\n
        Target table name: ${targetTableName}
      `
      );
    }

    return {
      ...overview,
      ...interior,
      ...building,
      ...roof,
      heating: heatingMethods,
      ...p,
    };
  }

  /**Creates a new property.
   * Also creates an object into the objects data table, which the property referes to,
   * and creates an owner-entry into the owners table, setting the user id to the logged in user's id.
   */
  async create(
    data: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>,
    /**An optional callback for inserting aditional data after the property, using the same transaction.
     */
    callback?: (property_id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    //Only allow one property per user.
    const session = await verifySession();
    //await this.verifyUserPropertyCount(session);

    return await objects.create(data, async (obj, trx) => {
      //Property columns
      await insertViaFilter(
        { ...data, id: obj.id },
        {
          tablename: 'property',
        },
        trx
      );

      const heatingPromises: Promise<void>[] = [];
      data.heating?.map(async (item: TODO) =>
        heating.create(
          {
            ...item,
            property_id: obj.id,
          },
          trx
        )
      );

      const buildingPromise = buildings.create(obj.id, data, trx);
      const interiorPromise = interiors.create(obj.id, data, trx);
      const roofPromise = roofs.create(obj.id, data, trx);
      await Promise.all([buildingPromise, interiorPromise, roofPromise, heatingPromises]);

      const propertyTableName = await this.getTableNameByType(data.property_type_id, trx);

      const property = data as any;
      await insertViaFilter(
        {
          id: obj.id,
          yardArea: property.yardArea,
          propertyNumber: property.propertyNumber,
          yardOwnershipTypeId: property.yardOwnershipTypeId,
        },
        {
          tablename: propertyTableName,
        },
        trx
      );

      await trx('data_propertyOwners').insert({
        propertyId: obj.id,
        userId: obj.authorId,
        timestamp: Date.now(),
      });

      callback && (await callback(obj.id, trx));
    });
  }

  /**Updates the property and the underlaying object, it's roof, building, interior and yard data.*/
  async update(
    id: string,
    payload: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>
  ) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);

    await objects.update(id, payload, async trx => {
      const propertyUpdateObject = filterValidColumns(
        payload,
        await getTableColumns('property', trx)
      );

      //Update base property
      const overviewPromise = trx('property')
        .where({ id })
        .update({
          ...propertyUpdateObject,
        });

      const buildingPromise = buildings.update(id, payload, trx);
      const interiorPromise = interiors.update(id, payload, trx);

      //Update heating.
      const heatingPromises = payload.heating?.map(async hd => {
        const { id: heatingId } = hd;

        if (heatingId) {
          if (!hd.deleted) {
            await heating.update(heatingId, hd, trx);
          } else {
            await heating.del(heatingId, trx);
          }
        } else {
          await heating.create(
            {
              ...hd,
              property_id: id,
            },
            trx
          );
        }
      });
      const [existingRoof] = await trx('roof').where({ property_id: id }).pluck('property_id');
      let roofPromise: Promise<number | number[]>;
      if (existingRoof) {
        roofPromise = roofs.update(id, payload, trx);
      } else {
        roofPromise = roofs.create(id, payload, trx);
      }

      await Promise.all([
        overviewPromise,
        buildingPromise,
        interiorPromise,
        roofPromise,
        ...heatingPromises,
      ]);

      const propertyTablename = await this.getTableNameByType(payload.property_type_id, trx);

      const propObj = filterValidColumns(payload, await getTableColumns(propertyTablename, trx));

      await trx(propertyTablename).where({ id }).update(propObj);
    });
  }

  /**Deletes a property. */
  async del(id: string, password: string) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);
    await users.verifyPassword(session.user.id, password);
    await objects.del(id);
  }

  /**Gets all owners of a property. */
  async getOwners(propertyId: string) {
    return await db('data_propertyOwners').where({ propertyId }).pluck('userId');
  }

  /**Gets all properties a user is the owner of. */
  async getPropertiesOfUser(userId: string): Promise<(HousePayloadType | AppartmentPayloadType)[]> {
    const ownedProperties = await db('data_propertyOwners').where({ userId }).pluck('propertyId');
    const promises = ownedProperties.map(id => this.get(id));

    //Filter out undefined properties that may be present due to an error.
    const property = await Promise.all(promises);
    return property.filter(property => property !== undefined);
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
