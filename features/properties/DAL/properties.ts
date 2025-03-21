import 'server-only';
import { Knex } from 'knex';

import { getTableColumns } from '../../../dataAccess/utils/getTableColumns';
import { filterValidColumns } from '../../../dataAccess/utils/filterValidColumns';
import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from '../../../dataAccess/objects';
import { users } from '../../../dataAccess/users';
import { insertViaFilter, updateViaFilter } from '../../../dataAccess/utils/insertViaFilter';
import { heating } from '../../events/DAL/heating';
import { buildings } from './buildings';
import { interiors } from './interiors';
import { roofs } from '../../events/DAL/roofs';
import { events } from '../../events/DAL/events';
import { propertySchema } from '../schemas/propertySchema';
import { KDError, PropertyError, UserError } from 'kotilogi-app/utils/error';
import { PropertyPayloadType } from '../types/PropertyPayloadType';
import { ActionReturnType } from 'kotilogi-app/dataAccess/types';

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
  async get(
    id: string
  ): Promise<Omit<PropertyPayloadType, 'roof' | 'heating'> & { propertyTypeName: string }> {
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
    const [[overview], [interior], [building] /*heatingMethods*/] = await Promise.all([
      overviewPromise,
      interiorPromise,
      buildingPromise,
      //heatingPromise,
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
      interior: interior,
      building: building,
      yard: { yardArea: p?.yardArea, yardOwnershipTypeId: p?.yardOwnershipTypeId },
      //heating: heatingMethods,
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
    let result: ActionReturnType<string> = {
      code: 0,
      data: null,
    };

    //Only allow one property per user.
    const env = process.env.NODE_ENV;
    if (env === 'production') {
      const session = await verifySession();
      try {
        await this.verifyUserPropertyCount(session);
      } catch (err) {
        result.code = KDError.LIMIT_HIT;
        return result;
      }
    }

    await objects.create(async (obj, trx) => {
      data.id = obj.id;
      const propertyData = propertySchema.parse(data);
      await trx('property').insert(propertyData);
      //Update the object's description. This is a duct-tape fix.
      if (data.description) {
        await trx('object').where({ id: obj.id }).update({ description: data.description });
      }

      //Should create a heating method genesis event.
      if (data.heating) {
        await events.create(
          {
            title: 'Lämmitystietojen lisäys',
            property_id: obj.id,
            event_type: 'Genesis',
            target_type: 'Lämmitysmuoto',
            date: new Date(),
            data: { heating_types: data.heating },
          } as any,
          trx
        );
      }

      const buildingPromise = buildings.create(obj.id, data.building, trx);
      const interiorPromise = interiors.create(obj.id, data.interior, trx);
      const roofPromise = roofs.create(obj.id, data.roof, trx);

      await Promise.all([buildingPromise, interiorPromise, roofPromise]);
      const propertyTableName = await this.getTableNameByType(data.property_type_id, trx);
      const property = data as any;
      await insertViaFilter(
        {
          id: obj.id,
          yardArea: property.yard?.yardArea,
          propertyNumber: property.propertyNumber,
          yardOwnershipTypeId: property.yard?.yardOwnershipTypeId,
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
      result.data = obj.id;
      callback && (await callback(obj.id, trx));
    });

    return result;
  }

  /**Updates the property and the underlaying object, building, interior and yard data.*/
  async update(
    id: string,
    payload: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>
  ) {
    const result: ActionReturnType<string> = {
      code: 0,
      data: null,
    };

    if (process.env.NODE_ENV === 'production') {
      const session = await verifySession();
      try {
        await this.verifyPropertyOwnership(session, id);
      } catch (err) {
        console.log(err.message);
        result.code = UserError.NOT_OWNER;
        return result;
      }
    }

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

      const buildingPromise = buildings.update(id, payload.building, trx);
      const interiorPromise = interiors.update(id, payload.interior, trx);
      await Promise.all([overviewPromise, buildingPromise, interiorPromise]);

      const propertyTablename = await this.getTableNameByType(payload.property_type_id, trx);

      const propObj = {
        ...filterValidColumns(payload, await getTableColumns(propertyTablename, trx)),
        yardArea: payload.yard?.yardArea,
        yardOwnershipTypeId: payload.yard?.yardOwnershipTypeId,
      };

      await trx(propertyTablename).where({ id }).update(propObj);
      result.data = id;
    });

    return result;
  }

  /**Deletes a property. */
  async del(id: string, password: string) {
    //Make sure there are no transfer tokens.
    const transferToken = await db('property_transfer_code')
      .where({ propertyId: id })
      .select('expires')
      .first();

    if (transferToken && new Date() < transferToken.expires) {
      //A token exists, and has not expired.
      return PropertyError.OPEN_TRANSFERS;
    } else {
      //Delete the expired transfer code.
      await db('property_transfer_code').where({ propertyId: id }).del();
    }

    //Only allow the owner of a property to delete it.
    const session = await verifySession();
    try {
      await this.verifyPropertyOwnership(session, id);
    } catch (err) {
      return UserError.NOT_OWNER;
    }

    //Verify the passed password.
    try {
      await users.verifyPassword(session.user.id, password);
    } catch (err) {
      const msg = err.message;
      if (msg.includes('virheellinen')) {
        return UserError.INVALID_PASSWORD;
      }
    }

    await objects.del(id);
    return 0;
  }

  /**Gets all owners of a property. */
  async getOwners(propertyId: string) {
    return await db('data_propertyOwners').where({ propertyId }).pluck('userId');
  }

  /**Gets all properties a user is the owner of. */
  async getPropertiesOfUser(userId: string): Promise<PropertyPayloadType[]> {
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
