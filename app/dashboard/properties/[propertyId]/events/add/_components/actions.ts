'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { createEvent, updateEvent } from 'kotilogi-app/dataAccess/events';

export const runUpdate = async (eventId, data) => {
  await updateEvent(eventId, data);
  revalidatePath('/dashboard/properties/[propertyId]');
};

export const onSubmit = async (propertyId, data, files) => {
  await createEvent({ ...data, parentId: propertyId });
  revalidatePath('/dashboard/properties/[propertyId]');
};
