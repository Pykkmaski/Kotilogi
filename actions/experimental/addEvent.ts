'use server';

import db from "kotilogi-app/dbconfig";
import { addWithFiles } from "./addWithFiles";
import { addData } from "./addData";
import { revalidatePath } from "next/cache";
import { createDueDate } from "kotilogi-app/utils/createDueDate";
import { Events } from "kotilogi-app/utils/events";

export async function addEvent(event: Kotilogi.EventType, files?: FormData[]){
    const events = new Events();
    await events.addEvent(event, files?.map(file => file.get('file') as unknown as File));
    revalidatePath('/properties/[property_id]/events');
}