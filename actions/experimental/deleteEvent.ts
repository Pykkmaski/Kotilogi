'use server';

import { Knex } from "knex";
import { Events } from "kotilogi-app/utils/events";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string, trx?: Knex.Transaction){
    const events = new Events();
    await events.deleteEvent(eventId);
    revalidatePath('/properties/[property_id]/events');
}