'use server'

import { revalidatePath } from "next/cache";
import { upload } from "../file/upload";

export async function addPropertyEventFiles(files: FormData[], eventId: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await upload(files, eventId, 'eventFiles');
            revalidatePath('/events/[event_id]/');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}