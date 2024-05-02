'use server';

import { revalidatePath } from 'next/cache';
import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import { events } from 'kotilogi-app/utils/events';
import { getServerSession } from 'next-auth';
import { UserType } from '@/types/UserType';

const PROPERTY_EVENTS_PATH = '/properties/[event_id]/events';
const EVENTS_PATH = '/events/[event_id]/';

export async function addEvent(event: Kotidok.EventType, files?: FormData[]) {
  const session = (await getServerSession()) as {
    user: UserType;
  };

  await events.addEvent(
    event,
    session?.user.id,
    files?.map(file => file.get('file') as unknown as File)
  );
  revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function deleteEvent(eventId: string) {
  const session = (await getServerSession()) as { user: UserType };
  await events.deleteEvent(eventId, session?.user.id);
  revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function updateEvent(eventId: string, newEventData: Partial<Kotidok.EventType>) {
  const session = (await getServerSession()) as { user: UserType };
  await events.updateEvent(eventId, newEventData, session?.user.id);
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
