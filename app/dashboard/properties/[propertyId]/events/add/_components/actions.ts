'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { events } from 'kotilogi-app/dataAccess/events';
import { files } from 'kotilogi-app/dataAccess/files';
import { heating } from 'kotilogi-app/dataAccess/heating';
import { EventPayloadType } from 'kotilogi-app/dataAccess/types';
import db from 'kotilogi-app/dbconfig';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const updateEventAction = async (
  eventId: string,
  mainData: Partial<EventPayloadType>,
  extraData: any
) => {
  z.string().parse(eventId);
  await events.update(eventId, {
    ...mainData,
  });
  revalidatePath('/dashboard/properties/[propertyId]');
  redirect(`/dashboard/properties/${mainData.property_id}/events/${eventId}`);
};

export const createEventAction = async (
  propertyId: string,
  eventPayload: EventPayloadType,
  fileFormData?: FormData[]
) => {
  console.log('property id at action: ', propertyId);
  z.string().parse(propertyId);
  let eventId;

  await events.create({ ...eventPayload, property_id: propertyId }, async (id, trx) => {
    //Save the id of the event for use in the following redirections and path revalidations.
    eventId = id;
  });

  if (fileFormData) {
    try {
      const fdata = fileFormData.map(fd => fd.get('file') as unknown as File);
      await files.upload(fdata, eventId);
      await files.setDefaultMainImage(eventId);
    } catch (err) {
      //Ignore file upload errors for now.
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/properties/[propertyId]');
  redirect(`/dashboard/properties/${propertyId}/events/${eventId}`);
};

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

export const getEventTargets = async (mainEventTypeId: number) => {
  const [{ result: event_types }] = (await db('types.event_type').select(
    db.raw('json_object_agg(label, id) as result')
  )) as TODO;

  switch (parseInt(mainEventTypeId as any)) {
    case event_types.Peruskorjaus: {
      return await db('restoration_events.restorable_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = restoration_events.restorable_target_type.target_id'
          )
        )
        .select('types.event_target_type.*');
    }

    case event_types['Huoltotyö']: {
      return await db('service_events.serviceable_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = service_events.serviceable_target_type.target_id'
          )
        )
        .select('types.event_target_type.*');
    }

    case event_types['Pintaremontti']: {
      return await db('cosmetic_renovation_events.cosmetic_renovation_target_type')
        .join(
          db.raw(
            'types.event_target_type on types.event_target_type.id = cosmetic_renovation_events.cosmetic_renovation_target_type.target_id'
          )
        )
        .select('types.event_target_type.*');
    }

    case event_types['Muu']:
    default: {
      return await db('types.event_target_type');
    }
  }
};

export const getServiceWorkTypes = async (targetId: number) => {
  const [{ result: event_targets }] = (await db('types.event_target_type').select(
    db.raw('json_object_agg(label, id) as result')
  )) as TODO;

  switch (parseInt(targetId as any)) {
    case event_targets.Katto: {
      return await db('service_events.roof_service_type');
    }

    case event_targets['Salaojat']:
      return await db('service_events.drainage_ditch_service_type');

    case event_targets['Käyttövesiputket']:
      return await db('service_events.water_pipe_service_type');

    case event_targets['Viemäriputket']:
      return await db('service_events.sewer_pipe_service_type');

    case event_targets['Lämmitysmuoto']:
      return await db('service_events.heating_service_type');

    case event_targets['Lämmönjako']:
      return await db('service_events.heating_distribution_service_type');

    case event_targets['Ilmanvaihto']: {
      return await db('service_events.ventilation_service_type');
    }

    case event_targets['Eristys']: {
      return await db('service_events.insulation_service_type');
    }

    case event_targets['Sähköt']: {
      return await db('service_events.electricity_service_type');
    }

    case event_targets['Rakenteet']: {
      return await db('service_events.structure_service_type');
    }

    case event_targets['Palovaroittimet']: {
      return await db('service_events.firealarm_service_type');
    }

    case event_targets['Ikkunat']: {
      return await db('service_events.window_service_type');
    }

    case event_targets['Muu']: {
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
