import { deleteEvent } from 'kotilogi-app/dataAccess/events';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const deleteEventAction = async (eventId: string) => {
  z.string().parse(eventId);
  await deleteEvent(eventId);
  revalidatePath('/dashboard/properties/');
};
