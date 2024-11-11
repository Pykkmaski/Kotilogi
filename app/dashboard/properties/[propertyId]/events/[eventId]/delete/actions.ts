'use server';

import { events } from 'kotilogi-app/dataAccess/events';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const deleteEventAction = async (eventId: string) => {
  z.string().parse(eventId);
  await events.del(eventId);
  revalidatePath('/dashboard/properties/');
};
