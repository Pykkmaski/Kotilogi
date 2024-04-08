'use server';

import { revalidatePath } from "next/cache";
import { Events } from "kotilogi-app/utils/events";

const PATH = '/properties/[event_id]/events';

export async function addEvent(event: Kotilogi.EventType, files?: FormData[]){
    const events = new Events();
    await events.addEvent(event, files?.map(file => file.get('file') as unknown as File));
    revalidatePath(PATH);
}

export async function deleteEvent(eventId: string){
    const events = new Events();
    await events.deleteEvent(eventId);
    revalidatePath(PATH);
}