import 'server-only';
import { Knex } from 'knex';
import db from 'kotilogi-app/dbconfig';
import { insertViaFilter } from '../../../dataAccess/utils/insertViaFilter';
import {
  EventPayloadType,
  HeatingCenterDataType,
  HeatingPayloadType,
} from '../../../dataAccess/types';
import { getTableColumns } from '../../../dataAccess/utils/getTableColumns';
import { filterValidColumns } from '../../../dataAccess/utils/filterValidColumns';
import { objects } from '../../../dataAccess/objects';

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
    const [{ result }] = (await ctx('types.heating_type').select(
      db.raw('json_object_agg(name, id) as result')
    )) as TODO;
    return result;
  }

  async setAsPrimary(heating_id: string, property_id: string, ctx: Knex | Knex.Transaction) {
    await ctx('primary_heating').insert({
      property_id,
      heating_id,
    });
  }

  /**Returns an array containing all heating systems of a property. */
  async get(property_id: string, ctx: Knex.Transaction | Knex): Promise<string[]> {
    //Fetch the genesis event data, created with the parent property.
    const genesisEvent = await ctx('new_events')
      .where({ event_type: 'Genesis', target_type: 'Lämmitysmuoto', property_id })
      .select('data')
      .first();

    //Add the heating types listed in the found genesis event into a set.
    const heatingSet = new Set<string>(genesisEvent?.data?.heating_types);

    //Fetch all Peruskorjaus- or Genesis events done to the heating method, sorting by date in ascending order.
    const eventStream = ctx('new_events')
      .where(function () {
        this.where({ event_type: 'Peruskorjaus' }).orWhere({ event_type: 'Genesis' });
      })
      .andWhere({ target_type: 'Lämmitysmuoto', property_id })
      .andWhereNot({ data: null })
      .orderBy('date', 'asc', 'first')
      .select('data', 'event_type')
      .stream();

    /*
      March through the events and fill the Peruskorjaus-event new_heating_types into the set, 
      while removing the old_heating_types as we go, creating a list of the currently installed
      heating methods.
    */
    for await (const e of eventStream) {
      const { old_heating_type, new_heating_type } = e.data;
      if (old_heating_type && heatingSet.has(old_heating_type)) {
        heatingSet.delete(old_heating_type);
      }

      if (e.event_type == 'Genesis') {
        e.data.heating_types.forEach(i => heatingSet.add(i));
      } else {
        heatingSet.add(new_heating_type);
      }
    }

    return Array.from(heatingSet);
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

  /**Returns the data associated with a heating method restoration event.*/
  async getRestorationData(eventId: string) {
    const [data] = await db('restoration_events.heating_restoration_event')
      .join(
        db.raw(
          'types.heating_type as old_system on old_system.id = restoration_events.heating_restoration_event.old_system_id'
        )
      )
      .join(
        db.raw(
          'types.heating_type as new_system on new_system.id = restoration_events.heating_restoration_event.new_system_id'
        )
      )
      .where({ 'restoration_events.heating_restoration_event.event_id': eventId })
      .select('old_system.name as old_system_label', 'new_system.name as new_system_label');

    return data;
  }

  /**Returns the data associated with heating service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.heating_service_event as ese')
      .join(
        db.raw('service_events.heating_service_type as est on est.id = ese.service_work_type_id')
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const heating = new Heating();
