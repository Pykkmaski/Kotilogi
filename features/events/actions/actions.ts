'use server';

import { heating } from 'kotilogi-app/features/events/DAL/heating';
import db from 'kotilogi-app/dbconfig';
import { TargetType } from 'kotilogi-app/types/TargetType';

export const getPreviousHeatingSystem = async (propertyId: string) => {
  const [heatingTargetId] = await db('types.event_target_type')
    .where({ label: 'Lämmitys' })
    .pluck('id');

  return await db('data_heatingEvents')
    .join('data_objects', { 'data_objects.id': 'data_heatingEvents.id' })
    .join('data_events', { 'data_events.id': 'data_heatingEvents.id' })
    .where({ 'data_objects.parentId': propertyId, 'data_events.targetId': heatingTargetId });
};

export const getRooms = async () => {
  return await db('ref_rooms');
};

export const getEventTargets = async (mainEventTypeId: string) => {
  switch (mainEventTypeId) {
    case 'Peruskorjaus': {
      return await db('restoration_events.restorable_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = restoration_events.restorable_target_type.target_type'
          )
        )
        .select('types.event_target_type.*');
    }

    case 'Huoltotyö': {
      return await db('service_events.serviceable_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = service_events.serviceable_target_type.target_type'
          )
        )
        .select('types.event_target_type.*');
    }

    case 'Pintaremontti': {
      return await db('cosmetic_renovation_events.cosmetic_renovation_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = cosmetic_renovation_events.cosmetic_renovation_target_type.target_type'
          )
        )
        .select('types.event_target_type.*');
    }

    case 'Muu':
    default: {
      return await db('types.event_target_type');
    }
  }
};

export const getServiceWorkTypes = async (targetId: string) => {
  const [{ result: event_targets }] = (await db('types.event_target_type').select(
    db.raw('json_object_agg(label, id) as result')
  )) as TODO;

  switch (targetId) {
    case TargetType.KATTO: {
      return await db('service_events.roof_service_type');
    }

    case TargetType.SALAOJAT:
      return await db('service_events.drainage_ditch_service_type');

    case TargetType.KÄYTTÖVESIPUTKET:
      return await db('service_events.water_pipe_service_type');

    case TargetType.VIEMÄRIPUTKET:
      return await db('service_events.sewer_pipe_service_type');

    case TargetType.LÄMMITYSMUOTO:
      return await db('service_events.heating_service_type');

    case TargetType.LÄMMÖNJAKO:
      return await db('service_events.heating_distribution_service_type');

    case TargetType.ILMANVAIHTO: {
      return await db('service_events.ventilation_service_type');
    }

    case TargetType.ERISTYS: {
      return await db('service_events.insulation_service_type');
    }

    case TargetType.SÄHKÖT: {
      return await db('service_events.electricity_service_type');
    }

    case TargetType.RAKENTEET: {
      return await db('service_events.structure_service_type');
    }

    case TargetType.PALOVAROITTIMET: {
      return await db('service_events.firealarm_service_type');
    }

    case TargetType.IKKUNAT: {
      return await db('service_events.window_service_type');
    }

    case TargetType.MUU: {
      return await db('service_events.other_service_type');
    }

    default: {
      console.error('Case for id ' + targetId + ' not implemented!');
    }
  }
};

export const getSurfaces = async () => {
  const surfaces = await db('types.surface_type');
  return surfaces;
};

/**@deprecated */
export const getEventCategories = async () => db('ref_eventCategories');

export const getWorkTypeLabel = async (targetId: number, serviceWorkTypeId: number) => {
  const [{ result: targets }] = await db('types.event_target_type').select(
    await db.raw('json_obect_agg(label, id) as result')
  );

  switch (parseInt(targetId as any)) {
    case targets['Ilmanvaihto']: {
      const [label] = await db('ventilation.service_work_type')
        .where({ id: serviceWorkTypeId })
        .pluck('label');
      return label;
    }

    default:
      return 'Tuntematon';
  }
};

export const getHeatingData = async (propertyId: string) => {
  return await heating.get(propertyId, db);
};
