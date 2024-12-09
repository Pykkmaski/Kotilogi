import 'server-only';
import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';
import { insertViaFilter } from './utils/insertViaFilter';
import { HeatingPayloadType } from './types';

class Heating {
  private async getHeatingCenter(heating_id: string, ctx: Knex.Transaction | Knex) {
    return ctx('heating.heating_center')
      .where({ heating_id })
      .select('model as heating_center_model', 'brand as heating_center_brand');
  }

  /**Returns the primary heating system of a property. */
  async getPrimary(property_id: string, ctx: Knex.Transaction | Knex) {
    const [heating_type_label] = await ctx('heating.primary_heating')
      .join(db.raw('heating.data ON heating.data.id = heating.primary_heating.heating_id'))
      .join(db.raw('heating.types ON heating.types.id = heating.data.heating_type_id'))
      .select('heating.types.name as heating_type_label')
      .where({ 'heating.primary_heating.property_id': property_id })
      .pluck('heating.types.name');

    return heating_type_label;
  }

  async getTypes(ctx: Knex.Transaction | Knex) {
    const [{ result }] = await ctx('heating.types').select(
      db.raw('json_object_agg(name, id) as result')
    );
    return result;
  }

  /**Returns an array containing all heating systems of a property. */
  async get(property_id: string, ctx: Knex.Transaction | Knex): Promise<HeatingPayloadType[]> {
    const heatingData = await ctx('heating.data')
      .join(db.raw('heating.types ON heating.types.id = heating.data.heating_type_id'))
      .where({ property_id })
      .select('heating.data.*', 'heating.types.name as heating_type_label');

    if (heatingData.length == 0) {
      return [];
    }

    const heatingTypes = await this.getTypes(ctx);
    const payloads: HeatingPayloadType[] = [];

    for (const hd of heatingData) {
      const heating_type_id = parseInt(hd.heating_type_id);
      let payload = null;

      switch (heating_type_id) {
        case heatingTypes['Öljy']: {
          const centerPromise = this.getHeatingCenter(hd.id, ctx);
          const vesselPromise = ctx('heating.oil_vessel')
            .where({ heating_id: hd.id })
            .select('volume as vessel_volume', 'location as vessel_location');

          const [[center], [vessel]] = await Promise.all([centerPromise, vesselPromise]);

          payload = {
            ...hd,
            ...vessel,
            ...center,
          };
        }

        case heatingTypes['Kaukolämpö']: {
          const [center] = await this.getHeatingCenter(hd.id, ctx);
          payload = {
            ...hd,
            ...center,
          };
        }

        case heatingTypes['Sähkö']: {
          const centerPromise = this.getHeatingCenter(hd.id, ctx);
          const reservoirPromise = ctx('heating.warm_water_reservoir')
            .where({ heating_id: hd.id })
            .select('volume as warm_water_reservoir_volume');

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

        default:
          payload = hd;
      }

      payloads.push(payload);
    }

    return payloads;
  }

  async create(data: Partial<HeatingPayloadType>, ctx: Knex.Transaction | Knex) {
    //Save the main heating data.
    const [{ id: heating_id }] = await ctx('heating.data').insert(
      {
        property_id: data.property_id,
        heating_type_id: data.heating_type_id,
      },
      ['id']
    );

    if (data.is_primary) {
      await ctx('heating.primary_heating')
        .insert({
          property_id: data.property_id,
          heating_id,
        })
        .onConflict(['heating_id', 'property_id'])
        .merge();
    }

    //Save the peripherals.
    const saveHeatingCenter = async () => {
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
    };

    const heatingTypes = await this.getTypes(ctx);
    const heatingTypeId = parseInt(data.heating_type_id as any);

    switch (heatingTypeId) {
      case heatingTypes['Kaukolämpö']:
        {
          await saveHeatingCenter();
        }
        break;

      case heatingTypes['Öljy']:
        {
          await saveHeatingCenter();
          await ctx('heating.oil_vessel').insert({
            volume: data.volume,
            location: data.location,
            heating_id,
          });
        }
        break;

      case heatingTypes['Sähkö']: {
        await ctx('heating.warm_water_reservoir').insert({
          volume: data.volume,
          heating_id,
        });
      }
    }
  }

  async del(id: string, ctx: Knex.Transaction | Knex) {
    await ctx('heating.data').where({ id }).del();
  }

  async update(id: string, data: any, ctx: Knex.Transaction | Knex) {
    await this.del(id, ctx);
    await this.create(data, ctx);
  }
}

export const heating = new Heating();
