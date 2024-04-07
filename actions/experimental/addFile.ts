'use server';

import { Files } from "kotilogi-app/utils/files";
import { revalidatePath } from "next/cache";

/**
 * Uploads a single file and adds its data into the database.
 * Can be used to upload a single file on its own, or as alongside adding of data that has files. In the latter case, provide a transaction object.
 * @param tablename 
 * @param file 
 * @param trx 
 */
export async function addFile(tablename: 'propertyFiles' | 'eventFiles', fileData: FormData, refId: string){
    const files = new Files();
    await files.addFile(tablename, fileData.get('file') as unknown as File, refId);
    const path = tablename === 'propertyFiles' ? '/properties/[property_id]/' : '/events/[event_id]/';
    revalidatePath(path);
}