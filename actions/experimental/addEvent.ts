'use server';

import { revalidatePath } from "next/cache";
import { Events } from "kotilogi-app/utils/events";

export async function addEvent(event: Kotilogi.EventType, files?: FormData[]){
    const events = new Events();
    await events.addEvent(event, files?.map(file => file.get('file') as unknown as File));
    revalidatePath('/properties/[property_id]/events');
}