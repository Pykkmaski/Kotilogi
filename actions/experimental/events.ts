'use server';

import { revalidatePath } from 'next/cache';
import db from 'kotilogi-app/dbconfig';
import { Files } from 'kotilogi-app/utils/files';
import { events } from 'kotilogi-app/utils/events';

const PROPERTY_EVENTS_PATH = '/properties/[event_id]/events';
const EVENTS_PATH = '/events/[event_id]/';

export async function addEvent(event: Kotilogi.EventType, files?: FormData[]) {
    await events.addEvent(
        event,
        files?.map(file => file.get('file') as unknown as File)
    );
    revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function deleteEvent(eventId: string) {
    await events.deleteEvent(eventId);
    revalidatePath(PROPERTY_EVENTS_PATH);
}

export async function updateEvent(eventId: string, newEventData: Partial<Kotilogi.EventType>) {
    await events.updateEvent(eventId, newEventData);
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
