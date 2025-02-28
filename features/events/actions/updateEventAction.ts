'use server';
import { revalidatePath } from 'next/cache';
import { events } from '../DAL/events';
import { EventPayloadType } from '../types/EventPayloadType';
import z from 'zod';

export const updateEventAction = async (eventId: string, payload: Partial<EventPayloadType>) => {
  z.string().parse(eventId);
  const result = await events.update(eventId, payload);
  if (result.code === 0) {
    revalidatePath('/dashboard/properties/[propertyId]');
  }

  return result;
};
