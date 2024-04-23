'use server';

import { revalidatePath } from 'next/cache';
import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import { events } from 'kotilogi-app/utils/events';
import { getServerSession } from 'next-auth';

const PROPERTY_EVENTS_PATH = '/properties/[event_id]/events';
const EVENTS_PATH = '/events/[event_id]/';

export async function addEvent(event: Kotidok.EventType, files?: FormData[]) {
  const session = await getServerSession();
  await events.addEvent(
    event,
    session?.user.email
    //files?.map(file => file.get('file') as unknown as File)
  );
  revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function deleteEvent(eventId: string) {
  const session = await getServerSession();
  await events.deleteEvent(eventId, session?.user.email);
  revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function updateEvent(eventId: string, newEventData: Partial<Kotidok.EventType>) {
  const session = await getServerSession();
  await events.updateEvent(eventId, newEventData, session?.user.email);
  revalidatePath(EVENTS_PATH);
}

export async function deleteFile(id: string) {
  const trx = await db.transaction();
  const fileTable = new Files('eventFiles', trx);

  try {
    await fileTable.deleteFile(id);
    await trx.commit();
    revalidatePath('/events/[event_id]/');
  } catch (err) {
    await fileTable.rollbackFiles();
    await trx.rollback();
  }
}
