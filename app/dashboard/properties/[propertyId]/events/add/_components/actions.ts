'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { createEvent, updateEvent } from 'kotilogi-app/dataAccess/events';
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
  }
) => {
  z.string().parse(eventId);
  await updateEvent(eventId, {
    ...mainData,
    ...typeData,
  });
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
  files?: File[]
) => {
  z.string().parse(propertyId);
  let eventId;

  await createEvent({ ...mainData, ...typeData, parentId: propertyId }, async (id, trx) => {
    eventId = id;
  });

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
