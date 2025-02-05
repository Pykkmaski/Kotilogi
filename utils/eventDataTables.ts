import { Knex } from 'knex';
import { electric } from 'kotilogi-app/colors';
import { drainageDitches } from 'kotilogi-app/dataAccess/drainageDitches';
import { electricity } from 'kotilogi-app/dataAccess/electricity';
import { exteriorCladding } from 'kotilogi-app/dataAccess/exteriorCladding';
import { firealarms } from 'kotilogi-app/dataAccess/firealarms';
import { heating } from 'kotilogi-app/dataAccess/heating';
import { insulation } from 'kotilogi-app/dataAccess/insulation';
import { locks } from 'kotilogi-app/dataAccess/locks';
import { roofs } from 'kotilogi-app/dataAccess/roofs';
import { sewerPipes } from 'kotilogi-app/dataAccess/sewerPipes';
import { structures } from 'kotilogi-app/dataAccess/structures';
import { ventilation } from 'kotilogi-app/dataAccess/ventilation';
import { waterPipes } from 'kotilogi-app/dataAccess/waterPipes';
import { windows } from 'kotilogi-app/dataAccess/windows';

type DataTablePropertyType = {
  Peruskorjaus?: string;
  Huoltotyö?: string;
};

type DataTableType = {
  [x: string]: DataTablePropertyType;
};

export const dataTableNames: DataTableType = {
  Katto: {
    Peruskorjaus: 'roof',
  },

  Ilmanvaihto: {
    Huoltotyö: 'service_events.ventilation_service_event',
  },

  Ikkunat: {
    Peruskorjaus: 'window',
  },

  Lukot: {
    Peruskorjaus: 'lock',
  },

  Eristys: {
    Peruskorjaus: 'insulation',
    Huoltotyö: 'service_events.insulation_service_events',
  },

  Salaojat: {
    Peruskorjaus: 'drainage_ditch',
    Huoltotyö: 'service_events.drainage_ditch_service_event',
  },

  Rakenteet: {
    Peruskorjaus: 'restoration_events.structure_restoration_event',
    Huoltotyö: 'service_events.structure_service_event',
  },

  Viemäriputket: {
    Peruskorjaus: 'restoration_events.sewer_pipe_restoration_event',
    Huoltotyö: 'service_events.sewer_pipe_service_event',
  },

  Sähköt: {
    Peruskorjaus: 'restoration_events.electricity_restoration_event',
    Huoltotyö: 'service_events.electricity_service_event',
  },

  Palovaroittimet: {
    Huoltotyö: 'service_events.firealarm_service_events',
  },

  Lämmitysmuoto: {
    Peruskorjaus: 'heating',
    Huoltotyö: 'service_events.heating_method_service_event',
  },

  Lämmönjako: {
    Huoltotyö: 'service_events.heating_distribution_service_event',
  },
};

export const dataAccessHandler = {
  Katto: roofs,
  Ilmanvaihto: ventilation,
  Eristys: insulation,
  Sähköt: electricity,
  Lämmitysmuoto: heating,
  Palovaroittimet: firealarms,
  Lukitus: locks,
  Viemäriputket: sewerPipes,
  Käyttövesiputket: waterPipes,
  Ikkunat: windows,
  Rakenteet: structures,
  Salaojat: drainageDitches,
  Ulkoverhous: exteriorCladding,
};

/**Returns the handler for an event's extra data by the target type id. */
export async function getDataAccessHandler(targetId: string, ctx: Knex | Knex.Transaction) {
  const [targetLabel] = (await ctx('types.event_target_type')
    .where({ id: targetId })
    .pluck('label')) as [keyof typeof dataAccessHandler];
  return dataAccessHandler[targetLabel];
}

/**Returns the name of the table where the data associated with an event is stored.
 * @param targetTypeId The id of the target type
 * @param eventTypeId The id of the event type
 */
export async function getEventDataTableName(
  targetTypeId: string,
  eventTypeId: string,
  ctx: Knex | Knex.Transaction
) {
  const [eventTypeLabel] = (await ctx('types.event_type')
    .where({ id: eventTypeId })
    .pluck('label')) as [keyof DataTablePropertyType];

  const [eventTargetLabel] = (await ctx('types.event_target_type')
    .where({ id: targetTypeId })
    .pluck('label')) as [keyof DataTableType];
  return dataTableNames[eventTargetLabel][eventTypeLabel];
}
