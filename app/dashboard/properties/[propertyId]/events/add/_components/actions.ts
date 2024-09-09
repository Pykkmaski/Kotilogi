'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { createEvent, updateEvent } from 'kotilogi-app/dataAccess/events';
import { EventDataType } from 'kotilogi-app/dataAccess/types';
import { z } from 'zod';

export const updateEventAction = async (eventId: string, data: Partial<EventDataType>) => {
  z.string().parse(eventId);
  await updateEvent(eventId, data);
  revalidatePath('/dashboard/properties/[propertyId]');
};

export const createEventAction = async (propertyId: string, data: EventDataType, files) => {
  z.string().parse(propertyId);
  await createEvent({ ...data, parentId: propertyId });
  revalidatePath('/dashboard/properties/[propertyId]');
};
