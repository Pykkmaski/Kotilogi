'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { createEvent } from 'kotilogi-app/dataAccess/events/createEvent';
import { updateEvent } from 'kotilogi-app/dataAccess/events/updateEvent';
import { setDefaultMainImage, uploadFiles } from 'kotilogi-app/dataAccess/files';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import db from 'kotilogi-app/dbconfig';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const updateEventAction = async (
  eventId: string,
  mainData: Partial<EventDataType>,
  typeData: {
    mainTypeId: number;
    targetId: number;
    workTypeId: number;
  },
  extraData: any
) => {
  z.string().parse(eventId);
  await updateEvent(
    eventId,
    {
      ...mainData,
      ...typeData,
    },
    [extraData]
  );
  revalidatePath('/dashboard/properties/[propertyId]');
  redirect(`/dashboard/properties/${mainData.parentId}/events/${eventId}`);
};

export const createEventAction = async (
  propertyId: string,
  mainData: EventDataType,
  typeData: {
    mainTypeId: number;
    targetId: number;
    workTypeId: number;
  },
  extraData: any[],
  selectedSurfaceIds: number[],
  files?: FormData[]
) => {
  z.string().parse(propertyId);
  let eventId;

  await createEvent(
    { ...mainData, parentId: propertyId },
    typeData,
    extraData,
    selectedSurfaceIds,
    async (id, trx) => {
      //Save the id of the event for use in the following redirections and path revalidations.
      eventId = id;
    }
  );

  if (files) {
    try {
      const fdata = files.map(fd => fd.get('file') as unknown as File);
      await uploadFiles(fdata, eventId);
      await setDefaultMainImage(eventId);
    } catch (err) {
      //Ignore file upload errors for now.
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/properties/[propertyId]');
  redirect(`/dashboard/properties/${propertyId}/events/${eventId}`);
};

export const getPreviousHeatingSystem = async (propertyId: string) => {
  const [heatingTargetId] = await db('ref_eventTargets').where({ label: 'Lämmitys' }).pluck('id');

  return await db('data_heatingEvents')
    .join('data_objects', { 'data_objects.id': 'data_heatingEvents.id' })
    .join('data_events', { 'data_events.id': 'data_heatingEvents.id' })
    .where({ 'data_objects.parentId': propertyId, 'data_events.targetId': heatingTargetId });
};

export const getRooms = async () => {
  return await db('ref_rooms');
};

export const getEventTargets = async (mainEventTypeId: number) => {
  const targetIds = await db('map_workTargetsToMainEventType')
    .where({ mainEventTypeId })
    .pluck('targetId');
  return await db('ref_eventTargets').whereIn('id', targetIds);
};

export const getEventWorkTypes = async (targetId: number) => {
  const workTypeIds = await db('map_workTypeToTarget').where({ targetId }).pluck('workTypeId');
  return await db('ref_eventWorkTypes').whereIn('id', workTypeIds);
};

export const getSurfaces = async () => {
  const surfaces = await db('ref_surfaces');
  return surfaces;
};

export const getEventCategories = async () => db('ref_eventCategories');
