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
    const [{ result: types }] = await db('property.get_property_types');
    return typeId == types['Kiinteistö'] ? 'property.houses' : 'property.appartments';
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
    const [{ numProperties }] = await db('property.overview')
      .join('objects.data', { 'objects.data.id': 'property.overview.id' })
      .where({ authorId: session.user.id })
      .count('* as numProperties');

    if (numProperties >= 2) {
      throw new Error('Et voi lisätä enempää taloja!');
    }
  }

  async getTypes() {
    const [{ result }] = await db('property.propertyTypes').select(
      db.raw('json_object_agg(name, id) as result')
    );
    return result;
  }

  async getPropertyType(property_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('property.overview').where({ id: property_id }).pluck('property_type_id');
  }

  async get(id: string): Promise<HousePayloadType | AppartmentPayloadType> {
    //Get the type of the property.
    const [type_id] = await this.getPropertyType(id, db);

    const overviewPromise = db('property.overview')
      .join('objects.data', { 'objects.data.id': 'property.overview.id' })
      .join('property.propertyTypes', {
        'property.propertyTypes.id': 'property.overview.property_type_id',
      })
      .where({ 'property.overview.id': id })
      .select(
        'objects.data.*',
        'property.overview.*',
        'property.propertyTypes.name as propertyTypeName'
      );

    const interiorPromise = interiors.get(id, db);
    const buildingPromise = buildings.get(id, db);
    const heatingPromise = heating.get(id, db);
    const roofPromise = roofs.get(id, db);

    const [[overview], [interior], [building], heatingData, [roof]] = await Promise.all([
      overviewPromise,
      interiorPromise,
      buildingPromise,
      heatingPromise,
      roofPromise,
    ]);

    const propertyTypes = await this.getTypes();

    /**Properties can be either houses or appartments. Determine the table from which to fetch the rest of the data. */
    const targetTableName =
      type_id == propertyTypes['Kiinteistö'] ? 'property.houses' : 'property.appartments';

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
      ...p,
      heating: heatingData,
    };
  }

  async create(
    data: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>,
    callback?: (id: string, trx: Knex.Transaction) => Promise<void>
  ) {
    //Only allow one property per user.
    const session = await verifySession();
    //await this.verifyUserPropertyCount(session);

    return await objects.create(data, async (obj, trx) => {
      //Property columns
      await insertViaFilter(
        { ...data, id: obj.id },
        {
          tablename: 'overview',
          schema: 'property',
        },
        trx
      );

      const heatingPromises: Promise<void>[] = [];
      data.heating?.forEach(async (item: TODO) => {
        heatingPromises.push(
          heating.create(
            {
              ...item,
              property_id: obj.id,
            },
            trx
          )
        );
      });

      const buildingPromise = buildings.create(obj.id, data, trx);
      const interiorPromise = interiors.create(obj.id, data, trx);
      const roofPromise = roofs.create(obj.id, data, trx);
      await Promise.all([...heatingPromises, buildingPromise, interiorPromise, roofPromise]);

      const [propertySchema, propertyTablename] = (
        await this.getTableNameByType(data.property_type_id, trx)
      ).split('.');

      const property = data as any;
      await insertViaFilter(
        {
          id: obj.id,
          yardArea: property.yardArea,
          propertyNumber: property.propertyNumber,
          yardOwnershipTypeId: property.yardOwnershipTypeId,
        },
        {
          tablename: propertyTablename,
          schema: propertySchema,
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

  /**Updates the property and the underlaying object. */
  async update(
    id: string,
    payload: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>
  ) {
    const session = await verifySession();
    await this.verifyPropertyOwnership(session, id);

    await objects.update(id, payload, async trx => {
      const propertyUpdateObject = filterValidColumns(
        payload,
        await getTableColumns('overview', trx, 'property')
      );

      //Update base property
      const overviewPromise = trx('property.overview')
        .where({ id })
        .update({
          ...propertyUpdateObject,
        });

      const buildingPromise = buildings.update(id, payload, trx);
      const interiorPromise = interiors.update(id, payload, trx);
      const heatingPromises = payload.heating?.map(hd =>
        heating.update(
          hd.id,
          {
            ...hd,
            property_id: id,
          },
          trx
        )
      );

      const roofPromise = roofs.create(id, payload, trx);
      await Promise.all([
        overviewPromise,
        buildingPromise,
        interiorPromise,
        roofPromise,
        ...heatingPromises,
      ]);

      const [propertySchema, propertyTablename] = (
        await this.getTableNameByType(payload.property_type_id, trx)
      ).split('.');

      const propObj = filterValidColumns(
        payload,
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
