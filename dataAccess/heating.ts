import 'server-only';
import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';
import { insertViaFilter } from './utils/insertViaFilter';
import { EventPayloadType, HeatingCenterDataType, HeatingPayloadType } from './types';
import { getTableColumns } from './utils/getTableColumns';
import { filterValidColumns } from './utils/filterValidColumns';
import { objects } from './objects';

class Heating {
  private async getHeatingCenter(heating_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('heating.heating_center').where({ heating_id }).select('model', 'brand');
  }

  /**Returns the primary heating system of a property. */
  async getPrimary(property_id: string, ctx: Knex.Transaction | Knex) {
    const [primaryHeatingLabel] = await ctx('heating.primary_heating')
      .join(db.raw('heating.data ON heating.data.id = heating.primary_heating.heating_id'))
      .join(db.raw('types.heating_type ON types.heating_type.id = heating.data.heating_type_id'))
      .select('types.heating_type.name as heating_type_label')
      .where({ 'heating.primary_heating.property_id': property_id })
      .pluck('types.heating_type.name');

    return primaryHeatingLabel;
  }

  async getTypes(ctx: Knex.Transaction | Knex) {
    const [{ result }] = await ctx('types.heating_type').select(
      db.raw('json_object_agg(name, id) as result')
    );
    return result;
  }

  /**Returns an array containing all heating systems of a property. */
  async get(property_id: string, ctx: Knex.Transaction | Knex): Promise<HeatingPayloadType[]> {
    const heatingData = await ctx('heating.data')
      .join(db.raw('types.heating_type ON types.heating_type.id = heating.data.heating_type_id'))
      .where({ property_id })
      .select('heating.data.*', 'types.heating_type.name as heating_type_label');

    if (heatingData.length == 0) {
      return [];
    }

    const primaryHeatingPromise = ctx('heating.primary_heating')
      .where({ property_id })
      .pluck('heating_id');

    const heatingTypesPromise = this.getTypes(ctx);
    const [[primaryHeatingId], heatingTypes] = await Promise.all([
      primaryHeatingPromise,
      heatingTypesPromise,
    ]);
    const payloads: HeatingPayloadType[] = [];

    for (const hd of heatingData) {
      const heating_type_id = parseInt(hd.heating_type_id);
      let payload = null;

      switch (heating_type_id) {
        case heatingTypes['Öljy']:
          {
            const centerPromise = this.getHeatingCenter(hd.id, ctx);
            const vesselPromise = ctx('heating.oil_vessel')
              .where({ heating_id: hd.id })
              .select('volume', 'location');

            const [[center], [vessel]] = await Promise.all([centerPromise, vesselPromise]);

            payload = {
              ...hd,
              ...vessel,
              ...center,
            };
          }
          break;

        case heatingTypes['Kaukolämpö']:
          {
            const [center] = await this.getHeatingCenter(hd.id, ctx);
            payload = {
              ...hd,
              ...center,
            };
          }
          break;

        case heatingTypes['Sähkö']:
          {
            const centerPromise = this.getHeatingCenter(hd.id, ctx);
            const reservoirPromise = ctx('heating.warm_water_reservoir')
              .where({ heating_id: hd.id })
              .select('volume');

            const [[center], [warm_water_reservoir]] = await Promise.all([
              centerPromise,
              reservoirPromise,
            ]);

            payload = {
              ...hd,
              ...center,
              ...warm_water_reservoir,
            };
          }
          break;

        default:
          payload = hd;
      }

      payloads.push({
        ...payload,
        is_primary: primaryHeatingId == hd.id,
      });
    }

    return payloads;
  }

  async create(data: Partial<HeatingPayloadType>, ctx: Knex.Transaction) {
    //Save the main heating data.

    const [{ id: heating_id }] = await ctx('heating.data').insert(
      {
        property_id: (data as any).property_id,
        heating_type_id: data.heating_type_id,
      },
      ['id']
    );

    //Insert a record of the primary heating, if applicable.
    const [currentPrimaryHeating] = await ctx('heating.primary_heating').where({
      property_id: data.property_id,
    });

    if (!currentPrimaryHeating && data.is_primary) {
      await ctx('heating.primary_heating').insert({
        property_id: data.property_id,
        heating_id: heating_id,
      });
    }

    const heatingTypes = await this.getTypes(ctx);
    const heatingTypeId = parseInt(data.heating_type_id as any);

    switch (heatingTypeId) {
      case heatingTypes['Kaukolämpö']:
        {
          await this.createHeatingCenter(heating_id, data, ctx);
        }
        break;

      case heatingTypes['Öljy']:
        {
          await this.createHeatingCenter(heating_id, data, ctx);
          await ctx('heating.oil_vessel').insert({
            volume: data.volume,
            location: data.location,
            heating_id,
          });
        }
        break;

      case heatingTypes['Sähkö']:
        {
          await this.createHeatingCenter(heating_id, data, ctx);
          await ctx('heating.warm_water_reservoir').insert({
            volume: data.volume,
            heating_id,
          });
        }
        break;
    }
  }

  async del(id: string, ctx: Knex.Transaction | Knex) {
    await ctx('heating.data').where({ id }).del();
  }

  async updateHeatingCenter(
    heating_id: string,
    data: Partial<HeatingCenterDataType>,
    ctx: Knex | Knex.Transaction
  ) {
    return ctx('heating.heating_center')
      .where({ heating_id })
      .update({
        ...filterValidColumns(data, await getTableColumns('heating_center', ctx, 'heating')),
        model: data.model,
        brand: data.brand,
      });
  }

  async createHeatingCenter(
    heating_id: string,
    data: Partial<HeatingCenterDataType>,
    ctx: Knex | Knex.Transaction
  ) {
    await insertViaFilter(
      {
        ...data,
        model: data.model,
        brand: data.brand,
        heating_id,
      },
      {
        tablename: 'heating_center',
        schema: 'heating',
      },
      ctx
    );
  }

  async update(id: string, data: Partial<HeatingPayloadType>, ctx: Knex.Transaction) {
    const oldHeating = await ctx('heating.data').where({ id }).first();
    const heatingTypes = await this.getTypes(ctx);

    const oldHeatingTypeId = parseInt(oldHeating.heating_type_id);
    const newHeatingTypeId = data.heating_type_id ? parseInt(data.heating_type_id as any) : -1;

    //Update the base heating data.
    await ctx('heating.data')
      .where({ id })
      .update({
        ...filterValidColumns(data, await getTableColumns('data', ctx, 'heating')),
        heating_type_id: data.heating_type_id,
      });

    //The heating type is still the same:
    if (oldHeatingTypeId == newHeatingTypeId) {
      switch (oldHeatingTypeId) {
        case heatingTypes['Öljy']:
          {
            await this.updateHeatingCenter(id, data, ctx);

            await ctx('heating.oil_vessel')
              .where({ heating_id: id })
              .update({
                ...filterValidColumns(data, await getTableColumns('oil_vessel', ctx, 'heating')),
                volume: data.volume,
                location: data.location,
              });
          }
          break;

        case heatingTypes['Kaukolämpö']:
          {
            await this.updateHeatingCenter(id, data, ctx);
          }
          break;

        case heatingTypes['Sähkö']:
          {
            await this.updateHeatingCenter(id, data, ctx);
            await ctx('heating.warm_water_reservoir')
              .where({ heating_id: id })
              .update({
                ...filterValidColumns(
                  data,
                  await getTableColumns('warm_water_reservoir', ctx, 'heating')
                ),
                volume: data.volume,
              });
          }
          break;
      }
    } else {
      const newHeatingHasHeatingCenter =
        newHeatingTypeId == heatingTypes['Öljy'] ||
        newHeatingTypeId == heatingTypes['Kaukolämpö'] ||
        newHeatingTypeId == heatingTypes['Sähkö'];

      if (!newHeatingHasHeatingCenter) {
        //Delete any heating center if new heating does not have one.
        await ctx('heating.heating_center').where({ heating_id: oldHeating.id }).del();
      } else {
        const [existingHeatingCenterId] = await ctx('heating.heating_center')
          .where({ heating_id: oldHeating.id })
          .pluck('heating_id');

        if (existingHeatingCenterId) {
          //Update an existing heating center
          await this.updateHeatingCenter(existingHeatingCenterId, data, ctx);
        } else {
          //Otherwise create a new one
          await this.createHeatingCenter(oldHeating.id, data, ctx);
        }
      }

      if (oldHeatingTypeId == heatingTypes['Öljy']) {
        await ctx('heating.oil_vessel').where({ heating_id: oldHeating.id }).del();
      } else if (oldHeatingTypeId == heatingTypes['Sähkö']) {
        await ctx('heating.warm_water_reservoir').where({ heating_id: oldHeating.id });
      }

      //Insert peripherals for the new heating type.
      switch (newHeatingTypeId) {
        case heatingTypes['Öljy']:
          {
            await ctx('heating.oil_vessel').insert({
              ...filterValidColumns(data, await getTableColumns('oil_vessel', ctx, 'heating')),
            });
          }
          break;

        case heatingTypes['Sähkö']:
          {
            await ctx('heating.warm_water_reservoir').insert({
              ...filterValidColumns(
                data,
                await getTableColumns('warm_water_reservoir', ctx, 'heating')
              ),
            });
          }
          break;
      }
    }

    await this.del(id, ctx);
    await this.create(data, ctx);
  }
}

export const heating = new Heating();
