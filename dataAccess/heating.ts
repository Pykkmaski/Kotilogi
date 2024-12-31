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
    return ctx('heating_center').where({ heating_id }).select('model', 'brand');
  }

  /**Returns the primary heating system of a property. */
  async getPrimary(property_id: string, ctx: Knex.Transaction | Knex) {
    const [primaryHeatingLabel] = await ctx('primary_heating')
      .join(db.raw('heating ON heating.id = primary_heating.heating_id'))
      .join(db.raw('types.heating_type ON types.heating_type.id = heating.heating_type_id'))
      .select('types.heating_type.name as heating_type_label')
      .where({ 'primary_heating.property_id': property_id })
      .pluck('types.heating_type.name');

    return primaryHeatingLabel;
  }

  async getTypes(ctx: Knex.Transaction | Knex) {
    const [{ result }] = await ctx('types.heating_type').select(
      db.raw('json_object_agg(name, id) as result')
    );
    return result;
  }

  async setAsPrimary(heating_id: string, property_id: string, ctx: Knex | Knex.Transaction) {
    await ctx('primary_heating').insert({
      property_id,
      heating_id,
    });
  }

  /**Returns an array containing all heating systems of a property. */
  async get(property_id: string, ctx: Knex.Transaction | Knex): Promise<HeatingPayloadType[]> {
    const heatingData = await ctx('heating')
      .join(db.raw('types.heating_type ON types.heating_type.id = heating.heating_type_id'))
      .where({ property_id })
      .select('heating.*', 'types.heating_type.name as heating_type_label');

    if (heatingData.length == 0) {
      return [];
    }

    const primaryHeatingPromise = ctx('primary_heating').where({ property_id }).pluck('heating_id');

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
            const vesselPromise = ctx('oil_vessel')
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
            const reservoirPromise = ctx('warm_water_reservoir')
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

    const [{ id: heating_id }] = await ctx('heating').insert(
      {
        property_id: (data as any).property_id,
        heating_type_id: data.heating_type_id,
        name: data.name,
      },
      ['id']
    );

    const [previousPrimary] = await ctx('primary_heating').where({
      property_id: data.property_id,
    });

    if (previousPrimary) {
      if (data.is_primary) {
        await ctx('primary_heating')
          .insert({
            heating_id,
            property_id: data.property_id,
          })
          .onConflict(['property_id', 'heating_id'])
          .merge();
      }
    } else {
      await ctx('primary_heating').insert({
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
          await ctx('oil_vessel').insert({
            volume: data.volume,
            location: data.location,
            heating_id,
          });
        }
        break;

      case heatingTypes['Sähkö']:
        {
          await this.createHeatingCenter(heating_id, data, ctx);
          await ctx('warm_water_reservoir').insert({
            volume: data.volume,
            heating_id,
          });
        }
        break;
    }
  }

  async del(id: string, ctx: Knex.Transaction | Knex) {
    await ctx('heating').where({ id }).del();
  }

  async updateHeatingCenter(
    heating_id: string,
    data: Partial<HeatingCenterDataType>,
    ctx: Knex | Knex.Transaction
  ) {
    return ctx('heating_center')
      .where({ heating_id })
      .update({
        ...filterValidColumns(data, await getTableColumns('heating_center', ctx)),
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
      },
      ctx
    );
  }

  async update(id: string, data: Partial<HeatingPayloadType>, ctx: Knex.Transaction) {
    const oldHeating = await ctx('heating').where({ id }).first();
    const heatingTypes = await this.getTypes(ctx);

    const oldHeatingTypeId = parseInt(oldHeating.heating_type_id);
    const newHeatingTypeId = data.heating_type_id ? parseInt(data.heating_type_id as any) : -1;

    //Update the base heating data.
    await ctx('heating')
      .where({ id })
      .update({
        ...filterValidColumns(data, await getTableColumns('heating', ctx)),
        heating_type_id: data.heating_type_id,
      });

    //The heating type is still the same:
    if (oldHeatingTypeId == newHeatingTypeId) {
      switch (oldHeatingTypeId) {
        case heatingTypes['Öljy']:
          {
            await this.updateHeatingCenter(id, data, ctx);

            await ctx('oil_vessel')
              .where({ heating_id: id })
              .update({
                ...filterValidColumns(data, await getTableColumns('oil_vessel', ctx)),
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
            await ctx('warm_water_reservoir')
              .where({ heating_id: id })
              .update({
                ...filterValidColumns(data, await getTableColumns('warm_water_reservoir', ctx)),
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
        await ctx('heating_center').where({ heating_id: oldHeating.id }).del();
      } else {
        const [existingHeatingCenterId] = await ctx('heating_center')
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
        await ctx('oil_vessel').where({ heating_id: oldHeating.id }).del();
      } else if (oldHeatingTypeId == heatingTypes['Sähkö']) {
        await ctx('warm_water_reservoir').where({ heating_id: oldHeating.id });
      }

      //Insert peripherals for the new heating type.
      switch (newHeatingTypeId) {
        case heatingTypes['Öljy']:
          {
            await ctx('oil_vessel').insert({
              ...filterValidColumns(data, await getTableColumns('oil_vessel', ctx)),
            });
          }
          break;

        case heatingTypes['Sähkö']:
          {
            await ctx('warm_water_reservoir').insert({
              ...filterValidColumns(data, await getTableColumns('warm_water_reservoir', ctx)),
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
